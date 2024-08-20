import { check } from "express-validator";
import { validateResult } from '../utils/handleValidators';
import { Response, Request, NextFunction } from "express";

export const validDiary = [
  check("description")
  .exists()
  .withMessage('debe existir')
  .trim()
  .notEmpty()
  .withMessage('No debe estar vacío')
  .isLength({ min:5, max:10000 })
  .withMessage('min 5 caracteres, max 300 caracteres')
  .isString()
  .withMessage('debe ser un string'),

  check("casoId")
    .exists()
    .withMessage('debe existir')
    .trim()
    .notEmpty()
    .withMessage('No debe estar vacío')
    .isMongoId()
    .withMessage('debe ser mongoid'),

  check("userId")
    .exists()
    .withMessage('debe existir')
    .trim()
    .notEmpty()
    .withMessage('No debe estar vacío')
    .isMongoId()
    .withMessage('debe ser mongoid'),
    (req:Request, res:Response, next:NextFunction) => validateResult(req, res, next),
  
];