import { check, body } from "express-validator";
import { validateResult } from '../utils/handleValidators';
import { Response, Request, NextFunction } from "express";

export const validCase = [
  check("subId")
    .exists()
    .withMessage('debe existir')
    .trim()
    .notEmpty()
    .withMessage('No debe estar vacío')
    .isString()
    .withMessage('debe ser un string'),

<<<<<<< HEAD
  check("fechaDeApertura")
=======
  check("openingDate")
>>>>>>> d6bd553ad6e1a02534507c8bb940509424f4ce54
    .exists()
    .withMessage('debe existir')
    .trim()
    .notEmpty()
    .withMessage('No debe estar vacío')
    .isDate()
    .withMessage('debe ser un string'),

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
    .isNumeric()
    .withMessage('debe ser un numero'),

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
    
  check("categoria")
    .exists()
    .withMessage('debe existir')
    .trim()
    .notEmpty()
    .withMessage('No debe estar vacío')
    .isString()
    .withMessage('debe ser un string'),

  check("subCategoriaId")
    .exists()
    .withMessage('debe existir')
    .isMongoId()
    .withMessage('debe ser mongoid'),

  check("tipoId")
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

  check("descripcion")
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
  
  check("subId")
  .optional()
  .notEmpty()
  .withMessage('No debe estar vacío')
  .isNumeric()
  .withMessage('debe ser un numero'),

<<<<<<< HEAD
  check("fechaDeApertura")
=======
  check("openingDate")
>>>>>>> d6bd553ad6e1a02534507c8bb940509424f4ce54
  .optional()
  .trim()
  .notEmpty()
  .withMessage('No debe estar vacío')
  .isDate()
  .withMessage('debe ser una Date'),

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
    .isNumeric()
    .withMessage('debe ser un number'),

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

  check("categoria")
  .optional()
  .trim()
  .notEmpty()
  .withMessage('No debe estar vacío')
  .isString()
  .withMessage('debe ser un string'),

  check("subCategoriaId")
    .optional()
    .isMongoId()
    .withMessage('debe ser mongoid'),

  check("tipoId")
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

  check("descripcion")
    .optional()
    .trim()
    .notEmpty()
    .withMessage('No debe estar vacío')
    .isString()
    .withMessage('debe ser un string'),

    (req:Request, res:Response, next:NextFunction) => validateResult(req, res, next),
  
];

export const validCasesubId = [

  check("caseSubId")
    .trim()
    .notEmpty()
    .withMessage('No debe estar vacío')
    .isNumeric()
    .withMessage('debe ser un numero'),
    (req:Request, res:Response, next:NextFunction) => validateResult(req, res, next),
  
];

export const validCaseId = [

  check("caseId")
    .trim()
    .notEmpty()
    .withMessage('No debe estar vacío')
    .isMongoId()
    .withMessage('debe ser un mongoid'),
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
    .isLength({ min: 1 })
    .withMessage('debe tener 1 caracteres minimo'),

  check("userId")
    .exists()
    .withMessage('debe existir')
    .isMongoId()
    .withMessage('debe ser mongoid'),
    (req:Request, res:Response, next:NextFunction) => validateResult(req, res, next),
  
];


export const validReportFilter = [
  check("page")
  .trim()
  .notEmpty()
  .withMessage('No debe estar vacío')
  .isNumeric()
  .withMessage('debe ser un number'),

  check("field")
  .trim()
  .notEmpty()
  .withMessage('No debe estar vacío')
  .isString()
  .withMessage('debe ser un string'),

  check("fieldValue")
    .trim()
    .notEmpty()
    .withMessage('No debe estar vacío')
    .isString()
    .withMessage('debe ser un string'),

  // Validador para 'dateStart'
  check('startDate')
    .trim()
    .notEmpty()
    .withMessage('No debe estar vacío')
    .custom((value) => {
      // Decodificar la fecha codificada (si viene como %2F)
      const decodedValue = decodeURIComponent(value);
      // Validar el formato de fecha dd/mm/yyyy
      const regex = /^\d{2}\/\d{2}\/\d{4}$/;

      if (!regex.test(decodedValue)) {
        throw new Error('Debe tener el formato dd/mm/yyyy');
      }

      const [day, month, year] = value.split('/');

      // Verificar si la fecha es válida
      const isValidDate = (d:string, m:string, y:string) => {
        const date = new Date(`${y}-${m}-${d}`);
        return date.getUTCDate() === parseInt(d) && (date.getUTCMonth() + 1) === parseInt(m) && date.getFullYear() === parseInt(y);
      };
      if (!isValidDate(day, month, year)) {
        throw new Error('Fecha no válida');
      }

      return true;
    }),

  // Validador para 'dateEnd'
  check('endDate')
    .trim()
    .notEmpty()
    .withMessage('No debe estar vacío')
    .custom((value) => {
      // Decodificar la fecha codificada (si viene como %2F)
      const decodedValue = decodeURIComponent(value);
      // Validar el formato de fecha dd/mm/yyyy
      const regex = /^\d{2}\/\d{2}\/\d{4}$/;

      if (!regex.test(decodedValue)) {
        throw new Error('Debe tener el formato dd/mm/yyyy');
      }

      const [day, month, year] = value.split('/');

      // Verificar si la fecha es válida
      const isValidDate = (d:string, m:string, y:string) => {
        const date = new Date(`${y}-${m}-${d}`);

        return date.getUTCDate() === parseInt(d) && (date.getMonth() + 1) === parseInt(m) && date.getFullYear() === parseInt(y);
      };
      if (!isValidDate(day, month, year)) {
        throw new Error('Fecha no válida');
      }

      return true;
    }),
  (req:Request, res:Response, next:NextFunction) => validateResult(req, res, next),
  
];
