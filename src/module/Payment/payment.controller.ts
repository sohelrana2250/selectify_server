import { RequestHandler } from "express";
import catchAsync from "../../utility/catchAsync";
import { PaymentServices } from "./payment.services";
import sendRespone from "../../utility/sendRespone";
import httpStatus from "http-status";


const PaymentGetWay:RequestHandler=catchAsync(async(req,res)=>{

    const {id}=req.user;

    const result=await PaymentServices.PaymentGetWayFromDb(req.body,id,req.params.companyApplyId);
    sendRespone(res,{success:true,statusCode:httpStatus.OK,message:"Successfully Done Your Payment",data:result});

});

const FindAllPaymentList:RequestHandler=catchAsync(async(req,res)=>{
    const result=await PaymentServices.FindAllPaymentListFromDb(req.query);
    sendRespone(res,{success:true,statusCode:httpStatus.OK,message:"Successfully Find All Payment",data:result});
    
});

const FindAllPaymentListAdmin:RequestHandler=catchAsync(async(req,res)=>{

    const result=await PaymentServices.FindAllPaymentListAdminFromDb(req.query);
    sendRespone(res,{success:true,statusCode:httpStatus.OK,message:"Successfully Find All Payment",data:result});

});

const UpdatePaymentStatus:RequestHandler=catchAsync(async(req,res)=>{
    const result=await PaymentServices.UpdatePaymentStatusFromDb(req.params.transactionId);
    sendRespone(res,{success:true,statusCode:httpStatus.OK,message:"Successfully Update Payment Status",data:result});
});

const FailedPaymentStatusDelete:RequestHandler=catchAsync(async(req,res)=>{
    const result=await PaymentServices.FailedPaymentStatusDeleteFromDb(req.params.transactionId);
    sendRespone(res,{success:true,statusCode:httpStatus.OK,message:"Successfully Delete Payment Status",data:result});
})

export const PaymentController={
    PaymentGetWay,
    FindAllPaymentList,
    FindAllPaymentListAdmin,
    UpdatePaymentStatus,
    FailedPaymentStatusDelete
}