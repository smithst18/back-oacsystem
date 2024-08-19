//express router instance
import { Router } from "express";
//controllers import
import { subcategoryControllers } from "../controllers";
//validations middlewares
// import { 
//   validLogin,
//   validSignup,
//   validUpdate,
//   validDelete
// } from "../validations/userValidations";

const router = Router();

//routes definition 
router.get('/getAll',subcategoryControllers.getAll);
export default router;