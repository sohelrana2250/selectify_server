import { RequestHandler } from "express";
import catchAsync from "../../utility/catchAsync";
import { CvScannerServices } from "./cvscanner.services";
import sendRespone from "../../utility/sendRespone";
import httpStatus from "http-status";



const  InsertCvScanner:RequestHandler=catchAsync(async(req,res)=>{

    const result=await CvScannerServices.InsertCvScannerIntoDb(req.body,req.user.id,req.params.postrecuritmentsId);
    sendRespone(res,{success:true,statusCode:httpStatus.CREATED,message:"Successfully Recorded",data:result});
});

const  IsUplodeScanerCv:RequestHandler=catchAsync(async(req,res)=>{


    const result=await CvScannerServices.IsUplodeScanerCvFromDb(req.params.postrecuritmentsId,req.user.id);
    sendRespone(res,{success:true,statusCode:httpStatus.OK,message:"Successfully Find CvScaanner Data",data:result});

});


const  Find_All_Cv_Scanner_Info:RequestHandler=catchAsync(async(req,res)=>{
  

    const result=await CvScannerServices.Find_All_Cv_Scanner_Info_From_Db();
    sendRespone(res,{success:true,statusCode:httpStatus.OK,message:"Successfully Find All Cv Scanner Data",data:result});

});

const  Delete_Cv_Scanner:RequestHandler=catchAsync(async(req,res)=>{
    

    const result=await CvScannerServices.Delete_Cv_Scanner_FromDb(req.params.id);
    sendRespone(res,{success:true,statusCode:httpStatus.OK,message:"Successfully Delete Cv Scanner",data:result});
})

export const CvScannerController={
    InsertCvScanner,
    IsUplodeScanerCv,
    Find_All_Cv_Scanner_Info,
    Delete_Cv_Scanner
}