//express router instance
import { Router } from "express";
//middlewares
//import { verifyAuth } from "../middlewares/verifyAuth";
//controllers import
import { userControllers } from "../controllers";
//validations middlewares
import { 
  validLogin,
  validSignup
} from "../validations/userValidations";

const router = Router();

//routes definition 
router.post('/login', validLogin ,userControllers.login);
router.post('/signup', validSignup ,userControllers.signUp);
export default router;