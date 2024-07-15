//express router instance
import { Router } from "express";
//middlewares
//import { verifyAuth } from "../middlewares/verifyAuth";
//controllers import
import { caseControllers } from "../controllers";
//validations middlewares
import { 
  validCase,
} from "../validations/caseValidations";

const router = Router();

//routes definition 
router.post('/save', validCase ,caseControllers.save);
// router.post('/signup', validSignup ,userControllers.signUp);
// router.put('/updateUser', validUpdate ,userControllers.update);
// router.get('/getusers/:page',userControllers.getUsers);
// router.put('/delete',validDelete,userControllers.deactiveted);
export default router;