import express from 'express';
import { ContructRouter } from '../module/Contract/contract.routes';
import { UserRouter } from '../module/User/user.routes';
import { AuthRouter } from '../module/Auth/auth.routes';
import { SubscriptionRouter } from '../module/SubscriptionModel/subscription.routes';
import { CompanyApplyRouter } from '../module/CompanyApply/companyapply.routes';
import { PaymentRouter } from '../module/Payment/payment.routes';


const router=express.Router();
const moduleRouth=[
    {path:"/user", route:UserRouter},
    {path:"/auth", route: AuthRouter},
    {path:'/contract',route:ContructRouter},
    {path:"/subscriptionmodel",route:SubscriptionRouter},
    {path:"/company_apply",route:CompanyApplyRouter},
    {path:"/payment",route:PaymentRouter}  
]

moduleRouth.forEach((v)=>router.use(v.path,v.route));

export default router;