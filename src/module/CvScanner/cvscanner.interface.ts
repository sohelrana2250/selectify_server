import { Model } from "mongoose";
import { Types } from "mongoose";


export interface TCV_Profile  {

    userId:Types.ObjectId,
    postrecuritmentsId:Types.ObjectId
    personalInfo: {
      name: string;
      email: string;
      phone: string;
      address: string;
      linkedin: string;
      github: string;
      website: string;
    };
    education: Array<string>;
    experience: Array<{
      company: string;
      role: string;
      period: string;
      description: string;
    }>;
    skills: {
      technical: Array<string>;
      soft: Array<string>;
      languages: Array<string>;
      tools: Array<string>;
    };
    projects: Array<string>;
    certifications: Array<string>;
    languages: Array<string>;
    isUplodeCv:Boolean;
    isDeleted:false,
  };

  export interface CvScannerModel extends Model<TCV_Profile> {
     
      isCVProfileExist(id:string):Promise<TCV_Profile>,
      
    }
  
  