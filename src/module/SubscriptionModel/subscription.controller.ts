import { RequestHandler } from "express";
import catchAsync from "../../utility/catchAsync";
import { SubscriptionsServices } from "./subscription.services";
import sendRespone from "../../utility/sendRespone";
import httpStatus from "http-status";



const  CreateSubScriptionModel:RequestHandler=catchAsync(async(req,res)=>{

    const data=req.body;
    const result=await SubscriptionsServices.CreateSubScriptionModelIntoDb(data);
     sendRespone(res,{success:true,statusCode:httpStatus.CREATED,message:"Successfully Create Subscription Modal",data:result});
});

const FindHomePageSubscriptionModel:RequestHandler=catchAsync(async(req,res)=>{
    
    const result=await SubscriptionsServices.FindHomePageSubscriptionModelFromDb();
    sendRespone(res,{success:true,statusCode:httpStatus.OK,message:"Successfully Find Subscription Modal",data:result});
});

const FindAllSubscriptionModel:RequestHandler=catchAsync(async(req,res)=>{

    const query=req.query;
    const result=await SubscriptionsServices.FindAllSubscriptionModelFromDb(query);
    sendRespone(res,{success:true,statusCode:httpStatus.OK,message:"Successfully Find Subscription Modal",data:result});
});

const FindSpecificSubscriptionModel:RequestHandler=catchAsync(async(req,res)=>{

    const {id}=req.params;
    const result=await SubscriptionsServices.FindSpecificSubscriptionModelFromDb(id);
    sendRespone(res,{success:true,statusCode:httpStatus.OK,message:"Successfully Find Specific  Subscription Modal",data:result});

});

const UpdateSubscriptionModel:RequestHandler=catchAsync(async(req,res)=>{
    
    const {id}=req.params;
    const data=req.body;
    const result=await SubscriptionsServices.UpdateSubscriptionModelFromDb(id,data);
    sendRespone(res,{success:true,statusCode:httpStatus.OK,message:"Successfully Update Subscription Modal",data:result});
});

const  DeleteSubScriptionModel:RequestHandler=catchAsync(async(req,res)=>{
    const {id}=req.params;
    const result= await SubscriptionsServices.DeleteSubScriptionModelFromDb(id);
    sendRespone(res,{success:true,statusCode:httpStatus.OK,message:"Successfully Delete Subscription Model",data:result});
})

export const SubscriptionController={
    CreateSubScriptionModel,
    FindHomePageSubscriptionModel,
    FindAllSubscriptionModel,
    FindSpecificSubscriptionModel,
    UpdateSubscriptionModel,
    DeleteSubScriptionModel
}