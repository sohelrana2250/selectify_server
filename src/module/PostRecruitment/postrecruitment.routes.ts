

import express, { Router } from 'express';
import validationRequest from '../../middleware/validationRequest';
import { PostRecruitmentValidationSchema } from './postrecruitment.validation';
import { PostRecuritmentController } from './postrecruitment.controller';

const router=express.Router();

router.post("/create_recruitment",validationRequest(PostRecruitmentValidationSchema.TPostRecruitmentValidationSchema),PostRecuritmentController.CreatePostRecuritment);
router.get("/find_all_post_recruitment_applyuser",PostRecuritmentController.Find_All_Post_Recruitment_ApplyUser);
router.get("/find_all_admin_post_recruitment",PostRecuritmentController.Find_AdminAll_Post_Recruitment);
router.get("/find_specific_user_post_recruitment/:companyapplyId",PostRecuritmentController.Find_Specific_UserAll_Post_Recruitment)
router.get("/find_specific_post_recruitment/:id",PostRecuritmentController.Find_Specific_Post_Recruitment);
router.patch("/update_post_recruitment/:id",validationRequest(PostRecruitmentValidationSchema.TUpdatePostRecruitmentValidationSchema),PostRecuritmentController.Update_Post_Recuritment);
router.delete("/delete_post_recuritment/:id",PostRecuritmentController.Delete_Post_Recuritment);

export const PostRecuritmentRouter=router;


