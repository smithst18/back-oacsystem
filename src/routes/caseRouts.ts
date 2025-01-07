//express router instance
import { Router } from "express";
//middlewares
//import { verifyAuth } from "../middlewares/verifyAuth";
//controllers import
import { caseControllers } from "../controllers";
//validations middlewares
import { 
  validCase,
  validCaseId,
  validOptionalCase,
  validCaseSearch,
  validReportFilter,
} from "../validations/caseValidations";
import { validUserId } from "../validations/userValidations";
import { uploadFile, multerErrorHandler } from "../middlewares/multer";

const router = Router();

//routes definition 
router.post(
  '/save', // RUTA
  uploadFile.single('casoPdf'), // MULTER
  multerErrorHandler, //MULTER ERROR HANDLER
  validCase, // VALIDATOR
  caseControllers.save // CONTROLLER
);

router.get('/getcases/:page/:userId/:search?',validCaseSearch,caseControllers.getCases);
router.get('/getcaseById/:caseId',validCaseId,caseControllers.getcaseById);

router.put(
  '/updateCaseById',
  uploadFile.single('updatedCasoPdf'), // MULTER
  multerErrorHandler, //MULTER ERROR HANDLER
  validUserId,
  validCaseId,
  validOptionalCase,
  caseControllers.updateCase
);

router.get('/generalStaticsPerMonth',caseControllers.generalStaticsPerMonth);
router.get('/getCasesInExcel',caseControllers.generateExcel);
router.get('/generateExcelOneCase/:caseId',validCaseId,caseControllers.generateWordOneCase);
router.get('/generateExcelClosedCase/:caseId',validCaseId,caseControllers.generateExcelClosedCase);
router.get('/especificReport/:userId/:field/:fieldValue/:startDate/:endDate/:page',validUserId,validReportFilter,caseControllers.especificReport);

export default router;