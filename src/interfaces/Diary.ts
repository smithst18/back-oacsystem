import  { Document, Schema } from 'mongoose';

export interface DiaryI extends Document {
    data: string,
    casoId:Schema.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
  }
  