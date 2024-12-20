import express from 'express';
import { USER_ROLE } from '../User/user.constant';
import auth from '../../middleware/auth';
import validationRequest from '../../middleware/validationRequest';
import { CompanyApplyValidation } from './companyapply.validation';
import { CompanyApplyController } from './companyapply.controller';



const router= express.Router();

router.post('/create_companyapply', auth(USER_ROLE.USER), validationRequest(CompanyApplyValidation.TCompanyApplyValidationSchema),CompanyApplyController.CreateCompanyApply);
router.get("/companyapply_varified/:companyApplyId", auth(USER_ROLE.USER), CompanyApplyController.isVarificationCompany);
router.get("/find_all_applycompanyList",auth(USER_ROLE.ADMIN,USER_ROLE.EMPLOYEE),CompanyApplyController.FindAllApplyCompany);
router.get("/find_specific_companylist/:id",auth(USER_ROLE.ADMIN),CompanyApplyController.FindSpecificCompanyApplyList);
router.get("/my_subscription_company",auth(USER_ROLE.USER),CompanyApplyController.FindSpecifiUserSubScriptionApply)
router.patch("/update_apply_company/:id",auth(USER_ROLE.ADMIN),validationRequest(CompanyApplyValidation.TUpdateCompanyApplyValidationSchema),CompanyApplyController.UpdateCompanyApply);
router.delete("/delete_applyed_company/:id",auth(USER_ROLE.ADMIN),CompanyApplyController.DeleteCompanyApply);


export const CompanyApplyRouter=router;