

import { z } from "zod";

 const TCompanyApplyValidationSchema = z.object({
    body:z.object({
        subscriptionmodelId: z.string({message:" subscriptionmodelId is required"}),
        companyname: z.string({message:"company name is required"}),
        country: z.string({message:"country is required"}),
        address: z.string({message:"address is required"}),
        email: z.string().email({ message: "email is required" }),
        phonenumber: z .string({message:"phone number is required"}).regex(/^\+?[1-9]\d{1,14}$/, { message: "Invalid phone number format" }),
        payment: z.boolean({message:"payment is required"}).default(false).optional(),
        isDeleted: z.boolean().optional(),
      })
});



const TUpdateCompanyApplyValidationSchema = z.object({
    body:z.object({

        companyname: z.string({message:"company name is required"}).optional(),
        country: z.string({message:"country is required"}).optional(),
        address: z.string({message:"address is required"}).optional(),
        email: z.string().email({ message: "email is required" }).optional(),
        phonenumber: z .string({message:"phone number is required"}).regex(/^\+?[1-9]\d{1,14}$/, { message: "Invalid phone number format" }).optional(),
      
      }).optional()
});

export const CompanyApplyValidation={
    TCompanyApplyValidationSchema,
    TUpdateCompanyApplyValidationSchema
}