import { check } from "express-validator";
import { validateResult } from '../utils/handleValidators';
import { Response, Request, NextFunction } from "express";

export const validCase = [
  check("remitente")
  .exists()
  .withMessage('debe existir')
  .trim()
  .notEmpty()
  .withMessage('No debe estar vacío')
  .isString()
  .withMessage('debe ser un string'),

  check("nombreSolicitante")
    .exists()
    .withMessage('debe existir')
    .trim()
    .notEmpty()
    .withMessage('No debe estar vacío')
    .isString()
    .withMessage('debe ser un string'),

  check("cedulaSolicitante")
    .exists()
    .withMessage('debe existir')
    .trim()
    .notEmpty()
    .withMessage('No debe estar vacío')
    .isString()
    .withMessage('debe ser un string'),

  check("nombreBeneficiario")
    .exists()
    .withMessage('debe existir')
    .trim()
    .notEmpty()
    .withMessage('No debe estar vacío')
    .isString()
    .withMessage('debe ser un string'),

  check("cedulaBeneficiario")
    .exists()
    .withMessage('debe existir')
    .trim()
    .notEmpty()
    .withMessage('No debe estar vacío')
    .isString()
    .withMessage('debe ser un string'),

  check("telefonoBeneficiario")
    .exists()
    .withMessage('debe existir')
    .trim()
    .notEmpty()
    .withMessage('No debe estar vacío')
    .isString()
    .withMessage('debe ser un string'),

  check("edad")
    .exists()
    .withMessage('debe existir')
    .trim()
    .notEmpty()
    .withMessage('No debe estar vacío')
    .isString()
    .withMessage('debe ser un string'),

  check("genero")
    .exists()
    .withMessage('debe existir')
    .trim()
    .notEmpty()
    .withMessage('No debe estar vacío')
    .isString()
    .withMessage('debe ser un string'),

  check("estado")
    .exists()
    .withMessage('debe existir')
    .trim()
    .notEmpty()
    .withMessage('No debe estar vacío')
    .isString()
    .withMessage('debe ser un string'),

  check("municipio")
    .exists()
    .withMessage('debe existir')
    .trim()
    .notEmpty()
    .withMessage('No debe estar vacío')
    .isString()
    .withMessage('debe ser un string'),

  check("parroquia")
    .exists()
    .withMessage('debe existir')
    .trim()
    .notEmpty()
    .withMessage('No debe estar vacío')
    .isString()
    .withMessage('debe ser un string'),

  check("sector")
    .exists()
    .withMessage('debe existir')
    .trim()
    .notEmpty()
    .withMessage('No debe estar vacío')
    .isString()
    .withMessage('debe ser un string'),

  check("tipoBeneficiario")
    .exists()
    .withMessage('debe existir')
    .trim()
    .notEmpty()
    .withMessage('No debe estar vacío')
    .isString()
    .withMessage('debe ser un string'),

  check("categoriaId")
    .exists()
    .withMessage('debe existir')
    .isMongoId()
    .withMessage('debe ser mongoid'),

  check("subCategoriaId")
    .optional()
    .isMongoId()
    .withMessage('debe ser mongoid'),

  check("prioridad")
    .exists()
    .withMessage('debe existir')
    .trim()
    .notEmpty()
    .withMessage('No debe estar vacío')
    .isString()
    .withMessage('debe ser un string'),

  check("analistaId")
    .exists()
    .withMessage('debe existir')
    .isMongoId()
    .withMessage('debe ser mongoid'),
    (req:Request, res:Response, next:NextFunction) => validateResult(req, res, next),
  
];