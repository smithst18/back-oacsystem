import  { userModel }  from "../models";
import { Request, Response } from "express";
import { matchedData } from "express-validator";
import { handleError } from "../utils/handleErrors";
import { signToken, verifyToken } from "../utils/handleJWT";
import { compare } from "../utils/handlePassword";
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
        .select('name ci rol password');

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

    }catch(e){

        return res.status(500).send({ e });
    }
}
