import  { Document, Schema } from 'mongoose';

export interface SubcategoryI extends Document {
    name: string,
    categoriaId:Schema.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
  }
  