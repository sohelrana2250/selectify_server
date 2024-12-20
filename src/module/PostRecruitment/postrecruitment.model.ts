import { Schema, model } from "mongoose";
import { PostRecuritmentModel, TPostRecuritment, TRequirements, TResponsibilities, TSkills } from "./postrecruitment.interface";
import { CURRENCY, WORKINGTIME } from "./postrecruitment.constant";

const TResponsibilitiesSchema = new Schema<TResponsibilities>(
  {
    responsibilities: { type: String, required: true },
  },
  { _id: true } 
);

const TSkillsSchema = new Schema<TSkills>(
  {
    skills: { type: String, required: true },
  },
  { _id: true } 
);

const TRequirementsSchema = new Schema<TRequirements>(
  {
    requirements: { type: String, required: true },
  },
  { _id: true } 
);


const TPostRecuritmentSchema = new Schema<TPostRecuritment, PostRecuritmentModel>(
  {
    companyapplyId:{type:Schema.Types.ObjectId, required:[true,'companyapplyId is Required'], ref:"companyapplys" },
    position: { type: String, required: true },
    companyname: { type: String, required: true },
    experience: { type: String, required: true },
    workingtime: {
      type: String,
      enum: [WORKINGTIME.FULLTIME,WORKINGTIME.PARTTIME,WORKINGTIME.CONTRACTUAL],
      required: true,
    },
    location: { type: String, required: true },
    overview: { type: String, required: true },
    responsibilities: [TResponsibilitiesSchema],
    skills: [TSkillsSchema],
    requirements: [TRequirementsSchema],
    salary: {
      type: Schema.Types.Mixed,
      validate: {
        validator: function (value: any) {
          return typeof value === "number" || value === "negotiation";
        },
        message: "Salary must be a number or 'negotiation'",
      },
    },
    currency: {
      type: String,
      enum: [CURRENCY.BDT,CURRENCY.USD],
      required: true,
    },
    startingdate: { type: String, required: true },
    endtingdate: { type: String, required: true },
    image:{type:String,required:true},
    isDeleted:{type:Boolean,required:false,default:false}
  },
  {
    timestamps: true, 
  }
);

// midlewere 
TPostRecuritmentSchema.pre('find',function(next){
    this.find({ isDelete:{$ne:true}})
    next();
  });
  TPostRecuritmentSchema.pre('aggregate',function(next){

    this.pipeline().unshift({$match:{isDelete:{$ne:true}}})
    next();
  });
  TPostRecuritmentSchema.pre('findOne',function(next){
  
    this.find({ isDelete:{$ne:true}})
  
    next();
  });

TPostRecuritmentSchema.statics.isPostRecuritmentExist=async function(id:string)
{
    return await postrecuritments.findById(id);
}


// Create the model
const postrecuritments = model<TPostRecuritment, PostRecuritmentModel>(
  "postrecuritments",
  TPostRecuritmentSchema
);

export default postrecuritments;
