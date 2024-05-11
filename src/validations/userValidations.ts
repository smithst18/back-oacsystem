import { check } from "express-validator";
import { validateResult } from '../utils/handleValidators';
import { Response, Request, NextFunction } from "express";

export const validLogin = [
    check("nickName")
        .exists()
        .withMessage('debe existir')
        .trim()
        .notEmpty()
        .withMessage('No debe estar vacio')
        .isString()
        .withMessage('debe ser un string')
        .isLength({min:1,max:30})
        .withMessage('minimo 1 caracter'),
    check("password")
        .exists()
        .withMessage('debe existir')
        .trim()
        .notEmpty()
        .withMessage('No debe estar vacio')
        .isString()
        .withMessage('debe ser un string')
        .isLength({min:1,max:20})
        .withMessage('minimo 1 max 20 caracteres'),
    (req:Request, res:Response, next:NextFunction) => validateResult(req, res, next),
    
];