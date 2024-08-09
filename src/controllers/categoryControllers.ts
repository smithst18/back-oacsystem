import  { categoryModel }  from "../models";
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

    const categories = await categoryModel.find().select("name");

    if(categories.length < 1) handleError(res,404,"no hay categorias en bd");
    else return res.status(200).send({categories});
  }catch(error){
    return res.status(500).send({ msg:'Server error',error });
  }
}