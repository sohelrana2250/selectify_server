import httpStatus from 'http-status';
import AppError from '../../app/error/AppError';
import { subscriptionmodels } from '../SubscriptionModel/subscription.model';
import { TCompanyApply } from './companyapply.interface';
import { companyapplys } from './companyapply.model';
import QueryBuilder from '../../app/builder/QueryBuilder';
import { excludeField } from './companyapply.constant';

const CreateCompanyApplyIntoDb = async (payload: TCompanyApply) => {
  const isExistSubScriptionModal = await subscriptionmodels.isSubScriptionExist(
    payload?.subscriptionmodelId?.toString(),
  );

  if (!isExistSubScriptionModal) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'subscription model not exist',
      '',
    );
  }

  const isExistCompany = await companyapplys.findOne({
    $or: [{ email: payload?.email }, { phonenumber: payload?.phonenumber }],
  });

  if (isExistCompany) {
    throw new AppError(
      httpStatus.CONFLICT,
      'Company details already exist',
      '',
    );
  }

  try {
    const companyApplyBuilder = new companyapplys(payload);
    const result = await companyApplyBuilder.save();
    return result;

    // send authorize email
    //panding
  } catch (error) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'companyapply model is not Founded',
      '',
    );
  }
};

const FindAllApplyCompanyFromDb = async (query: Record<string, unknown>) => {
  try {
    const officeQuery = new QueryBuilder(
      companyapplys.find().populate('subscriptionmodelId'),
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
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Error fetching company apply data',
      '',
    );
  }
};

const FindSpecificCompanyApplyListFromDb = async (id: string) => {
  try {
    const result = await companyapplys.isCompanyApplyExist(id);
    return result;
  } catch (error) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Error fetching company apply data',
      '',
    );
  }
};

const FindSpecifiUserSubScriptionApplyFromDb=async(email:string)=>{

  try {
    const result = await companyapplys.findOne({email}).populate('subscriptionmodelId')
    return result;
  } catch (error) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Error fetching company apply data',
      '',
    );
  }


}

const UpdateCompanyApplyFromDb = async (id: string, payload: TCompanyApply) => {
  const isExistApplyCompany = await companyapplys.isCompanyApplyExist(id);
  if (!isExistApplyCompany) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Apply Company Data Not Exist',
      '',
    );
  }

  const isExistCompany = await companyapplys.findOne({
    $or: [{ email: payload?.email }, { phonenumber: payload?.phonenumber }],
  });

  if (isExistCompany) {
    throw new AppError(
      httpStatus.CONFLICT,
      'Company details already exist',
      '',
    );
  }

  try {
    const result = await companyapplys.findByIdAndUpdate(id, payload, {
      new: true,
      upsert: true,
    });
    return result;
  } catch (error) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Error fetching company apply data',
      '',
    );
  }
};

const DeleteCompanyApplyFromDb = async (id: string) => {
  const isExistApplyCompany = await companyapplys.isCompanyApplyExist(id);
  if (!isExistApplyCompany) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Apply Company Data Not Exist',
      '',
    );
  }
  try {
    const result = await companyapplys.findByIdAndDelete(id);
    return result;
  } catch (error) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Error fetching company apply data',
      '',
    );
  }
};

export const CompanyApplyServices = {
  CreateCompanyApplyIntoDb,
  FindAllApplyCompanyFromDb,
  FindSpecificCompanyApplyListFromDb,
  UpdateCompanyApplyFromDb,
  DeleteCompanyApplyFromDb,
  FindSpecifiUserSubScriptionApplyFromDb
};
