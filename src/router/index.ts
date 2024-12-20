import express from 'express';
import { ContructRouter } from '../module/Contract/contract.routes';
import { UserRouter } from '../module/User/user.routes';
import { AuthRouter } from '../module/Auth/auth.routes';
import { SubscriptionRouter } from '../module/SubscriptionModel/subscription.routes';
import { CompanyApplyRouter } from '../module/CompanyApply/companyapply.routes';
import { PaymentRouter } from '../module/Payment/payment.routes';
import { PostRecuritmentRouter } from '../module/PostRecruitment/postrecruitment.routes';
import { UserApplyRouter } from '../module/UserApply/userapply.routes';
import { CvScannerRouter } from '../module/CvScanner/cvscanner.routes';


const router=express.Router();
const moduleRouth=[
    {path:"/user", route:UserRouter},
    {path:"/auth", route: AuthRouter},
    {path:'/contract',route:ContructRouter},
    {path:"/subscriptionmodel",route:SubscriptionRouter},
    {path:"/company_apply",route:CompanyApplyRouter},
    {path:"/payment",route:PaymentRouter} ,
    {path:"/post_recruitment",route:PostRecuritmentRouter},
    {path:"/user_apply", route:UserApplyRouter},
    {path:"/cv_scanner",route:CvScannerRouter}
]

moduleRouth.forEach((v)=>router.use(v.path,v.route));

export default router;