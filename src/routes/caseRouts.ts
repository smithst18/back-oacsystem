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

const router = Router();

//routes definition 
router.post('/save', validCase ,caseControllers.save);
router.get('/getcases/:page/:userId/:search?',validCaseSearch,caseControllers.getCases);
router.get('/getcaseById/:id',validCasesubId,caseControllers.getcaseById);
router.put('/updateCaseById',validCasesubId,validOptionalCase,caseControllers.updateCase);
router.get('/generalStaticsPerMonth',caseControllers.generalStaticsPerMonth);
router.get('/getCasesInExcel',caseControllers.generateExcel);
router.get('/generateExcelOneCase/:id',validCasesubId,caseControllers.generateExcelOneCase);

export default router;