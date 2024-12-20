import { model, Schema } from "mongoose";
import { TUserApply,UserApplyModal } from "./userapply.interface";


const TUserApplySchema = new Schema<TUserApply,UserApplyModal>(
  {
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'users' },
    postrecuritmentsId: { type: Schema.Types.ObjectId, required: true, ref: 'postrecuritments' },
    cvscannerId:{type:Schema.Types.ObjectId,required:true,ref:"cvscanners"},
    name: { type: String, required: true },
    email: { type: String, required: true },
    country: { type: String, required: true },
    github: { type: String, required: true },
    linkdin: { type: String, required: true },
    portfolio: { type: String, required: true },
    isUplodeCv: { type: Boolean, required: true,default:true },
    cvrating:{type:Number,required:false,default:0},
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

// midlewere 
TUserApplySchema.pre('find',function(next){
  this.find({isDeleted:{$ne:true}})
  next();
});TUserApplySchema.pre('aggregate',function(next){

  this.pipeline().unshift({$match:{isDeleted:{$ne:true}}})
  next();
});
TUserApplySchema.pre('findOne',function(next){

  this.find({isDeleted:{$ne:true}})

  next();
});




TUserApplySchema.statics.isExistUserApply = async function (id: string): Promise<TUserApply | null> {
  return userapplys.findById(id);
};

 const userapplys = model<TUserApply, UserApplyModal>('userapplys', TUserApplySchema);

 export default userapplys;
