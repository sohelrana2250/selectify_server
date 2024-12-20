import httpStatus from 'http-status';
import AppError from '../../app/error/AppError';
import { TPostRecuritment } from './postrecruitment.interface';
import postrecuritments from './postrecruitment.model';
import { companyapplys } from '../CompanyApply/companyapply.model';
import QueryBuilder from '../../app/builder/QueryBuilder';
import { excludeField } from './postrecruitment.constant';

const CreatePostRecuritmentIntoDb = async (payload: TPostRecuritment) => {
  const isExistPostRecuritment = await companyapplys.isCompanyApplyExist(
    payload.companyapplyId.toString(),
  );
  if (!isExistPostRecuritment) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Error Post Recuritment Not Exist In the Data base',
      '',
    );
  }
  if (!isExistPostRecuritment.isVerified) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Error Company is Not Varified',
      '',
    );
  }
  if (!isExistPostRecuritment.payment) {
    throw new AppError(httpStatus.NOT_FOUND, 'Error Payment Not Completed', '');
  }
  try {
    const postrecruitmentBuilder = new postrecuritments(payload);
    const result = await postrecruitmentBuilder.save();
    if (!result) {
      throw new AppError(
        httpStatus.BAD_GATEWAY,
        'Error post recuritment issues',
        '',
      );
    }
    return {
      message: 'Successfully Recorded Post Recuritment',
    };
  } catch (error) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Error fetching post recuritment data',
      '',
    );
  }
};

const Find_All_Post_Recruitment_ApplyUser_FromDb = async (
  query: Record<string, unknown>,
) => {
  try {
    const officeQuery = new QueryBuilder(
      postrecuritments.find(
        {},
        {
          companyname: true,
          position: true,
          salary: true,
          endtingdate: true,
        },
      ),
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
      'Error fetching post recuritment data',
      '',
    );
  }
};

const Find_AdminAll_Post_Recruitment_FromDb = async (
  query: Record<string, unknown>,
) => {
  try {
    const officeQuery = new QueryBuilder(
      postrecuritments.find().populate('companyapplyId'),
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
      'Error fetching post recuritment data',
      '',
    );
  }
};

const Find_Specific_UserAll_Post_Recruitment_FromDb = async (
  companyapplyId: String,
) => {
  try {
    const officeQuery = new QueryBuilder(
      postrecuritments.find({ companyapplyId: companyapplyId }),
      {},
    )
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
      'Error fetching post recuritment data',
      '',
    );
  }
};

const Find_Specific_Post_RecruitmentFormDb = async (id: string) => {
  try {
    const result = await postrecuritments.isPostRecuritmentExist(id);
    return result;
  } catch (error) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Error fetching post recuritment data',
      '',
    );
  }
};

const Update_Post_RecuritmentFromDb = async (
  payload: TPostRecuritment,
  id: string,
) => {
  const isExistPostRecuritment = await companyapplys.isCompanyApplyExist(
    payload.companyapplyId.toString(),
  );
  if (!isExistPostRecuritment) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Error Post Recuritment Not Exist In the Data base',
      '',
    );
  }
  if (!isExistPostRecuritment.isVerified) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Error Company is Not Varified',
      '',
    );
  }
  if (!isExistPostRecuritment.payment) {
    throw new AppError(httpStatus.NOT_FOUND, 'Error Payment Not Completed', '');
  }

  try {
    const result = await postrecuritments.findByIdAndUpdate(id, payload, {
      new: true,
      upsert: true,
    });
    if (!result) {
      throw new AppError(
        httpStatus.BAD_GATEWAY,
        'Error ppdate post recuritment process',
        '',
      );
    }
    return {
      message: 'Successfully Update Post RecuritmentF',
    };
  } catch (error) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Error fetching post recuritment data',
      '',
    );
  }
};

const Delete_Post_RecuritmentFromDb = async (id: string) => {
  try {
    const result = await postrecuritments.findByIdAndDelete(id);
    if (!result) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Error delete post recuritment issues',
        '',
      );
    }
    return {
      message: 'Successfully Post Recuritment Delete',
    };
  } catch (error) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Error fetching post recuritment data',
      '',
    );
  }
};



export const PostRecuritmentServices = {
  CreatePostRecuritmentIntoDb,
  Find_All_Post_Recruitment_ApplyUser_FromDb,
  Find_AdminAll_Post_Recruitment_FromDb,
  Find_Specific_UserAll_Post_Recruitment_FromDb,
  Find_Specific_Post_RecruitmentFormDb,
  Update_Post_RecuritmentFromDb,
  Delete_Post_RecuritmentFromDb,
};
