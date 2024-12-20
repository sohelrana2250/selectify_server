import { RequestHandler } from "express";
import catchAsync from "../../utility/catchAsync";
import { UserApplyServices } from "./userapply.services";
import sendRespone from "../../utility/sendRespone";
import httpStatus from "http-status";



const CreateUserApply:RequestHandler=catchAsync(async(req,res)=>{

    const result=await UserApplyServices.CreateUserApplyIntoDb(req.body,req.params.postrecuritmentsId, req.user.id);
    sendRespone(res,{success:true,statusCode:httpStatus.CREATED,message:"Successfully Recorded Apply",data:result});
});


const  Find_User_All_ApplyJob:RequestHandler=catchAsync(async(req,res)=>{


    const result=await UserApplyServices.Find_User_All_ApplyJob_FromDb(req.user.id,req.params);
    sendRespone(res,{success:true,statusCode:httpStatus.OK,message:"Successfully Find My Apply",data:result});
});

const  Find_Admin_All_ApplyJob:RequestHandler=catchAsync(async(req,res)=>{
    const result=await UserApplyServices.Find_Admin_All_ApplyJob_FromDb(req.params);
    sendRespone(res,{success:true,statusCode:httpStatus.OK,message:"Successfully Find All  Apply",data:result});

});

const Delete_ApplyJob:RequestHandler=catchAsync(async(req,res)=>{

    const result=await UserApplyServices.Delete_ApplyJob_FromDb(req.params.id);
    sendRespone(res,{success:true,statusCode:httpStatus.OK,message:"Successfully Delete Apply",data:result});

});

export  const UserApplyController={
    CreateUserApply,
    Find_User_All_ApplyJob,
    Find_Admin_All_ApplyJob,
    Delete_ApplyJob
}