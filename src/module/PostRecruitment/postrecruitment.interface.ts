import { Model, Types } from "mongoose";



 export interface TResponsibilities {
     
    _id:Types.ObjectId;
    responsibilities:string;  
 }
 export interface TSkills{
    _id:Types.ObjectId;
    skills:string; 
 }
 export interface TRequirements{
    _id:Types.ObjectId;
    requirements:string; 
 }
export interface TPostRecuritment{

    companyapplyId:Types.ObjectId
    position:string;
    companyname:string;
    experience:string;
    workingtime: 'FULL TIME' | 'PART TIME' | 'CONTRACTUAL';
    location:string;
    overview:string;
    responsibilities:TResponsibilities[];
    skills:TSkills[];
    requirements:TRequirements[];
    salary: number | 'negotiation';
    currency: 'BDT' | 'USD';
    startingdate:string;
    endtingdate:string;
    image:string;
    isDeleted?:boolean;

}

export interface PostRecuritmentModel extends Model<TPostRecuritment> {
    // eslint-disable-next-line no-unused-vars
    isPostRecuritmentExist(id:string):Promise<TPostRecuritment>,
    
  }
