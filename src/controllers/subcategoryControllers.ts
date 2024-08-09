import  { subcategoryModel, categoryModel }  from "../models";
import { Request, Response } from "express";
import { matchedData } from "express-validator";
import { handleError } from "../utils/handleErrors";

/**
 * Controller for user Login 
 * @param {*} req 
 * @param {*} res 
 */
export const getAllByCategory = async ( req:Request, res:Response ) =>{
  try{
    const cleanBody = matchedData(req);
    const category = await categoryModel.findById(cleanBody._id);
    if(!category) return handleError(res,404,"Categoria para busqueda inexistente");
    else {

      const subcaterogiesByCategory = await subcategoryModel.find({categoriaId:cleanBody._id}).select("name");
      if(subcategoryModel.length >= 1) return res.status(200).send({ msg:"subcategorias encontradas",subcaterogiesByCategory});
      else return handleError(res,404,"No hay subcategorias existentes");
    }
  }catch(error){
    return res.status(500).send({ msg:'Server error',error });
  }
}