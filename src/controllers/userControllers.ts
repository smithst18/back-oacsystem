import  { userModel }  from "../models";
import { Request, Response } from "express";
import { matchedData } from "express-validator";
import { handleError } from "../utils/handleErrors";
import { signToken, verifyToken } from "../utils/handleJWT";
//import { compare } from "../utils/handlePassword";
import { JwtPayload } from "../interfaces/jwt";

/**
 * Controller for user Login 
 * @param {*} req 
 * @param {*} res 
 */
export const login = async ( req:Request, res:Response ) =>{
    try{
        const cleanBody = matchedData(req);
        const headerAuth = req.headers.authorization;
        const foundUser =  await userModel.findOne({ ci: cleanBody.ci })
        .select('name ci rol password')
        .lean();// Agrega el método lean() para obtener un objeto plano en lugar de un documento de mongoose

        //if user ! exist return error 403
        if(!foundUser) return handleError(res,403,'No Existe el Usuario');
         // passwords should match
        //const match = await compare(cleanBody.password, foundUser.password);

        if(foundUser.password  != cleanBody.password) return handleError(res,401,'Contrase;a incorrecta');
         //create jwt payload with user info 
        const jwtPayload : JwtPayload = {
            id: foundUser._id.toString(),
            name: foundUser.name,
            ci:foundUser.ci,
            rol: foundUser.rol,
        }
        //if user is not logger we created a token 
        if(!headerAuth) {
            return res.status(200).send({ token: signToken(jwtPayload) });
        }
        //if user is logger we send information to frontend
        else {
            //send payload
            const auth = verifyToken(headerAuth.split(' ').pop()!.trim());
            auth ? res.status(200).send({ user: auth }) : handleError(res,403,'Invalid_Token');
            
        }

    }catch(error){

        return res.status(500).send({ msg:"Server error",error });
    }
}

/**
 * Controller for user register 
 * @param {*} req 
 * @param {*} res 
 */

export const signUp = async ( req:Request, res:Response ) =>{
  try{
    const cleanBody = matchedData(req);

    //if the user already exist we go throe error 
    const userExist = await userModel.findOne({ci:cleanBody.ci}).select("ci _id name")

    if(userExist) return handleError(res,403,"usuario ya registrado");
    //else we save the user preveiusly validated
    const savedUser = await userModel.create(cleanBody);
    //if user created return the user
    if(savedUser)return res.status(200).send({msg:"user Created",savedUser});

    else return handleError(res,403,"Error al registrar"); 
    
  }catch(error){
    return res.status(500).send({ msg:"Server error",error });
  }
}

/**
 * Get users with pagination 
 * @param {*} req 
 * @param {*} res 
 */

export const getUsers = async ( req:Request, res:Response ) =>{
  try{
    //const cleanBody = matchedData(req);
    const pageSelected = req.params.page;
    const myCustomLabels = {
      totalDocs: 'totalDocs',
      docs: 'users',
      limit: 'perPage',
      page: 'currentPage',
      nextPage: 'next',
      prevPage: 'prev',
      totalPages: 'totalPages',
      pagingCounter: 'pagingCounter',
      meta: 'paginator',
    };
    const options = {
      page: parseInt(pageSelected),
      limit: 10,
      customLabels: myCustomLabels,
    }
    const paginatedData =  await userModel.paginate({ deleated: false }, options, (err:any, result:any) => {
      if (err) {
        
        return handleError(res,500,"ERROR al paginar en el servidor");
      }

      //const { docs, totalDocs, totalPages } = result;

    // Haz algo con los documentos paginados
      return result
    });

    return res.status(200).send({paginatedData})
  }catch(error){
    return res.status(500).send({msg:"Server error",error});
  }
}


/**
 * Updated user by id
 * @param {*} req 
 * @param {*} res 
 */
export const update = async ( req:Request, res:Response ) =>{
  try{
    const cleanBody = matchedData(req);

    const existAllready = await userModel.findOne({
      ci:cleanBody.ci,
      _id: { $ne: cleanBody._id }
    });

    if(existAllready) return handleError(res,403,"Usuario ya registrado");
    else{
      const updatedUser = await userModel.findByIdAndUpdate(cleanBody._id,cleanBody,{ runValidators:true, new:true });
      if(updatedUser) return res.status(200).send({updatedUser}); 
      else return handleError(res,403,"Solicitud invalida Revizar cuerpo de solicitud");
    }

  }catch(error){
    return res.status(500).send({ msg:"Server error",error });
  }
}


/**
 * deleted user by id
 * @param {*} req 
 * @param {*} res 
 */
export const deactiveted = async ( req:Request, res:Response ) =>{
  try{
    const { userId } = matchedData(req);

    const deletedUser = await userModel.findOneAndUpdate({
      _id:userId,
      deleated: { $ne: true }
    },{deleated:true},{new:true});

    if(deletedUser) return res.status(200).send({msg:"Usuario Eliminado",deletedUser});

    else handleError(res,403,"Solicitud invalida Usuario no encontrado");
  }catch(error){
    return res.status(500).send({ msg:"Server error",error });
  }
}