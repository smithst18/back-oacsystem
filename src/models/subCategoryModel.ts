import mongoose, { Schema } from 'mongoose';
import type { SubCategoryI } from "../interfaces/Subcategory";

const subcategorySchema  = new Schema<SubCategoryI>({
  name:{
    type:String,
    required:true,
    trim:true,
  },
  tiposId:[{
    type:String,
    trim:true,
    ref:"Type"
  }],
},{
  timestamps:true,
  versionKey:false,
});


export const subcategoryModel = mongoose.model<SubCategoryI>('SubCategory', subcategorySchema);