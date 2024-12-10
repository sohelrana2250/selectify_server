

import { z } from "zod";


const SubscriptionValidationSchema = z.object({
    body:z.object({
            subscriptionname: z.string().min(1, "Subscription name is required"),
            price: z.string().min(1, "Price is required"),
            subscriptiondetails: z.string().min(1, "Subscription details are required"),
            subscriptionbenefit: z.array(z.string()).min(1, "At least one subscription benefit is required"),
            photo: z.string().url("Photo must be a valid URL"),
            servicesdate: z.string().min(1, "Services date is required"),
        })
  
});

const UpdateSubscriptionValidationSchema = z.object({
    body:z.object({
            subscriptionname: z.string().min(1, "Subscription name is required").optional(),
            price: z.string().min(1, "Price is required").optional(),
            subscriptiondetails: z.string().min(1, "Subscription details are required").optional(),
            subscriptionbenefit: z.array(z.string()).min(1, "At least one subscription benefit is required").optional(),
            photo: z.string().url("Photo must be a valid URL").optional(),
            servicesdate: z.string().min(1, "Services date is required").optional(),
        }).optional()
  
});

export const SubScriptionValidation={
    SubscriptionValidationSchema,
    UpdateSubscriptionValidationSchema
}