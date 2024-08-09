import mongoose, { Schema } from 'mongoose';
import type { CategoryI } from "../interfaces/Category";

const categorySchema  = new Schema<CategoryI>({
  name:{
    type:String,
    required:true,
    trim:true,
  },
  subCategoriasId:[{
    type:String,
    trim:true,
    ref:"Subcategory"
  }],
},{
  timestamps:true,
  versionKey:false,
});


export const categoryModel = mongoose.model<CategoryI>('Category', categorySchema);