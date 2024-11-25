import { RequestHandler } from "express";
import catchAsync from "../../utility/catchAsync";

import sendRespone from "../../utility/sendRespone";
import httpStatus from "http-status";
import { UserService } from "./user.services";


const createContract:RequestHandler=catchAsync(async(req,res)=>{

    const result=await UserService.createUserIntoDb(req.body);
    sendRespone(res,{success:true,statusCode:httpStatus.CREATED,message:"Sucessfulled Create Account",data:result});


});

export const UserController={
    createContract
}