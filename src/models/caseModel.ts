import mongoose, { Schema, Document, Model } from 'mongoose';
import { counterModel } from "../models";
import type { CaseI } from "../interfaces/Case";
import paginate from 'mongoose-paginate-v2';

const caseSchema  = new Schema<CaseI>({
  subId:{
    type:Number,
    unique:false,
    trim:true,
  },
  remitente:{
    type:String,
    enum: [
      "O.A.C",
      "ministro",
      "viceministerios",
      "sala situacional",
      "corpesca",
      "insopesca",
      "pescalba",
      "cenipa",
      "fonpesca",
      "conppa",
      "gabinete ministerial",
      "abordaje territorial",
      "venapp",
      "institucion",
    ],
    required:true,
    trim:true,
  },
  nombreSolicitante:{
    type:String,
    required:true,
    trim:true,
  },
  cedulaSolicitante:{
    type:String,
    required:true,
    trim:true,
  },
  nombreBeneficiario:{
    type:String,
    required:true,
    trim:true,
  },
  cedulaBeneficiario:{
    type:String,
    required:true,
    trim:true,
  },
  telefonoBeneficiario:{
    type:String,
    required:true,
    trim:true,
  },
  edad:{
    type:Number,
    required:true,
    trim:true,
  },
  genero:{
    type:String,
    enum: [
      "M",
      "F"
    ],
    required:true,
    trim:true,
  },
  estado:{
    type:String,
    required:true,
    trim:true,
  },
  municipio:{
    type:String,
    required:true,
    trim:true,
  },
  parroquia:{
    type:String,
    required:true,
    trim:true,
  },
  sector:{
    type:String,
    required:true,
    trim:true,
  },
  tipoBeneficiario:{
    type:String,
    enum: [
      "CONPPA",
      "pescador",
      "acuicultor",
      "particular",
      "institucional",
    ],
    required:true,
    trim:true,
  },
  categoria:{
    type:String,
    enum: ["peticion","quejas","reclamo","sugerencia","denuncia"],
    required:true,
    trim:true,
  },
  subCategoriaId:{
    type:Schema.Types.ObjectId,
    required:true,
    trim:true,
    ref:"SubCategory"
  },
  tipoId:{
    type:Schema.Types.ObjectId,
    trim:true,
    ref:"Type"
  },
  prioridad:{
    type:String,
    required:true,
    trim:true,
  },
  status:{
    type:String,
    trim:true,
    enum:[
      "contacto inicial",
      "conformacion del expediente",
      "proceso de analisis",
      "notificacion al solicitante",
      "en proceso",
      "seguimiento",
      "cerrado",
    ],
    default:"contacto inicial"
  },
  fechaRedireccion:{
    type:String,
    trim:true,
  },
  viaResolucion:{
    type:String,
    trim:true,
    enum:[
      "administrativa",
      "Servicio desconcentrado fondo negro primero",
      "partida de donacion a tercero",
      "remitido",
      "recursos propios",
      "donacion",
      "no procede",
    ],
  },
  enteRedireccionado:{
    type:String,
    trim:true,
  },
  analistaId:{
    type:Schema.Types.ObjectId,
    trim:true,
    ref:"User"
  },
  diario:[{
    type:Schema.Types.ObjectId,
    trim:true,
    ref:"Diary"
  }],
  descripcion:{
    type:String,
    trim:true,
    required:true
  },
  file:{
    type:String,
    trim:true,
  },
  fechaDeApertura:{
    type:Date,
    trim:true,
    required:true
  }
},{
  timestamps:true,
  versionKey:false,
});


// Middleware para incrementar el subId
caseSchema.pre('save', async function (next) {
  const doc = this as CaseI;
  
  if (doc.isNew) {
    try {
      const counter = await counterModel.findOneAndUpdate(
        { name: 'case_subId' },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );

      doc.subId = counter.seq;
      next();
    } catch (error) {
      next(error as mongoose.CallbackError);
    }
  } else {
    next();
  }
});


caseSchema.plugin(paginate);


export const caseModel = mongoose.model<CaseI,mongoose.PaginateModel<CaseI>>('Case', caseSchema);