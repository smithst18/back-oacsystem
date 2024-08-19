//express router instance
import { Router } from "express";
//controllers import
import { typeControllers } from "../controllers";
//validations middlewares
import { 
  validtypesList,
} from "../validations/typesValidations";

const router = Router();

//routes definition 
router.get('/getAllBySubcategory/:_id',validtypesList,typeControllers.getAllTypeBySubcategory);
export default router;