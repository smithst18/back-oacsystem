import mongoose, { Schema } from 'mongoose';
import type { DiaryI } from "../interfaces/Diary";

const diarySchema  = new Schema<DiaryI>({
  description:{
    type:String,
    required:true,
    trim:true,
    minlength:4,
    maxlength:10000
  },
  casoId:{
    type:Schema.Types.ObjectId,
    trim:true,
    ref:"Case"
  },
  userId:{
    type:Schema.Types.ObjectId,
    trim:true,
    ref:"User"
  },
},{
  timestamps:true,
  versionKey:false,
});


export const diaryModel = mongoose.model<DiaryI>('Diary', diarySchema);