import { RequestHandler } from "express";
import catchAsync from "../../utility/catchAsync";
import { PostRecuritmentServices } from "./postrecruitment.services";
import sendRespone from "../../utility/sendRespone";
import httpStatus from "http-status";



const CreatePostRecuritment:RequestHandler=catchAsync(async(req,res)=>{

    const result=await PostRecuritmentServices.CreatePostRecuritmentIntoDb(req.body);
    sendRespone(res,{success:true,statusCode:httpStatus.CREATED,message:"Successfully Create Recuritment",data:result});

});

const Find_All_Post_Recruitment_ApplyUser:RequestHandler=catchAsync(async(req,res)=>{
    const result=await PostRecuritmentServices.Find_All_Post_Recruitment_ApplyUser_FromDb(req.query);
    sendRespone(res,{success:true,statusCode:httpStatus.OK,message:"Successfully Find",data:result});
})

const   Find_AdminAll_Post_Recruitment:RequestHandler=catchAsync(async(req,res)=>{
    const result=await PostRecuritmentServices.Find_AdminAll_Post_Recruitment_FromDb(req.query);
    sendRespone(res,{success:true,statusCode:httpStatus.OK,message:"Successfully Find",data:result});

});

const Find_Specific_UserAll_Post_Recruitment:RequestHandler=catchAsync(async(req,res)=>{
    const result=await PostRecuritmentServices.Find_Specific_UserAll_Post_Recruitment_FromDb(req.params.companyapplyId);
    sendRespone(res,{success:true,statusCode:httpStatus.OK,message:"Successfully Find",data:result});
    
});

const Find_Specific_Post_Recruitment:RequestHandler=catchAsync(async(req,res)=>{
    const result=await PostRecuritmentServices.Find_Specific_Post_RecruitmentFormDb(req.params.id);
    sendRespone(res,{success:true,statusCode:httpStatus.OK,message:"Successfully Find Specific Recruitmentt",data:result});
});

const Update_Post_Recuritment:RequestHandler=catchAsync(async(req,res)=>{
    const result=await PostRecuritmentServices.Update_Post_RecuritmentFromDb(req.body,req.params.id);
    sendRespone(res,{success:true,statusCode:httpStatus.OK,message:"Successfully Update Post Recruitmentt",data:result});
});

const Delete_Post_Recuritment:RequestHandler=catchAsync(async(req,res)=>{

    const result=await PostRecuritmentServices.Delete_Post_RecuritmentFromDb(req.params.id);
    sendRespone(res,{success:true,statusCode:httpStatus.OK,message:"Successfully Delete Post Recruitmentt",data:result});

});

export const PostRecuritmentController={
    CreatePostRecuritment,
    Find_All_Post_Recruitment_ApplyUser,
    Find_AdminAll_Post_Recruitment,
    Find_Specific_UserAll_Post_Recruitment,
    Find_Specific_Post_Recruitment,
    Update_Post_Recuritment,
    Delete_Post_Recuritment
}