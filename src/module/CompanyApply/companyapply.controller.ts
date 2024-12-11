import { RequestHandler } from "express";
import catchAsync from "../../utility/catchAsync";
import { CompanyApplyServices } from "./companyapply.services";
import httpStatus from "http-status";
import sendRespone from "../../utility/sendRespone";



const CreateCompanyApply:RequestHandler=catchAsync(async(req,res)=>{

    const result=await CompanyApplyServices.CreateCompanyApplyIntoDb(req.body);
    sendRespone(res,{success:true,statusCode:httpStatus.CREATED,message:"Successfully Recorded",data:result});


});

const FindAllApplyCompany:RequestHandler=catchAsync(async(req,res)=>{
    const result=await CompanyApplyServices.FindAllApplyCompanyFromDb(req.query);
    sendRespone(res,{success:true,statusCode:httpStatus.OK,message:"Find All Company Apply List",data:result});

});

const FindSpecificCompanyApplyList:RequestHandler=catchAsync(async(req,res)=>{
    
    const result=await CompanyApplyServices.FindSpecificCompanyApplyListFromDb(req.params.id);
    sendRespone(res,{success:true,statusCode:httpStatus.OK,message:"Find Find Specific Company Apply List",data:result});
});

const UpdateCompanyApply:RequestHandler=catchAsync(async(req,res)=>{

    const result=await CompanyApplyServices.UpdateCompanyApplyFromDb(req.params.id,req.body);
    sendRespone(res,{success:true,statusCode:httpStatus.OK,message:"Successfully Update Company Apply Info",data:result});

});

const DeleteCompanyApply:RequestHandler=catchAsync(async(req,res)=>{
     
    const result=await CompanyApplyServices.DeleteCompanyApplyFromDb(req.params.id);
    sendRespone(res,{success:true,statusCode:httpStatus.OK,message:"Successfully Delete",data:result});
});

const FindSpecifiUserSubScriptionApply:RequestHandler=catchAsync(async(req,res)=>{

    const {email}=req.user;
    const result=await CompanyApplyServices.FindSpecifiUserSubScriptionApplyFromDb(email);
    sendRespone(res,{success:true,statusCode:httpStatus.OK,message:"Successfully Find",data:result});
})


export const CompanyApplyController={
    CreateCompanyApply,
    FindAllApplyCompany,
    FindSpecificCompanyApplyList,
    UpdateCompanyApply,
    DeleteCompanyApply,
    FindSpecifiUserSubScriptionApply
}