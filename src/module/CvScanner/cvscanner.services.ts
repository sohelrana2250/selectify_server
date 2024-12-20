import httpStatus from 'http-status';
import AppError from '../../app/error/AppError';
import postrecuritments from '../PostRecruitment/postrecruitment.model';
import { TCV_Profile } from './cvscanner.interface';
import cvscanners from './cvscanner.model';
import QueryBuilder from '../../app/builder/QueryBuilder';

const InsertCvScannerIntoDb = async (
  payload: TCV_Profile,
  userId: string,
  postrecuritmentsId: string,
) => {
  const isExistPostRecuritment = await postrecuritments.findOne(
    { _id: postrecuritmentsId },
    { _id: true },
  );
  if (!isExistPostRecuritment) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Error: post recruitment does not exist in the database',
      '',
    );
  }

  const isAlredyExistCvScanner = await cvscanners.findOne(
    { $and: [{ postrecuritmentsId, userId }] },
    { _id: true },
  );
  if (isAlredyExistCvScanner) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Error: Alredy Exist This  Jobs Cv Details',
      '',
    );
  }

  try {
    const { userId: _, postrecuritmentsId: __, ...restOfPayload } = payload;
    const cvScannerBuilder = new cvscanners({
      userId,
      postrecuritmentsId,
      ...restOfPayload,
    });

    const result = await cvScannerBuilder.save();
    if (!result) {
      throw new AppError(
        httpStatus.FORBIDDEN,
        'Error: cv scanner data insert error',
        '',
      );
    }
    return {
      message: 'Successfully Recorded',
    };
  } catch (error) {
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Error fetching Cv Scanner Insert data',
      '',
    );
  }
};

const IsUplodeScanerCvFromDb = async (
  postrecuritmentsId: string,
  userId: string,
) => {
  try {
    const result = await cvscanners.findOne(
      { $and: [{ postrecuritmentsId, userId }] },
      {
        _id: true,
        isUplodeCv: true,
      },
    );
    return result;
  } catch (error) {
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Error fetching Cv Scanner fetching data',
      '',
    );
  }
};

const Find_All_Cv_Scanner_Info_From_Db = async () => {
  try {
    const officeQuery = new QueryBuilder(
      cvscanners.find().populate('userId').populate('postrecuritmentsId'),
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

const Delete_Cv_Scanner_FromDb = async (id: string) => {
  try {
    const result = await cvscanners.findByIdAndDelete(id);
    if (!result) {
      throw new AppError(
        httpStatus.BAD_GATEWAY,
        'Error cv scanners issues',
        '',
      );
    }
    return {
      message: 'Delete Scanner CV Successfully',
    };
  } catch (error) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Error fetching delete cv scanner issues',
      '',
    );
  }
};

export const CvScannerServices = {
  InsertCvScannerIntoDb,
  IsUplodeScanerCvFromDb,
  Find_All_Cv_Scanner_Info_From_Db,
  Delete_Cv_Scanner_FromDb,
};
