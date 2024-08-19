import  { Document, Schema } from 'mongoose';

export interface SubCategoryI extends Document {
    name: string,
    tiposId:[Schema.Types.ObjectId];
    createdAt: Date;
    updatedAt: Date;
  }
  