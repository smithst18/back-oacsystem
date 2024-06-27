import { model, Schema } from "mongoose";
import  User  from "../interfaces/User"

const userSchema  = new Schema<User> ({
  name:{
    type:String,
    required:true,
    trim:true,
  },
  password:{
    type:String,
    required:true,
    trim:true,
    select:false,//hide password
  },
  rol:{
    type:String,
    enum: ["admin","auditor","normal"],
    required:true,
    trim:true,
  },
  ci:{
    type:String,
    required:true,
    trim:true,
    unique:true,
  },
  birdDate:{
    type:String,
    required:true,
    trim:true,
    default: 'NA'
  },
  phoneNumber:{
    type:String,
    required:true,
    trim:true,
    default: 'NA'
  },
},{
  timestamps:true,
  versionKey:false,
});

export  const userModel = model('User',userSchema);