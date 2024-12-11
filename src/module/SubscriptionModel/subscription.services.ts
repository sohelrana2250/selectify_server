import httpStatus from 'http-status';
import AppError from '../../app/error/AppError';
import { TSubscriptionname } from './subscription.interfcae';
import { subscriptionmodels } from './subscription.model';
import QueryBuilder from '../../app/builder/QueryBuilder';
import { excludeField } from './subscription.conostant';
import { companyapplys } from '../CompanyApply/companyapply.model';
import mongoose from 'mongoose';

const CreateSubScriptionModelIntoDb = async (payload: TSubscriptionname) => {
  const subscriptionBuilder = new subscriptionmodels(payload);
  const result = await subscriptionBuilder.save();
  return result;
};

const FindHomePageSubscriptionModelFromDb = async () => {
  try {
    const result = await subscriptionmodels.find(
      {},
      {
        price: 1,
        subscriptionname: 1,
        servicesdate: 1,
        _id: 0,
      },
    );
    return result;
  } catch (error) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Error fetching subscription data',
      '',
    );
  }
};

const FindAllSubscriptionModelFromDb = async (
  query: Record<string, unknown>,
) => {
  try {
    const officeQuery = new QueryBuilder(subscriptionmodels.find(), query)
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
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Error fetching subscription data',
      '',
    );
  }
};

const FindSpecificSubscriptionModelFromDb = async (id: string) => {
  try {
    const result = await subscriptionmodels.isSubScriptionExist(id);
    return result;
  } catch (error) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Error fetching subscription data',
      '',
    );
  }
};

const UpdateSubscriptionModelFromDb = async (
  id: string,
  payload: TSubscriptionname,
) => {
  try {
    const isExist = await subscriptionmodels.isSubScriptionExist(id);

    if (!isExist) {
      throw new AppError(
        httpStatus.NOT_FOUND,
        'Not Founded SubScription Model',
        '',
      );
    }

    const result = await subscriptionmodels.findByIdAndUpdate(id, payload, {
      new: true,
      upsert: true,
    });
    return result;
  } catch (error) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Error fetching subscription data',
      '',
    );
  }
};

const DeleteSubScriptionModelFromDb = async (id: string) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const result = await subscriptionmodels.findByIdAndDelete(id, { session });
    if (!result) {
      throw new AppError(
        httpStatus.NOT_FOUND,
        'Subscription model not found',
        '',
      );
    }

    const deleteCompanyApply = await companyapplys.deleteOne(
      { subscriptionmodelId: id },
      { session },
    );

    if (deleteCompanyApply.deletedCount === 0) {
      throw new AppError(
        httpStatus.NOT_FOUND,
        'Company apply record not found',
        '',
      );
    }

    await session.commitTransaction();
    return result;
  } catch (error) {
    await session.abortTransaction();
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Error deleting subscription data',
      '',
    );
  } finally {
    session.endSession();
  }
};

export const SubscriptionsServices = {
  CreateSubScriptionModelIntoDb,
  FindHomePageSubscriptionModelFromDb,
  FindAllSubscriptionModelFromDb,
  FindSpecificSubscriptionModelFromDb,
  UpdateSubscriptionModelFromDb,
  DeleteSubScriptionModelFromDb,
};
