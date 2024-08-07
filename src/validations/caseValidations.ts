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

export const validOptionalCase = [
  
  check("viaResolucion")
  .optional()
  .trim()
  .notEmpty()
  .withMessage('No debe estar vacío')
  .isString()
  .withMessage('debe ser un string'),

  check("enteRedireccionado")
  .optional()
  .trim()
  .notEmpty()
  .withMessage('No debe estar vacío')
  .isString()
  .withMessage('debe ser un string'),

  check("status")
  .optional()
  .trim()
  .notEmpty()
  .withMessage('No debe estar vacío')
  .isString()
  .withMessage('debe ser un string'),

  check("remitente")
  .optional()
  .trim()
  .notEmpty()
  .withMessage('No debe estar vacío')
  .isString()
  .withMessage('debe ser un string'),

  check("nombreSolicitante")
    .optional()
    .trim()
    .notEmpty()
    .withMessage('No debe estar vacío')
    .isString()
    .withMessage('debe ser un string'),

  check("cedulaSolicitante")
    .optional()
    .trim()
    .notEmpty()
    .withMessage('No debe estar vacío')
    .isString()
    .withMessage('debe ser un string'),

  check("nombreBeneficiario")
    .optional()
    .trim()
    .notEmpty()
    .withMessage('No debe estar vacío')
    .isString()
    .withMessage('debe ser un string'),

  check("cedulaBeneficiario")
    .optional()
    .trim()
    .notEmpty()
    .withMessage('No debe estar vacío')
    .isString()
    .withMessage('debe ser un string'),

  check("telefonoBeneficiario")
    .optional()
    .trim()
    .notEmpty()
    .withMessage('No debe estar vacío')
    .isString()
    .withMessage('debe ser un string'),

  check("edad")
    .optional()
    .trim()
    .notEmpty()
    .withMessage('No debe estar vacío')
    .isString()
    .withMessage('debe ser un string'),

  check("genero")
    .optional()
    .trim()
    .notEmpty()
    .withMessage('No debe estar vacío')
    .isString()
    .withMessage('debe ser un string'),

  check("estado")
    .optional()
    .trim()
    .notEmpty()
    .withMessage('No debe estar vacío')
    .isString()
    .withMessage('debe ser un string'),

  check("municipio")
    .optional()
    .trim()
    .notEmpty()
    .withMessage('No debe estar vacío')
    .isString()
    .withMessage('debe ser un string'),

  check("parroquia")
    .optional()
    .trim()
    .notEmpty()
    .withMessage('No debe estar vacío')
    .isString()
    .withMessage('debe ser un string'),

  check("sector")
    .optional()
    .trim()
    .notEmpty()
    .withMessage('No debe estar vacío')
    .isString()
    .withMessage('debe ser un string'),

  check("tipoBeneficiario")
    .optional()
    .trim()
    .notEmpty()
    .withMessage('No debe estar vacío')
    .isString()
    .withMessage('debe ser un string'),

  check("categoriaId")
    .optional()
    .isMongoId()
    .withMessage('debe ser mongoid'),

  check("subCategoriaId")
    .optional()
    .isMongoId()
    .withMessage('debe ser mongoid'),

  check("prioridad")
    .optional()
    .trim()
    .notEmpty()
    .withMessage('No debe estar vacío')
    .isString()
    .withMessage('debe ser un string'),

    (req:Request, res:Response, next:NextFunction) => validateResult(req, res, next),
  
];

export const validCaseId = [

  check("id")
    .exists()
    .withMessage('debe existir')
    .isMongoId()
    .withMessage('debe ser mongoid'),
    (req:Request, res:Response, next:NextFunction) => validateResult(req, res, next),
  
];

export const validCaseSearch = [
  check("page")
    .optional()
    .trim()
    .notEmpty()
    .withMessage('No debe estar vacío')
    .isNumeric()
    .withMessage('debe ser un numero')
    .isLength({ min: 1 })
    .withMessage('Minimo 1 digito'),
  
  check("search")
    .optional()
    .trim()
    .notEmpty()
    .withMessage('No debe estar vacío')
    .isString()
    .withMessage('debe ser un string')
    .isLength({ min: 5 })
    .withMessage('debe tener 5 caracteres minimo'),

  check("userId")
    .exists()
    .withMessage('debe existir')
    .isMongoId()
    .withMessage('debe ser mongoid'),
    (req:Request, res:Response, next:NextFunction) => validateResult(req, res, next),
  
];

