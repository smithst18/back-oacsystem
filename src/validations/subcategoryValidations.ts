import { check } from "express-validator";
import { validateResult } from '../utils/handleValidators';
import { Response, Request, NextFunction } from "express";

export const validsubcategoriesList = [
    check("_id")
        .exists()
        .withMessage('debe existir')
        .trim()
        .notEmpty()
        .withMessage('No debe estar vacio')
        .isMongoId()
        .withMessage("Debe ser un id mongo valido"),
    (req:Request, res:Response, next:NextFunction) => validateResult(req, res, next),
    
];