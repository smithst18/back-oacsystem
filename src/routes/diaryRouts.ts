//express router instance
import { Router } from "express";
//controllers import
import { diaryControllers } from "../controllers";
//validations middlewares
import { 
  validDiary,
} from "../validations/diaryValidations";
import { validCaseId } from "../validations/caseValidations";

const router = Router();

//routes definition 
router.post('/save',validDiary,diaryControllers.save);
router.get('/getByCaseId/:caseId',validCaseId ,diaryControllers.getByCaseId);
router.get('/generateFileOneCase/:caseId',validCaseId,diaryControllers.generateFileOneCase);

export default router;