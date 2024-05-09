import  { userModel }  from "../models";
import { Request, Response } from "express";

export const login = async ( req:Request, res:Response ) =>{
    try{
        return res.status(200);
    }catch(e){
        return res.status(405);
    }
}