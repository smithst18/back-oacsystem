//express router instance
import { Router } from "express";
//controllers import
import { subcategoryControllers } from "../controllers";
//validations middlewares
import { 
  validsubcategoriesList,
} from "../validations/subcategoryValidations";

const router = Router();

//routes definition 
router.get('/getAllByCategory/:_id',validsubcategoriesList,subcategoryControllers.getAllByCategory);
export default router;