import httpStatus from 'http-status';
import AppError from '../../app/error/AppError';
import { subscriptionmodels } from '../SubscriptionModel/subscription.model';
import { TCompanyApply } from './companyapply.interface';
import { companyapplys } from './companyapply.model';
import QueryBuilder from '../../app/builder/QueryBuilder';
import { excludeField } from './companyapply.constant';
import { jwtHalpers } from '../../app/jwtHealpers/jwtHealpers';
import config from '../../app/config';
import { sendEmail } from '../../utility/sendEmail';

const CreateCompanyApplyIntoDb = async (
  payload: TCompanyApply,
  role: string,
) => {
  const session = await companyapplys.startSession();
  session.startTransaction();

  try {
    const isExistSubScriptionModal =
      await subscriptionmodels.isSubScriptionExist(
        payload?.subscriptionmodelId?.toString(),
      );

    if (!isExistSubScriptionModal) {
      throw new AppError(
        httpStatus.NOT_FOUND,
        'Subscription model does not exist',
        '',
      );
    }

    const isExistCompany = await companyapplys.findOne(
      {
        $or: [{ email: payload?.email }, { phonenumber: payload?.phonenumber }],
      },
      null,
      { session },
    );

    if (isExistCompany) {
      throw new AppError(
        httpStatus.CONFLICT,
        'Company details already exist',
        '',
      );
    }

    const companyApplyBuilder = new companyapplys(payload);
    const result = await companyApplyBuilder.save({ session });

    const jwtPayload = {
      id: result?.id,
      role,
      email: payload.email,
    };
    
    const companyVarificationToken = jwtHalpers.generateToken(
      jwtPayload,
      config.jwt_access_srcret as string,
      config.expries_in_token as string,
    );

    const companyVarificationLink = `${config.frontend_url}?id=${jwtPayload.id}&token=${companyVarificationToken}`;
    await sendEmail(jwtPayload?.email, companyVarificationLink);

    await session.commitTransaction();
    session.endSession();

    return {
      message:
        'Check your email inbox or spam folder for the verification email.',
    };
  } catch (error: any) {
    await session.abortTransaction();
    session.endSession();

    if (error instanceof AppError) {
      throw error;
    }

    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Error processing company application',
      error?.message,
    );
  }
};

const  isVarificationCompanyFromDb=async(companyApplyId:string)=>{

    const isExistComapyApply=await companyapplys.isCompanyApplyExist(companyApplyId);
     if(!isExistComapyApply){
      throw new AppError(
        httpStatus.NOT_FOUND,
        'Comapy Apply Information Not Exist',
        '',
      );
     }
    const result=await companyapplys.findByIdAndUpdate(companyApplyId,{isVerified:true},{new:true,upsert:true});
    if(!result){
      throw new AppError(
        httpStatus.BAD_GATEWAY,
        'Issues By the Company Validation ',
        '',
      );
    }
    else{
       return{
         message:" Successfully Varified Company"
       }
    }
  }

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

const FindSpecifiUserSubScriptionApplyFromDb = async (email: string) => {
  try {
    const result = await companyapplys
      .findOne({ email })
      .populate('subscriptionmodelId');
    return result;
  } catch (error) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Error fetching company apply data',
      '',
    );
  }
};


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
  isVarificationCompanyFromDb,
  FindAllApplyCompanyFromDb,
  FindSpecificCompanyApplyListFromDb,
  UpdateCompanyApplyFromDb,
  DeleteCompanyApplyFromDb,
  FindSpecifiUserSubScriptionApplyFromDb,
};
