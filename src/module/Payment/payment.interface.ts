

import { Model, Types } from "mongoose";


export type TPayment={

    userId?:Types.ObjectId;
    name:string;
    email:string;
    address:string;
    amount:number;
    contractNumber:string;
    transactionId?:string;
    isDeleted?:boolean;

}



export interface PaymentModal extends Model<TPayment> {
    // eslint-disable-next-line no-unused-vars
    isPaymentExist(id:string):Promise<TPayment>,
    
  }



