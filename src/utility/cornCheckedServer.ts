import httpStatus from "http-status";
import AppError from "../app/error/AppError";
import { payments } from "../module/Payment/payment.model";



const CheckedPaymentSurveillance=async()=>{
    try{
       
        await payments.deleteOne({payment:false});

    }
    catch(error){
        throw new AppError(
            httpStatus.BAD_REQUEST,
            'Failed Payment Collection Checked',
            '',
          );
    }
}

export const CheckedServerSurveillance={
    CheckedPaymentSurveillance
}