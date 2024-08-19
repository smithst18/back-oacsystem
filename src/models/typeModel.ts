import mongoose, { Schema } from 'mongoose';
import type { TipoI } from "../interfaces/Tipo";

const tipoSchema  = new Schema<TipoI>({
  name:{
    type:String,
    required:true,
    trim:true,
  },
  subcategoriaId:{
    type:String,
    required:true,
    trim:true,
    ref:"Subcategory"
  },
},{
  timestamps:true,
  versionKey:false,
});


export const typeModel = mongoose.model<TipoI>('Type', tipoSchema);