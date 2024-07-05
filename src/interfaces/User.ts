import  { Document } from 'mongoose';

export interface UserI extends Document {
    name: string;
    password: string;
    rol: "admin" | "auditor" | "normal";
    ci:string;
    birdDate:String;
    phoneNumber:String;
    createdAt: Date;
    updatedAt: Date;
  }
  