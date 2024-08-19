import  { subcategoryModel }  from "../models";
import { Request, Response } from "express";
//import { matchedData } from "express-validator";
import { handleError } from "../utils/handleErrors";

/**
 * Controller for user Login 
 * @param {*} req 
 * @param {*} res 
 */
export const getAll = async ( req:Request, res:Response ) =>{
  try{

    const subcategories = await subcategoryModel.find().select("name");

    if(subcategories.length < 1) handleError(res,404,"no hay subcategorias en bd");
    else return res.status(200).send({ subcategories });
  }catch(error){
    return res.status(500).send({ msg:'Server error',error });
  }
}