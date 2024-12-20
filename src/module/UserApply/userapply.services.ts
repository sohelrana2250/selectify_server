import httpStatus from 'http-status';
import AppError from '../../app/error/AppError';
import postrecuritments from '../PostRecruitment/postrecruitment.model';
import { TUserApply } from './userapply.interface';
import userapplys from './userapply.model';
import QueryBuilder from '../../app/builder/QueryBuilder';
import { excludeField } from './userapply.constant';
import cvscanners from '../CvScanner/cvscanner.model';

const CreateUserApplyIntoDb = async (
  payload: TUserApply,
  postrecuritmentsId: string,
  userId: string,
) => {

   const isUplodeCv=await cvscanners.findOne({$and:[{postrecuritmentsId,userId}]},{_id:true});
   if(!isUplodeCv){
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Error: cv not uplode this apply section',
      '',
    );
   }
  const isExistPostRecuritment = await postrecuritments.findOne(
    { _id: postrecuritmentsId, isDeleted: false }, // Ensure correct filter
    { _id: true },
  );

  if (!isExistPostRecuritment) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Error: This Post Recruitment does not exist in the database',
      '',
    );
  }

  const isExistUserApply = await userapplys.findOne({
    $and: [{ userId: userId }, { postrecuritmentsId }],
  });

  if (isExistUserApply) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Error: You have already applied for this job',
      '',
    );
  }

  try {
    const { userId: _, postrecuritmentsId: __,cvscannerId:___, ...restPayload } = payload;

    const userApplyBuilder = new userapplys({
      userId,
      postrecuritmentsId: isExistPostRecuritment._id,
      cvscannerId:isUplodeCv._id,
      ...restPayload,
    });

    const result = await userApplyBuilder.save();
    if (!result) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Error: user apply collection post request issues',
        '',
      );
    }
    return {
        message:"Successfully Apply Done"
    }
  } catch (error) {
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Error: user apply collection post request issues',
      '',
    );
  }
};


const Find_User_All_ApplyJob_FromDb = async (
  userId: string,
  query: Record<string, unknown>,
) => {
  try {
    const officeQuery = new QueryBuilder(
      userapplys.find({ userId }).populate('postrecuritmentsId'),
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
      'Error: user apply collection  user get request issues',
      '',
    );
  }
};





const Find_Admin_All_ApplyJob_FromDb = async (
  query: Record<string, unknown>,
) => {
  try {
    const officeQuery = new QueryBuilder(
      userapplys.find().populate('userId').populate('postrecuritmentsId').populate('cvscannerId'),
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
      'Error: user apply collection  admin get request issues',
      '',
    );
  }
};



const Delete_ApplyJob_FromDb=async(id:string)=>{

    try{

        const result=await userapplys.findByIdAndDelete(id);
        if(!result){
            throw new AppError(
                httpStatus.NOT_FOUND,
                'Error: user apply collection delete issues',
                '',
              );
        }
        return{
            message:"Successfully Delete Apply Jobs"
        }

    }
    catch (error) {
        throw new AppError(
          httpStatus.NOT_FOUND,
          'Error: user apply collection delete  request issues',
          '',
        );
      }

}

export const UserApplyServices = {
  CreateUserApplyIntoDb,
  Find_User_All_ApplyJob_FromDb,
  Find_Admin_All_ApplyJob_FromDb,
  Delete_ApplyJob_FromDb
};
