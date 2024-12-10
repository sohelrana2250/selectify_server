import { model, Schema } from "mongoose";
import { SubscriptionModal, TSubscriptionname } from "./subscription.interfcae";


const TSubscriptionSchema = new Schema<TSubscriptionname,SubscriptionModal>(
    {
        subscriptionname: {
            type: String,
            required: true,
            trim: true,
        },
        price: {
            type: String,
            required: true,
            trim: true,
        },
        subscriptiondetails: {
            type: String,
            required: true,
            trim: true,
        },
        subscriptionbenefit: {
            type: [String],
            required: true,
        },
        photo: {
            type: String,
            required: true,
            trim: true,
        },
        servicesdate: {
            type: String,
            required: true,
            trim: true,
        },
    },
    {
        timestamps: true, // Adds createdAt and updatedAt fields
    }
);

// midlewere 
TSubscriptionSchema.pre('find',function(next){
    this.find({ isDelete:{$ne:true}})
    next();
  });
  TSubscriptionSchema.pre('aggregate',function(next){

    this.pipeline().unshift({$match:{isDelete:{$ne:true}}})
    next();
  });
  TSubscriptionSchema.pre('findOne',function(next){
  
    this.find({ isDelete:{$ne:true}})
  
    next();
  });
  TSubscriptionSchema.statics. isSubScriptionExist=async function(id:string)
{
    return await subscriptionmodels.findById(id);
}

  export const subscriptionmodels=model<TSubscriptionname,SubscriptionModal>('subscriptionmodels',TSubscriptionSchema);
