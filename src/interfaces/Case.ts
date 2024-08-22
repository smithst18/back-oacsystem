import  { Document, Schema } from 'mongoose';

export interface CaseI extends Document {
    subId:number,
    remitente: "O.A.C" | "ministro" | "viceministerios" | "sala situacional" | "entes adscritos" | "gabinete ministerial" | "abordaje territorial" | "venapp" | "institucion";
    nombreSolicitante:string;
    cedulaSolicitante:string;
    nombreBeneficiario:string;
    cedulaBeneficiario:string;
    telefonoBeneficiario:string,
    edad:string,
    genero:string,
    estado:string,
    municipio:string,
    parroquia:string,
    sector:string,
    tipoBeneficiario:string,
    categoria:string,
    subCategoriaId:Schema.Types.ObjectId,
    tipoId:Schema.Types.ObjectId,
    prioridad:string,
    status:string,
    fechaRedireccion:string,
    viaResolucion:string,
    enteRedireccionado:string,
    analistaId:Schema.Types.ObjectId,
    diario:[Schema.Types.ObjectId]
    createdAt: Date;
    updatedAt: Date;
  }
  