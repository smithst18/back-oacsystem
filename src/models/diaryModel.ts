import mongoose, { Schema } from 'mongoose';
import type { DiaryI } from "../interfaces/Diary";

const diarySchema  = new Schema<DiaryI>({
  data:{
    type:String,
    required:true,
    trim:true,
  },
  casoId:{
    type:Schema.Types.ObjectId,
    trim:true,
    ref:"Case"
  },
},{
  timestamps:true,
  versionKey:false,
});


export const diaryModel = mongoose.model<DiaryI>('Diary', diarySchema);