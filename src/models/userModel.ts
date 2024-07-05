import mongoose, { Schema, Document, Model } from 'mongoose';
import type { UserI } from "../interfaces/User";
import paginate from 'mongoose-paginate-v2';

const userSchema  = new Schema<UserI>({
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
    trim:true,
    default: 'NA'
  },
  phoneNumber:{
    type:String,
    trim:true,
    default: 'NA'
  },
  deleated:{
    type:Boolean,
    trim:true,
    default:false
  },
},{
  timestamps:true,
  versionKey:false,
});

userSchema.plugin(paginate);


export const userModel = mongoose.model<UserI,mongoose.PaginateModel<UserI>>('User', userSchema);