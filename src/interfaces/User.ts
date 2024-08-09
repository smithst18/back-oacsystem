import  { Document } from 'mongoose';

export interface UserI extends Document {
    name: string;
    password: string;
    rol: "admin" | "auditor" | "normal";
    ci:string;
    birdDate:string;
    phoneNumber:string;
    deleated:boolean;
    createdAt: Date;
    updatedAt: Date;
  }
  