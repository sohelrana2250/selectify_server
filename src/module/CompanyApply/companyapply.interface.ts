import { Model, Types } from "mongoose";


export type TCompanyApply={

    subscriptionmodelId:Types.ObjectId;
    userId:Types.ObjectId;
    companyname:string;
    country:string;
    address:string;
    email:string
    phonenumber:string;
    payment:boolean;
    isVerified:boolean;
    isDeleted?:boolean;

}

export interface CompanyApplyModel extends Model<TCompanyApply> {
    // eslint-disable-next-line no-unused-vars
    isCompanyApplyExist(id:string):Promise<TCompanyApply>,
    
  }

