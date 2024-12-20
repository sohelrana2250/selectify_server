import { Schema, model } from 'mongoose';
import { CvScannerModel, TCV_Profile } from './cvscanner.interface';

const TCV_ProfileSchema = new Schema<TCV_Profile, CvScannerModel>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: [true, 'user Id is Required'],
      ref: 'users',
    },
    postrecuritmentsId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'postrecuritments',
    },
    personalInfo: {
      name: { type: String, required: false },
      email: { type: String, required: false },
      phone: { type: String, required: false },
      address: { type: String, required: false },
      linkedin: { type: String, required: false },
      github: { type: String, required: false },
      website: { type: String, required: false },
    },
    education: { type: [String], default: [] },
    experience: {
      type: [
        {
          company: { type: String, required: false },
          role: { type: String, required: false },
          period: { type: String, required: false },
          description: { type: String, required: false },
        },
      ],
      default: [],
    },
    skills: {
      technical: { type: [String], default: [] },
      soft: { type: [String], default: [] },
      languages: { type: [String], default: [] },
      tools: { type: [String], default: [] },
    },
    projects: { type: [String], default: [] },
    certifications: { type: [String], default: [] },
    languages: { type: [String], default: [] },
    isUplodeCv:{type:Boolean, default:true},
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

// midlewere
TCV_ProfileSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
TCV_ProfileSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});
TCV_ProfileSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });

  next();
});

TCV_ProfileSchema.statics.isCVProfileExist = async function (id: string) {
  return cvscanners.findById(id);
};

const cvscanners = model<TCV_Profile, CvScannerModel>(
  'cvscanners',
  TCV_ProfileSchema,
);

export default cvscanners;
