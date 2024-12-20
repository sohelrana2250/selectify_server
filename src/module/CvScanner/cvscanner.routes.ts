

import express from 'express';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../User/user.constant';
import validationRequest from '../../middleware/validationRequest';
import { CV_ProfileValidation } from './cvscanner.validation';
import { CvScannerController } from './cvscanner.controller';

const router=express.Router();

router.post('/insert_cv_scanner/:postrecuritmentsId',auth(USER_ROLE.USER),validationRequest(CV_ProfileValidation.TCV_ProfileValidationSchema),CvScannerController.InsertCvScanner);
router.get('/is_uplode_cv/:postrecuritmentsId',auth(USER_ROLE.USER),CvScannerController.IsUplodeScanerCv);
router.get("/find_all_cv_scanner",auth(USER_ROLE.ADMIN),CvScannerController.Find_All_Cv_Scanner_Info);
router.delete("/delete_cv_scanner/:id",auth(USER_ROLE.ADMIN),CvScannerController.Delete_Cv_Scanner);
export const CvScannerRouter=router;




