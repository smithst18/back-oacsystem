import  { Document, Schema } from 'mongoose';

export interface CategoryI extends Document {
    name: string,
    subCategoriasId:[Schema.Types.ObjectId];
    createdAt: Date;
    updatedAt: Date;
  }
  