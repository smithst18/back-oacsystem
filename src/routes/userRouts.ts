//express router instance
import { Router } from "express";
//middlewares
//import { verifyAuth } from "../middlewares/verifyAuth";
//controllers import
import { userControllers } from "../controllers";
//validations middlewares
import { validLogin } from "../validations/userValidations";

const router = Router();

//routes definition 
router.post('/login', validLogin ,userControllers.login);

export default router;