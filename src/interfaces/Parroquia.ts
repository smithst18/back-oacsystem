import  { Document, Schema } from 'mongoose';

export interface ParroquiaI extends Document {
  name:string;
  estadoId:Schema.Types.ObjectId;
  municipioId:Schema.Types.ObjectId;
}
  