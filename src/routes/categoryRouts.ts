//express router instance
import { Router } from "express";
//controllers import
import { categoryControllers } from "../controllers";
//validations middlewares
// import { 
//   validLogin,
//   validSignup,
//   validUpdate,
//   validDelete
// } from "../validations/userValidations";

const router = Router();

//routes definition 
router.get('/getAll',categoryControllers.getAll);
export default router;