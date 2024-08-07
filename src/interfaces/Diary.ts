import  { Document, Schema } from 'mongoose';

export interface DiaryI extends Document {
    description: string,
    casoId:Schema.Types.ObjectId;
    userId:Schema.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
  }
  