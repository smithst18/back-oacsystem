import { Request, Response, NextFunction } from 'express';
import  { validationResult } from 'express-validator';

/**
 * //returns the validation logic in the middlewares
 * @param {*} req 
 * @param {*} res 
 * @param {*} next
 */

export const validateResult = (req:Request, res:Response, next:NextFunction) =>{
    try {
    validationResult(req).throw();
    return next();

  } catch (err:any) {
    
    res.status(400).send({ errors: err.array() });
  }
}