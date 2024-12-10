import httpStatus from "http-status";
import AppError from "../../app/error/AppError";
import { TSubscriptionname } from "./subscription.interfcae";
import { subscriptionmodels } from "./subscription.model";


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

const FindAllSubscriptionModelFromDb = async () => {
    try {
        const result = await subscriptionmodels.find({});
        return result;
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


export const SubscriptionsServices={
    CreateSubScriptionModelIntoDb,
    FindHomePageSubscriptionModelFromDb,
    FindAllSubscriptionModelFromDb,
    FindSpecificSubscriptionModelFromDb 

}