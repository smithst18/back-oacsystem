import  { typeModel, subcategoryModel }  from "../models";
import { Request, Response } from "express";
import { matchedData } from "express-validator";
import { handleError } from "../utils/handleErrors";

/**
 * Controller for user Login 
 * @param {*} req 
 * @param {*} res 
 */
export const getAllTypeBySubcategory = async ( req:Request, res:Response ) =>{
  try{
    const cleanBody = matchedData(req);
    const category = await subcategoryModel.findById(cleanBody._id);
    if(!category) return handleError(res,404,"subcategoria para busqueda inexistente");
    else {

      const typesByCategory = await typeModel.find({ subcategoriaId:cleanBody._id }).select("name");
      if(typeModel.length >= 1) return res.status(200).send({ msg:"tipos encontrados",typesByCategory});
      else return handleError(res,404,"No hay tipos existentes");
    }
  }catch(error){
    return res.status(500).send({ msg:'Server error',error });
  }
}