import { Request, Response } from "express";
import path from 'path';

export const serverComprobation = async ( req:Request, res:Response ) =>{
  const filePath = path.join(__dirname, '..', 'public', 'html', 'test.html');
  res.sendFile(filePath);
}