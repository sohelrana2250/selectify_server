import express from 'express';


import validationRequest from '../../middleware/validationRequest';
import { SubScriptionValidation } from './subscription.validation';
import { SubscriptionController } from './subscription.controller';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../User/user.constant';

const router= express.Router();

router.post('/create_subscriptionmodel', auth(USER_ROLE.EMPLOYEE,USER_ROLE.ADMIN), validationRequest(SubScriptionValidation.SubscriptionValidationSchema),SubscriptionController.CreateSubScriptionModel);
router.get("/find_all_home_subscriptionmodal",SubscriptionController.FindHomePageSubscriptionModel);
router.get("/find_all_subscriptionmodal",SubscriptionController.FindAllSubscriptionModel);
router.get("/find_specific_subscription/:id",SubscriptionController.FindSpecificSubscriptionModel);
export const SubscriptionRouter=router;