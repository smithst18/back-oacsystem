import { Router } from "express";
//controllers import
import { userControllers } from "../controllers";
//express router instance
const router = Router();

//routes definition 
router.post('/login',userControllers.login);

export default router;