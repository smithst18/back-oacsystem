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
router.get('/getByCaseId/:id',validCaseId ,diaryControllers.getByCaseId);

export default router;