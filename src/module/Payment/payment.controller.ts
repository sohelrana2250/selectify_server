import { RequestHandler } from "express";
import catchAsync from "../../utility/catchAsync";
import { PaymentServices } from "./payment.services";
import sendRespone from "../../utility/sendRespone";
import httpStatus from "http-status";


const PaymentGetWay:RequestHandler=catchAsync(async(req,res)=>{

    const result=await PaymentServices.PaymentGetWayFromDb(req.body);
    sendRespone(res,{success:true,statusCode:httpStatus.OK,message:"Successfully Done Your Payment",data:result});

});

export const PaymentController={
    PaymentGetWay
}