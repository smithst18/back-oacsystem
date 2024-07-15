import { Request, Response } from "express";
import { matchedData } from "express-validator";
import  { caseModel }  from "../models";
import { handleError } from "../utils/handleErrors";

/**
 * deleted user by id
 * @param {*} req 
 * @param {*} res 
 */

export const save = async ( req:Request, res:Response ) =>{
  try{
    const cleanBody = matchedData(req);
    
    const savedCase = await caseModel.create(cleanBody)
    if(savedCase)return res.status(200).send({msg:"user Created",savedCase});

    else return handleError(res,403,"Error al registrar"); 
  }catch(error){
    return res.status(500).send({ msg:'Server error',error });
  }
}