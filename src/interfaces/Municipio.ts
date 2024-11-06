import  { Document, Schema } from 'mongoose';

export interface MunicipioI extends Document {
  name:string;
  estadoId:Schema.Types.ObjectId
}
  