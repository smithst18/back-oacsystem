import { model, Schema, Types } from "mongoose";
import  User  from "../interfaces/User"

const userSchema  = new Schema<User> ({
  nickName:{
    type:String,
    required:true,
    trim:true,
    unique:true,
  },
  rol:{
    type:String,
    enum: ["God","Admin","Instructor","Student"],
    required:true,
    trim:true,
  },
  password:{
    type:String,
    required:true,
    trim:true,
    select:false,//permite quitar la pass de las response de la db
  },
},{
  timestamps:true,
  versionKey:false,
});

export  const userModel = model('User',userSchema);