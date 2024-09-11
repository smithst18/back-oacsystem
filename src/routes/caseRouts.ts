//express router instance
import { Router } from "express";
//middlewares
//import { verifyAuth } from "../middlewares/verifyAuth";
//controllers import
import { caseControllers } from "../controllers";
//validations middlewares
import { 
  validCase,
  validCasesubId,
  validOptionalCase,
  validCaseSearch,
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
router.get('/getcaseById/:caseSubId',validCasesubId,caseControllers.getcaseById);
router.put('/updateCaseById',validUserId,validCasesubId,validOptionalCase,caseControllers.updateCase);
router.get('/generalStaticsPerMonth',caseControllers.generalStaticsPerMonth);
router.get('/getCasesInExcel',caseControllers.generateExcel);
router.get('/generateExcelOneCase/:caseSubId',validCasesubId,caseControllers.generateExcelOneCase);
router.get('/generateExcelClosedCase/:caseSubId',validCasesubId,caseControllers.generateExcelClosedCase);

export default router;