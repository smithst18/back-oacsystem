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
export const validSignup = [
  check("ci")
      .exists()
      .withMessage('debe existir')
      .trim()
      .notEmpty()
      .withMessage('No debe estar vacio')
      .isString()
      .withMessage('debe ser un string')
      .isLength({min:6,max:8})
      .withMessage('minimo 6 caracter, max 8 caracteres'),
  check("password")
      .exists()
      .withMessage('debe existir')
      .trim()
      .notEmpty()
      .withMessage('No debe estar vacio')
      .isString()
      .withMessage('debe ser un string')
      .isLength({min:3,max:30})
      .withMessage('la contrase;a debe tener minimo 3, max 30 caracteres'),
  check("name")
      .exists()
      .withMessage('debe existir')
      .trim()
      .notEmpty()
      .withMessage('No debe estar vacio')
      .isString()
      .withMessage('debe ser un string')
      .isLength({min:4,max:60})
      .withMessage('minimo 4, max 60 caracteres'),
  check("rol")
      .exists()
      .withMessage('debe existir')
      .trim()
      .notEmpty()
      .withMessage('No debe estar vacio')
      .isString()
      .withMessage('debe ser un string')
      .default('normal'),
  check("phoneNumber")
      .optional()
      .trim()
      .isString()
      .withMessage('debe ser un string')
      .default('NA'),
  check("state")
      .exists()
      .withMessage('Estado es un campo obligatorio')
      .trim()
      .isString()
      .withMessage('debe ser un string'),
  (req:Request, res:Response, next:NextFunction) => validateResult(req, res, next),
  
];
export const validUpdate = [

  check("_id")
      .exists()
      .isMongoId()
      .trim()
      .notEmpty(),
  check("ci")
      .optional()
      .trim()
      .isString()
      .withMessage('debe ser un string')
      .isLength({min:6,max:8})
      .withMessage('minimo 6 caracter, max 8 caracteres'),
  check("password")
      .optional()
      .trim()
      .isString()
      .withMessage('debe ser un string')
      .isLength({min:3,max:30})
      .withMessage('la contrase;a debe tener minimo 3, max 30 caracteres'),
  check("name")
      .optional()
      .trim()
      .isString()
      .withMessage('debe ser un string')
      .isLength({min:4,max:60})
      .withMessage('minimo 4, max 60 caracteres'),
  check("rol")
      .optional()
      .trim()
      .isString()
      .withMessage('debe ser un string'),
  check("phoneNumber")
      .optional()
      .trim()
      .isString()
      .withMessage('debe ser un string'),
  check("state")
      .optional()
      .trim()
      .isString()
      .withMessage('debe ser un string'),
  (req:Request, res:Response, next:NextFunction) => validateResult(req, res, next),
  
];
export const validUserId = [

  check("userId")
      .exists()
      .withMessage('Debe existir')
      .isMongoId()
      .withMessage('Debe ser mongoId')
      .trim()
      .notEmpty()
      .withMessage('No debe estar vacio'),
  (req:Request, res:Response, next:NextFunction) => validateResult(req, res, next),
  
];