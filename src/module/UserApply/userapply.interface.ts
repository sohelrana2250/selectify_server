import { Model, Types } from 'mongoose';

export interface TUserApply {
  userId: Types.ObjectId;
  postrecuritmentsId: Types.ObjectId;
  cvscannerId:Types.ObjectId;
  name: string;
  email: string;
  country: string;
  github: string;
  linkdin: string;
  portfolio: string;
  isUplodeCv: Boolean;
  cvrating:Number;
  isDeleted?: Boolean;
}
export interface UserApplyModal extends Model<TUserApply> {
  
  isExistUserApply(id: string): Promise<TUserApply>;
}
