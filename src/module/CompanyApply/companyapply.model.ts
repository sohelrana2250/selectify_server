import { Schema, model } from "mongoose";
import { CompanyApplyModel, TCompanyApply } from "./companyapply.interface";


const TCompanyApplySchema = new Schema<TCompanyApply,CompanyApplyModel>(
    {
      subscriptionmodelId: {type:Schema.Types.ObjectId,required:[true,'Subscription Model Id is Required'],ref:'subscriptionmodels'},
      companyname: {
        type: String,
        required: true,
        trim: true,
      },
      country: {
        type: String,
        required: true,
        trim: true,
      },
      address: {
        type: String,
        required: true,
        trim: true,
      },
      email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, "Invalid email format"], 
      },
      phonenumber: {
        type: String,
        required: true,
        trim: true,
        match: [/^\+?[1-9]\d{1,14}$/, "Invalid phone number"], 
      },
      payment: {
        type: Boolean,
        required:false,
        trim: true,
        default:false
      },
      isVerified:{
        type: Boolean,
        required:false,
        default:false
      },
      isDeleted: {
        type: Boolean,
        default: false,
      },
    },
    {
      timestamps: true, // Adds createdAt and updatedAt fields
    }
  );

  // midlewere 
TCompanyApplySchema.pre('find',function(next){
    this.find({ isDelete:{$ne:true}})
    next();
  });
  TCompanyApplySchema.pre('aggregate',function(next){

    this.pipeline().unshift({$match:{isDelete:{$ne:true}}})
    next();
  });
  TCompanyApplySchema.pre('findOne',function(next){
  
    this.find({ isDelete:{$ne:true}})
  
    next();
  });

TCompanyApplySchema.statics.isCompanyApplyExist=async function(id:string)
{
    return await companyapplys.findById(id);
}

  export const companyapplys=model<TCompanyApply,CompanyApplyModel>('companyapplys',TCompanyApplySchema);
