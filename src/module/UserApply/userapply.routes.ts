import express from 'express';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../User/user.constant';
import validationRequest from '../../middleware/validationRequest';
import { UserApplyValidationSchema } from './userapply.validation';
import { UserApplyController } from './userapply.controller';

const router=express.Router();

router.post("/user_apply_jobs/:postrecuritmentsId",auth(USER_ROLE.USER),validationRequest(UserApplyValidationSchema.TUserApplyValidationSchema),UserApplyController.CreateUserApply);
router.get('/find_my_apply_jobs',auth(USER_ROLE.USER),UserApplyController.Find_User_All_ApplyJob);
router.get("/find_all_apply_jobs",auth(USER_ROLE.ADMIN),UserApplyController.Find_Admin_All_ApplyJob);
router.delete("/delete_apply_jobs/:id",auth(USER_ROLE.ADMIN),UserApplyController.Delete_ApplyJob);


export const UserApplyRouter=router;