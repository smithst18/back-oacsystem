import { check } from "express-validator";
import { validateResult } from '../utils/handleValidators';
import { Response, Request, NextFunction } from "express";

export const validLogin = [
    check("ci")
        .exists()
        .withMessage('debe existir')
        .trim()
        .notEmpty()
        .withMessage('No debe estar vacio')
        .isString()
        .withMessage('debe ser un string')
        .isLength({min:6,max:20})
        .withMessage('minimo 1 caracter, max 20 caracteres'),
    check("password")
        .exists()
        .withMessage('debe existir')
        .trim()
        .notEmpty()
        .withMessage('No debe estar vacio')
        .isString()
        .withMessage('debe ser un string')
        .isLength({min:6,max:30})
        .withMessage('minimo 6, max 30 caracteres'),
    (req:Request, res:Response, next:NextFunction) => validateResult(req, res, next),
    
];