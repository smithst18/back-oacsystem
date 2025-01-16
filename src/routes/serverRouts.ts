//express router instance
import { Router } from "express";

import { serverControllers } from "../controllers";

const router = Router();

//routes definition 
router.get('/test',serverControllers.serverComprobation);
export default router;