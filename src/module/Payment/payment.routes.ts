import express from 'express';
import { PaymentController } from './payment.controller';
import validationRequest from '../../middleware/validationRequest';
import { PaymentValdation } from './payment.validation';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../User/user.constant';

const router=express.Router();

router.post("/create_payment", auth(USER_ROLE.USER), validationRequest(PaymentValdation.TPaymentValidationSchema), PaymentController.PaymentGetWay);

export const PaymentRouter=router;

