import  { caseModel, diaryModel, userModel  }  from "../models";
import { Request, Response } from "express";
import { matchedData } from "express-validator";
import { handleError } from "../utils/handleErrors";
import { camelize } from "../utils/handleCamelcase"
import fs from "fs";
import path from 'path';
import PizZip from "pizzip";
import docxtemplater from "docxtemplater";
import { CaseI } from "../interfaces/Case";
import { DiaryI } from "../interfaces/Diary";
import { UserI } from "../interfaces/User";


/**
 * Controller for user Login 
 * @param {*} req 
 * @param {*} res 
 */


export const save = async ( req:Request, res:Response ) =>{
  try{
    const { casoId, userId, description, caseStatus } = matchedData(req);
    // ver si caso existe si no devolver error
    const caseExist = await caseModel.findById(casoId);
    if(!caseExist) return handleError(res,404,"El caso no existe");

    // ver si usuario existe si no devolver error
    const userExist = await userModel.findById(userId);
    if(!userExist) return handleError(res,404,"El usuario no Existe");

    //guardar y devolver el registro si se creo correctamente
    const savedDiary = await diaryModel.create({ casoId, userId, description, caseStatus });

    if(!savedDiary) return handleError(res,403,"Error al crear el caso");
    else return res.status(200).send({savedDiary, msg:"Diary creado correctamente"});

  }catch(error){
    return res.status(500).send({ msg:'Server error de tipo :',error });
  }
}

/**
 * 
 * @param {*} req
 * @param {*} res
 */

export const getByCaseId = async ( req:Request, res:Response ) =>{
  try{
    const { caseId } = matchedData(req);
    if(caseId){

      const caseExist = await caseModel.findById(caseId);
      if(!caseExist) return handleError(res,404,"El caso Del que se quiere buscar Diarios NO existe");
      
      const diaries = await diaryModel.find({ casoId:caseId }).select("description createdAt caseStatus");
  
      if(!diaries || diaries.length < 1) return handleError(res,404,"No hay diarios disponibles para este caso");
      else return res.status(200).send({msg:`Diarios del caso id : ${caseId}:`, diaries});
    }else return  res.status(500).send({ msg:'No existe el caseId' });
    
  }catch(error){
    return res.status(500).send({ msg:'Server error',error });
  }
};


/**
 * GET word file with expecific case
 * @param {*} req 
 * @param {*} res 
 */

export const generateFileOneCase = async (req: Request, res: Response) => {
  try {
    const { caseId } = matchedData(req);
    
    const foundCase: CaseI | null = await caseModel.findById(caseId).populate("analistaId");

    if (!foundCase) return handleError(res, 404, "No Existe el Caso");

    const diarys : DiaryI[] = await diaryModel.find({ casoId:caseId, caseStatus:foundCase.status }).select("description");

    if( !diarys || diarys.length < 1) return handleError(res,403,`No hay diarios registrados para el caso id : ${caseId}`);

    //convertimos las descripciones de todos los diary en un string facil de usar en el archivo word
    const DiaryString: string = diarys.reduce((accumulator, elm) => {
      return accumulator + "\n" + elm.description; // Concatenar cada descripción con un salto de línea
    }, "");

    //conviere objeto mongodb a objeto plano luego lo utilizamos como tipo founcase y anadimos las propiedades y metodos de analistaId es decir user 
    const caseWithAnalista = foundCase.toObject() as typeof foundCase & { analistaId: UserI };

    const filePath = path.join(__dirname, '../temp/PARTE_DIARIO.docx');
    const content = fs.readFileSync(filePath, 'binary');
    const zip = new PizZip(content);
    const doc = new docxtemplater(zip, { paragraphLoop: true, linebreaks: true });

    doc.render({
      ID: caseWithAnalista.subId,
      ANALISTA:caseWithAnalista.analistaId.name,
      SOLICITANTE: camelize(caseWithAnalista.nombreSolicitante),
      CEDULASOL: caseWithAnalista.cedulaSolicitante,
      BENEFICIARIO: camelize(caseWithAnalista.nombreBeneficiario),
      CEDULABEN: caseWithAnalista.cedulaBeneficiario,
      ESTADO: camelize(caseWithAnalista.estado.replace(/\bestado\b\s*/gi, '')),

      CONTACTOI: caseWithAnalista.status === "contacto inicial" ? "☑" : "☐",
      CONFORMACION: caseWithAnalista.status === "conformacion del expediente" ? "☑" : "☐",
      PROCESO: caseWithAnalista.status === "proceso de analisis" ? "☑" : "☐",
      NOTIFICACION: caseWithAnalista.status === "notificacion al solicitante" ? "☑" : "☐",
      ADMINISTRATIVO: caseWithAnalista.status === "en proceso" ? "☑" : "☐",
      SEGUIMIENTO: caseWithAnalista.status === "seguimiento" ? "☑" : "☐",
      CERRADO: caseWithAnalista.status === "cerrado" ? "☑" : "☐",

      DIARIOS: DiaryString,
      DESCRIPCION: caseWithAnalista.descripcion,
    });
    
    const buf = doc.getZip().generate({ type: 'nodebuffer' });
    const outputFilePath = path.join(__dirname, `../temp/planillaCasoN${foundCase.subId}.docx`);

    fs.writeFileSync(outputFilePath, buf);

    if (fs.existsSync(outputFilePath)) {
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
      res.setHeader('Content-Disposition', 'attachment; filename=archivo.docx');

      const readStream = fs.createReadStream(outputFilePath);
      readStream.pipe(res);

      readStream.on('end', () => {
        fs.unlink(outputFilePath, (err) => {
          if (err) {
            console.error('Error al borrar el archivo:', err);
          } else {
            console.log('Archivo borrado exitosamente.');
          }
        });
      });

      readStream.on('error', (err) => {
        console.error('Error al leer el archivo:', err);
        res.status(500).send('Error al enviar el archivo');
      });
    } else {
      res.status(404).send('El archivo no existe');
    }
  } catch (error) {
    console.error('Error procesando el documento:', error);
    res.status(500).send({ msg: 'Server error', error });
  }
};
