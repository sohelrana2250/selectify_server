import express from 'express';

import { UserValidation } from './user.zod.validation';
import { UserController } from './user.controllers';
import validationRequest from '../../middleware/validationRequest';

const router= express.Router();

router.post('/',validationRequest(UserValidation.TUserZodSchema),UserController.createContract);

export const UserRouter=router;