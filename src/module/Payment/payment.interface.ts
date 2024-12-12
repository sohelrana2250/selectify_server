

import { Model, Types } from "mongoose";


export type TPayment={

    userId?:Types.ObjectId;
    companyApplyId:Types.ObjectId;
    name:string;
    email:string;
    address:string;
    amount:number;
    contractNumber:string;
    transactionId?:string;
    payment?:boolean;
    isDeleted?:boolean;

}



export interface PaymentModal extends Model<TPayment> {
    // eslint-disable-next-line no-unused-vars
    isPaymentExist(id:string):Promise<TPayment>,
    
  }



