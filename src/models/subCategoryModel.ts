import mongoose, { Schema } from 'mongoose';
import type { SubcategoryI } from "../interfaces/Subcategory";

const subcategorySchema  = new Schema<SubcategoryI>({
  name:{
    type:String,
    required:true,
    trim:true,
  },
  categoriaId:{
    type:String,
    required:true,
    trim:true,
    ref:"Category"
  },
},{
  timestamps:true,
  versionKey:false,
});


export const subcategoryModel = mongoose.model<SubcategoryI>('Subcategory', subcategorySchema);