import { Model } from "mongoose";


export type TSubscriptionname={

    subscriptionname:string;
    price:string;
    subscriptiondetails:string,
    subscriptionbenefit:string[]
    photo:string;
    servicesdate:string;



}

export interface SubscriptionModal extends Model<TSubscriptionname> {
    // eslint-disable-next-line no-unused-vars
    isSubScriptionExist(id:string):Promise<TSubscriptionname>,
    
  }



