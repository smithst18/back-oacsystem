//express router instance
import { Router } from "express";
//middlewares
//import { verifyAuth } from "../middlewares/verifyAuth";
//controllers import
import { userControllers } from "../controllers";
//validations middlewares
import { 
  validLogin,
  validSignup,
  validUpdate,
  validDelete
} from "../validations/userValidations";

const router = Router();

//routes definition 
router.post('/login', validLogin ,userControllers.login);
router.post('/signup', validSignup ,userControllers.signUp);
router.put('/updateUser', validUpdate ,userControllers.update);
router.get('/getusers/:page',userControllers.getUsers);
router.put('/delete',validDelete,userControllers.deactiveted);
export default router;