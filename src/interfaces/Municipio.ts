import  { Document, Schema } from 'mongoose';

export interface MunicipioI extends Document {
  name:string;
<<<<<<< HEAD
  estadoId:Schema.Types.ObjectId;
=======
  estadoId:Schema.Types.ObjectId
>>>>>>> d6bd553ad6e1a02534507c8bb940509424f4ce54
}
  