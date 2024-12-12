// name:string;
// email:string;
// address:string;
// amount:number;
// contractNumber:string;

import {z} from 'zod';


const TPaymentValidationSchema=z.object({
    body:z.object({
        name:z.string({required_error:"name is required"}),
        email:z.string({required_error:"email is required"}),
        address:z.string({required_error:"address is required"}),
        amount:z.number({required_error:"amount is required"}),
        contractNumber:z.string({required_error:"contact number is required"})
    })
});

export const PaymentValdation={
    TPaymentValidationSchema
}