import  { Document, Schema } from 'mongoose';

export interface TipoI extends Document {
    name: string,
    subcategoriaId:Schema.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
  }
  