import { model, Schema } from "mongoose";
import  User  from "../interfaces/User"

const userSchema  = new Schema<User> ({
  fullName:{
    type:String,
    required:true,
    trim:true,
  },
  nickName:{
    type:String,
    trim:true,
    default: 'NA'
  },
  password:{
    type:String,
    required:true,
    trim:true,
    select:false,//hide password
  },
  rol:{
    type:String,
    enum: ["admin","instructor","student"],
    required:true,
    trim:true,
  },
  document:{
    type:String,
    required:true,
    trim:true,
    unique:true,
  },
  documentType:{
    type:String,
    required:true,
    trim:true,
    enum: ["v","e"],
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