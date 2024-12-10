import httpStatus from "http-status";
import AppError from "../../app/error/AppError";
import { TSubscriptionname } from "./subscription.interfcae";
import { subscriptionmodels } from "./subscription.model";
import QueryBuilder from "../../app/builder/QueryBuilder";
import { excludeField } from "./subscription.conostant";


const CreateSubScriptionModelIntoDb=async(payload:TSubscriptionname)=>{



    const subscriptionBuilder= new subscriptionmodels(payload);
    const result=await subscriptionBuilder.save();
    return result;
}

const FindHomePageSubscriptionModelFromDb = async () => {
    try {
        const result = await subscriptionmodels.find({}, {
            price: 1,
            subscriptionname: 1,
            servicesdate: 1,
            _id: 0 
        });
        return result;
    } catch (error) {
         throw new AppError(httpStatus.NOT_FOUND,'Error fetching subscription data','');
    }
};

const FindAllSubscriptionModelFromDb = async (query:Record<string,unknown>) => {
    try {
        const officeQuery = new QueryBuilder(subscriptionmodels.find(), query)
    .search(excludeField)
    .filter()
    .sort()
    .paginate()
    .fields();
  
  const result = await officeQuery.modelQuery;
  const meta = await officeQuery.countTotal();

     return {
      meta,result
     };
    } catch (error) {
         throw new AppError(httpStatus.NOT_FOUND,'Error fetching subscription data','');
    }
};

const FindSpecificSubscriptionModelFromDb = async (id:string) => {
    try {
        const result = await subscriptionmodels.isSubScriptionExist(id);
        return result;
    } catch (error) {
         throw new AppError(httpStatus.NOT_FOUND,'Error fetching subscription data','');
    }
};

const UpdateSubscriptionModelFromDb=async(id:string,payload:TSubscriptionname)=>{

    try {
        const isExist = await subscriptionmodels.isSubScriptionExist(id);

        if(!isExist){
            throw new AppError(httpStatus.NOT_FOUND,'Not Founded SubScription Model','');
        }

        const result=await subscriptionmodels.findByIdAndUpdate(id,payload,{new:true,upsert:true});
        return result;

       
    } catch (error) {
         throw new AppError(httpStatus.NOT_FOUND,'Error fetching subscription data','');
    }   
}

const DeleteSubScriptionModelFromDb=async(id:string)=>{

    try {
       
        const result=await subscriptionmodels.findByIdAndDelete(id);
        return result;

       
    } catch (error) {
         throw new AppError(httpStatus.NOT_FOUND,'Error fetching subscription data','');
    }   

}




export const SubscriptionsServices={
    CreateSubScriptionModelIntoDb,
    FindHomePageSubscriptionModelFromDb,
    FindAllSubscriptionModelFromDb,
    FindSpecificSubscriptionModelFromDb ,
    UpdateSubscriptionModelFromDb,
    DeleteSubScriptionModelFromDb

}