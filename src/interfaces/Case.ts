import  { Document, Schema } from 'mongoose';

export interface CaseI extends Document {
    subId:number;
    remitente: "O.A.C" | "ministro" | "viceministerios" | "sala situacional" | "entes adscritos" | "gabinete ministerial" | "abordaje territorial" | "venapp" | "institucion";
    nombreSolicitante:string;
    cedulaSolicitante:string;
    nombreBeneficiario:string;
    cedulaBeneficiario:string;
    telefonoBeneficiario:string;
    edad:number;
    genero:string;
    estado:string;
    municipio:string;
    parroquia:string;
    sector:string;
    tipoBeneficiario:string;
    categoria:string;
    subCategoriaId:Schema.Types.ObjectId;
    tipoId:Schema.Types.ObjectId;
    prioridad:string;
    status:string;
    fechaRedireccion:string;
    viaResolucion:string;
    enteRedireccionado:string;
    analistaId:Schema.Types.ObjectId;
    diario:[Schema.Types.ObjectId];
    descripcion:string;
    file:string;
<<<<<<< HEAD
    fechaDeApertura:Date;
=======
    openingDate:Date;
>>>>>>> d6bd553ad6e1a02534507c8bb940509424f4ce54
    createdAt: Date;
    updatedAt: Date;
  }
  