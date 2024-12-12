import httpStatus from 'http-status';
import AppError from '../../app/error/AppError';
import { TPayment } from './payment.interface';
import config from '../../app/config';
import axios from 'axios';
import { payments } from './payment.model';
import mongoose from 'mongoose';
import QueryBuilder from '../../app/builder/QueryBuilder';
import { excludeField } from './payment.constant';
import { companyapplys } from '../CompanyApply/companyapply.model';

const PaymentGetWayFromDb = async (
  payload: TPayment,
  userId: string,
  companyApplyId: string,
) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  const transactionId = Math.floor(Math.random() * 1000000000000);

  // is Exist Payment
  const isExistPayment = await payments.findOne(
    { companyApplyId: companyApplyId },
    { _id: true },
  );
  if (isExistPayment) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'This Payment Request Alredy Exist',
      '',
    );
  }
  const data = {
    store_id: config.ssl_commerce.store_id,
    store_passwd: config.ssl_commerce.store_passwd,
    total_amount: payload?.amount,
    currency: 'BDT',
    tran_id: transactionId,
    success_url: config.ssl_commerce.success_url,
    fail_url: config.ssl_commerce.fail_url,
    cancel_url: config.ssl_commerce.cancel_url,
    ipn_url: 'http://localhost:3025/ipn',
    shipping_method: 'N/A',
    product_name: 'Appointment',
    product_category: 'Electronic',
    product_profile: 'general',
    cus_name: payload?.name,
    cus_email: payload?.email,
    cus_add1: payload?.address,
    cus_add2: 'N/A',
    cus_city: 'Dhaka',
    cus_state: 'Dhaka',
    cus_postcode: '1000',
    cus_country: 'Bangladesh',
    cus_phone: payload?.contractNumber,
    cus_fax: '01711111111',
    ship_name: 'N/A',
    ship_add1: 'N/A',
    ship_add2: 'N/A',
    ship_city: 'N/A',
    ship_state: 'N/A',
    ship_postcode: 1000,
    ship_country: 'Bangladesh',
  };

  if (!mongoose.isValidObjectId(companyApplyId)) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Invalid Company Apply ID format',
      '',
    );
  }

  const companyApplyObjectId = new mongoose.Types.ObjectId(companyApplyId);
  const isExistApplyCompany = await companyapplys.isCompanyApplyExist(
    companyApplyObjectId.toString(),
  );
  if (!isExistApplyCompany) {
    throw new AppError(
      httpStatus.BAD_GATEWAY,
      'This Apply Company ID does not exist',
      '',
    );
  }

  payload.companyApplyId = companyApplyObjectId;

  try {
    const storePaymentInfo = await payments.create(
      [{ userId, transactionId, ...payload }],
      { session },
    );

    if (!storePaymentInfo?.length) {
      throw new AppError(
        httpStatus.BAD_GATEWAY,
        'Store Payment Information Error',
        '',
      );
    }

    const response = await axios({
      method: 'POST',
      url: config.ssl_commerce.ssl_payment_api,
      data: data,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    await session.commitTransaction();

    return {
      paymentUrl: response.data?.GatewayPageURL,
      transactionId,
    };
  } catch (error) {
    await session.abortTransaction();
    throw new AppError(httpStatus.BAD_GATEWAY, 'Payment error occurred', '');
  } finally {
    session.endSession();
  }
};

const validitePayment = async (payload: any) => {
  try {
    const respone = await axios({
      method: 'GET',
      url: `${config.ssl_commerce.ssl_validation_api}?val_id=${payload.val_id}&store_id=${config.ssl_commerce.store_id}&store_passwd=${config.ssl_commerce.store_passwd}&format=json`,
    });

    return respone?.data;
  } catch (error) {
    throw new AppError(httpStatus.BAD_REQUEST, 'payment validation error', '');
  }
};

const FindAllPaymentListFromDb = async (query: Record<string, unknown>) => {
  try {
    const officeQuery = new QueryBuilder(
      payments.find({ payment: true }).populate('userId'),
      query,
    )
      .search(excludeField)
      .filter()
      .sort()
      .paginate()
      .fields();

    const result = await officeQuery.modelQuery;
    const meta = await officeQuery.countTotal();

    return {
      meta,
      result,
    };
  } catch (error) {
    throw new AppError(httpStatus.NOT_FOUND, 'Error fetching payment data', '');
  }
};

const FindAllPaymentListAdminFromDb = async (
  query: Record<string, unknown>,
) => {
  try {
    const officeQuery = new QueryBuilder(
      payments
        .find({ payment: true })
        .populate('userId')
        .populate('companyApplyId'),
      query,
    )
      .search(excludeField)
      .filter()
      .sort()
      .paginate()
      .fields();

    const result = await officeQuery.modelQuery;
    const meta = await officeQuery.countTotal();

    return {
      meta,
      result,
    };
  } catch (error) {
    throw new AppError(httpStatus.NOT_FOUND, 'Error fetching payment Data', '');
  }
};

const UpdatePaymentStatusFromDb = async (transactionId: string) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const existingPayment = await payments
      .findOne(
        { transactionId },
        {
          _id: 1,
          companyApplyId: 1,
        },
      )
      .session(session);

    if (!existingPayment) {
      throw new AppError(
        httpStatus.NOT_FOUND,
        'This Transaction Id Does Not Exist',
        '',
      );
    }

    const [updatedCompanyApply, updatedPayment] = await Promise.all([
      companyapplys.findByIdAndUpdate(
        existingPayment.companyApplyId,
        { payment: true },
        {
          new: true,
          session,
          runValidators: true,
        },
      ),

      payments.findByIdAndUpdate(
        existingPayment._id,
        { payment: true },
        {
          new: true,
          session,
          runValidators: true,
        },
      ),
    ]);
    if (!updatedCompanyApply || !updatedPayment) {
      throw new AppError(
        httpStatus.INTERNAL_SERVER_ERROR,
        'Failed to update payment status',
        '',
      );
    }

    await session.commitTransaction();

    return {
      companyApply: updatedCompanyApply,
      payment: updatedPayment,
    };
  } catch (error) {
    await session.abortTransaction();

    if (error instanceof AppError) {
      throw error;
    }

    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Error updating payment status',
      '',
    );
  } finally {
    session.endSession();
  }
};

const FailedPaymentStatusDeleteFromDb = async (transactionId: string) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const existingPayment = await payments
      .findOne(
        { transactionId },
        {
          _id: 1
        },
      )
      .session(session);

    if (!existingPayment) {
      throw new AppError(
        httpStatus.NOT_FOUND,
        'This Transaction Id Does Not Exist',
        '',
      );
    }

    const result = await payments.deleteOne(
      {
        transactionId,
        payment: false,
      },
      { session },
    );
    await session.commitTransaction();
    return result;
  } catch (error) {
    await session.abortTransaction();

    if (error instanceof AppError) {
      throw error;
    }

    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Error updating payment status',
      '',
    );
  } finally {
    session.endSession();
  }
};

export const PaymentServices = {
  PaymentGetWayFromDb,
  validitePayment,
  FindAllPaymentListFromDb,
  FindAllPaymentListAdminFromDb,
  UpdatePaymentStatusFromDb,
  FailedPaymentStatusDeleteFromDb
};
