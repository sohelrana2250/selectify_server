import express from 'express';
import { PaymentController } from './payment.controller';

const router=express.Router();

router.post("/create_payment", PaymentController.PaymentGetWay);

export const PaymentRouter=router;
