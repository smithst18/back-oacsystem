import  { caseModel, diaryModel, userModel  }  from "../models";
import { Request, Response } from "express";
import { matchedData } from "express-validator";
import { handleError } from "../utils/handleErrors";


/**
 * Controller for user Login 
 * @param {*} req 
 * @param {*} res 
 */


export const save = async ( req:Request, res:Response ) =>{
  try{
    const { casoId, userId, description } = matchedData(req);
    // ver si caso existe si no devolver error
    const caseExist = await caseModel.findById(casoId);
    if(!caseExist) return handleError(res,404,"El caso no existe");

    // ver si usuario existe si no devolver error
    const userExist = await userModel.findById(userId);
    if(!userExist) return handleError(res,404,"El usuario no Existe");

    //guardar y devolver el registro si se creo correctamente
    const savedDiary = await diaryModel.create({ casoId, userId, description });

    if(!savedDiary) return handleError(res,403,"Error al crear el caso");
    else return res.status(200).send({savedDiary, msg:"Diary creado correctamente"});

  }catch(error){
    return res.status(500).send({ msg:'Server error de tipo :',error });
  }
}

/**
 * 
 * @param {*} req
 * @param {*} res
 */

export const getByCaseId = async ( req:Request, res:Response ) =>{
  try{
    const { id } = matchedData(req);
    const caseExist = await caseModel.findById(id);
    if(!caseExist) return handleError(res,404,"El caso Del que se quiere buscar Diarios NO existe");
    
    const diaries = await diaryModel.find({ casoId:id }).select("description createdAt");

    if(!diaries || diaries.length < 1) return handleError(res,404,"No hay diarios disponibles para este caso");
    else return res.status(200).send({msg:`Diarios del caso id : ${id}:`, diaries});
    
  }catch(error){
    return res.status(500).send({ msg:'Server error',error });
  }
}