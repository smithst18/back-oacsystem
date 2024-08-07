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
  validCaseSearch
} from "../validations/caseValidations";

const router = Router();

//routes definition 
router.post('/save', validCase ,caseControllers.save);
router.get('/getcases/:page/:userId/:search?',validCaseSearch,caseControllers.getCases);
router.get('/getcaseById/:id',validCaseId,caseControllers.getcaseById);
router.put('/updateCaseById',validCaseId,validOptionalCase,caseControllers.updateCase);
router.get('/generalStaticsPerMonth',caseControllers.generalStaticsPerMonth);

export default router;