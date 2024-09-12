import { Request, Response } from "express";
import { matchedData } from "express-validator";
import { caseModel, userModel }  from "../models";
import { handleError } from "../utils/handleErrors";
import { PipelineStage } from 'mongoose'; 
import * as ExcelJS from 'exceljs';
import fs from "fs"
import path from 'path';
import PizZip from "pizzip";
import docxtemplater from "docxtemplater";
import { SubCategoryI } from "../interfaces/Subcategory";
import { camelize } from "../utils/handleCamelcase"
const pathStorage = `${__dirname}/../public/files`;
const PUBLIC_URL = process.env.PUBLIC_URL || "http://localhost:3000/public";



/**
 * save case
 * @param {*} req 
 * @param {*} res 
 */

export const save = async ( req:Request, res:Response ) =>{
  try{
    const file = req.body.fileName;

    let cleanBody = matchedData(req);

    if (file) {
      const filePath = `${pathStorage}/${file}`;
      cleanBody.file = `${PUBLIC_URL}/${file}`;;
      // Verifica si el archivo realmente existe antes de guardar la ruta en la base de datos.
      if (!fs.existsSync(filePath)) {
        return handleError(res, 403, 'Error al registrar, archivo no encontrado');
      }
    }
    
    const savedCase = await caseModel.create(cleanBody);

    if(savedCase)return res.status(200).send({msg:"user Created",savedCase});

    else return handleError(res,403,"Error al registrar"); 
  }catch(error){
    return res.status(500).send({ msg:'Server error',error });
  }
}

/**
 * Get users with pagination and search
 * @param {*} req 
 * @param {*} res 
 */

export const getCases = async ( req:Request, res:Response ) =>{
  try{
    const { page , search, userId } = matchedData(req);
    
    const myCustomLabels = {
      totalDocs: 'totalDocs',
      docs: 'cases',
      limit: 'perPage',
      page: 'currentPage',
      nextPage: 'next',
      prevPage: 'prev',
      totalPages: 'totalPages',
      pagingCounter: 'pagingCounter',
      meta: 'paginator',
    };

    const options = {
      page: parseInt(page),
      limit: 10,
      customLabels: myCustomLabels,
      select:["_id","remitente","prioridad","status","cedulaBeneficiario","analistaId","subId"],
      populate:[{
        path: 'analistaId',
        select:["name","_id"]
      }]
    };

    let query = {};
    
    if(search && search != undefined && search != "undefined" && search != null ) {
      //setemaos la pagina de busqueda en 0 para que no haya errores en la respuesta cuando tengamos un query de busqueda
      options.page = 0;
      query = {

        $or: [
          //...(ObjectId.isValid(search) ? [{ _id: search }] : []),  operador ternario donde se valida si la cadena es un object id valido en caso de cerlo se busca por la id
          { subId:search},
          { remitente: { $regex: new RegExp(`^${search}`, "i") } },
          { nombreSolicitante: { $regex: new RegExp(`^${search}`, "i") } },
          { cedulaSolicitante: { $regex: new RegExp(`^${search}`, "i") } },
          { nombreBeneficiario: { $regex: new RegExp(`^${search}`, "i") } },
          { cedulaBeneficiario: { $regex: new RegExp(`^${search}`, "i") } },
          { estado: { $regex: new RegExp(`^${search}`, "i") } },
          { tipoBeneficiario: { $regex: new RegExp(`^${search}`, "i") } },
        ],

      }
    }

    // verificar si el usuario que esta solicitando la data existe y tiene los permisos pertinentes es decir es admin o user normal

    const userExist = await userModel.findById(userId);
    
    //if user dont exist return error

    if(!userExist) return handleError(res,404,"Usuario inexistente");

    
    //esto aca comentado permite filtrar si el id del usuario coincide con el que creo los cases dependiendo del rol
    // if(userExist.rol == "normal"){
    //   query ={
    //     ...query,
    //     $and:[{ analistaId: userId }]
    //   }
    // }

    const paginatedData =  await caseModel.paginate(query, options, (err:any, result:any) => {
      if (err) {

        return console.log("Error paginando los Datos",err);

      }else return result
    });

    if(paginatedData && paginatedData.cases && Array.isArray(paginatedData.cases) && paginatedData.cases.length > 0 ) {

      return res.status(200).send({ paginatedData });
    
    }else return handleError(res,404,"No se ha encontrado casos");

  }catch(error){
    return res.status(500).send({msg:"Server error",error});
  }
}

/**
 * Get case by  id ( get ) parma : caseSubId 
 * @param {*} req 
 * @param {*} res 
 */


export const getcaseById = async ( req:Request, res:Response ) =>{
  try{
    const { caseSubId } = matchedData(req);
    if(caseSubId){
      const foundCase = await caseModel.findOne({ subId:caseSubId }).populate("analistaId tipoId subCategoriaId");
      if(foundCase) return res.status(200).send({ foundCase });

      else return handleError(res,404,"case not found"); 
      
    }else return handleError(res,404,"ID necesario"); 
  }catch(error){
    return res.status(500).send({ msg:'Server error',error });
  }
}


/**
 * Get case by  id ( put )
 * @param {*} req 
 * @param {*} res 
 */


export const updateCase = async ( req:Request, res:Response ) =>{
  try{
    const cleanBody = matchedData(req);
    const { userId, caseSubId } = matchedData(req);
  
    const user = await userModel.findById(userId);

    // buscamos que el usuario exista si no existe return error
    if(!user) return handleError(res,404,"No se ha encontrado El usuario");

    // validamos el status del documento
    const foundCase = await caseModel.findOne({subId:caseSubId});
    if(!foundCase) return handleError(res,404,"No existe el caso a actualizar");

    // validamos el rol del usuario
    if(foundCase.status === "cerrado" && user.rol !== "auditor"){
      return handleError(res,403,"No tienes los permisos para editar un caso cerrado");
    }

    const updatedCase = await caseModel.findOneAndUpdate(
      { subId: caseSubId },
      cleanBody,
      { new: true } // Esta opción devuelve el documento actualizado
    ).populate("analistaId tipoId subCategoriaId");

    if(!updatedCase) return handleError(res,403,"Error al Actualizar el caso");
    else return res.status(200).send({updatedCase});

  }catch(error){
    return res.status(500).send({ msg:'Server error',error });
  }
}



/**
 * GET OPEN CASES PER MONTH 
 * @param {*} req 
 * @param {*} res 
 */

export const generalStaticsPerMonth = async ( req:Request, res:Response ) =>{
  try{

    const currentYear = new Date().getFullYear();

    const getCasesPerMonth = async (status?:string) => {
      //SEPARAMOS EL QUERY
      const mathQuery : any = {
        createdAt: {
          $gte: new Date(currentYear, 0, 1), // Filtrar desde el primer día del año actual
          $lt: new Date(currentYear + 1, 0, 1) // Filtrar hasta el primer día del siguiente año
        }
      }
      //SI EL STATUS EXISTE LO ANADIMOS AL OBJETO
      if(status) mathQuery.status = status;

      const values =  await caseModel.aggregate([
        {
          $match: mathQuery
        },
        {
          //PERMITE AGRUPAR POR MESES LOS RESULTADOS ENCONTRADOS EN BASE A SU FECHA DE CREACION
          $group: {
            _id: { $month: "$createdAt" }, 
            count: { $sum: 1 }
          }
        },
        {
          $sort: { _id: 1 } // Ordena por el campo "_id" de forma ascendente (de menor a mayor)
        },
        { 
          //PERMITE MODIFICAR EN BASE AL NUMERO DEL MES Y DEVOLVER EL NOMBRE DEL MES DE MANERA PERSONALIADA
          $project: {
            _id: 0,
            month: {
              $switch: {
                branches: [
                  { case: { $eq: ["$_id", 1] }, then:  "Ene" },
                  { case: { $eq: ["$_id", 2] }, then:  "Feb" },
                  { case: { $eq: ["$_id", 3] }, then:  "Mar" },
                  { case: { $eq: ["$_id", 4] }, then:  "Abr" },
                  { case: { $eq: ["$_id", 5] }, then:  "May" },
                  { case: { $eq: ["$_id", 6] }, then:  "Jun" },
                  { case: { $eq: ["$_id", 7] }, then:  "Jul" },
                  { case: { $eq: ["$_id", 8] }, then:  "Agos" },
                  { case: { $eq: ["$_id", 9] }, then:  "Sep" },
                  { case: { $eq: ["$_id", 10] }, then: "Oct" },
                  { case: { $eq: ["$_id", 11] }, then: "Nov" },
                  { case: { $eq: ["$_id", 12] }, then: "Dic" },
                ],
                default: "Unknown"
              }
            },
            count: 1
          }
        },
      ]);
      const months = values.map((item) => item.month);
      const counts = values.map((item) => item.count);
      return {
        months,
        counts
      }
    } 

    // REUTILIZAMOS LA FUNCTION

    const openCasesPerMonth = await getCasesPerMonth();
    const closedCasesPerMonth = await getCasesPerMonth("cerrado");
    const onprocessCasesPerMonth = await getCasesPerMonth("en proceso");

    let quantityPerCategory = await caseModel.aggregate([
      {
        $group: {
          _id: "$categoria", // Agrupa por el campo "category"
          count: { $sum: 1 } // Cuenta la cantidad de casos en cada categoría
        }
      },
      {
        $project: {
          _id: 0, // Excluye el campo _id del resultado
          category: "$_id", // Renombra _id a category
          count: 1 // Mantiene el conteo
        }
      }
    ]);


    const categories = quantityPerCategory.reduce((acc, curr) => {
      acc.push(curr.category);
      return acc;
    }, []);
    
    const counts = quantityPerCategory.reduce((acc, curr) => {
      acc.push(curr.count);
      return acc;
    }, []);

    const quantityPerCategoryValues = {
      counts,
      categories
    }

    if(openCasesPerMonth && closedCasesPerMonth && onprocessCasesPerMonth) return res.status(200).send(
      { 
        openCasesPerMonth, 
        closedCasesPerMonth, 
        onprocessCasesPerMonth, 
        quantityPerCategoryValues 
      }
    );

    else return handleError(res,404,"No hay Stadisticas para mostrar");

  }catch(error){
    return res.status(500).send({ msg:'Server error', error });
  }
}


/**
 * GET excel file with cases
 * @param {*} req 
 * @param {*} res 
 */

export const generateExcel = async ( req:Request, res:Response ) =>{
  try{
    const currentYear = new Date().getFullYear();
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Casos');

    const mathQuery : any = {
      createdAt: {
        $gte: new Date(currentYear, 0, 1), // Filtrar desde el primer día del año actual
        $lt: new Date(currentYear + 1, 0, 1) // Filtrar hasta el primer día del siguiente año
      }
    }

    const pipeline : PipelineStage[] = [
      {
        $match: mathQuery
      },
      {
        $lookup: {
          from: "types",
          localField: "tipoId",
          foreignField: "_id",
          as: "tipo"
        }
      },
      {
        $unwind: {
          path: "$tipo",
          preserveNullAndEmptyArrays: true // Evita eliminar documentos sin coincidencias
        }
      },
      {
        $lookup: {
          from: "subcategories",
          localField: "subCategoriaId",
          foreignField: "_id",
          as: "subCategoria"
        }
      },
      {
        $unwind: {
          path: "$subCategoria",
          preserveNullAndEmptyArrays: true // Evita eliminar documentos sin coincidencias
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "analistaId",
          foreignField: "_id",
          as: "analista"
        }
      },
      {
        $unwind: {
          path: "$analista",
          preserveNullAndEmptyArrays: true // Evita eliminar documentos sin coincidencias
        }
      },
      {
        $project: {
          // identificador: 1,
          subId:1,
          _id: 0,
          remitente: 1,
          nombreSolicitante: 1,
          cedulaSolicitante: 1,
          nombreBeneficiario: 1,
          cedulaBeneficiario: 1,
          telefonoBeneficiario: 1,
          edad: 1,
          genero: 1,
          estado: 1,
          municipio: 1,
          parroquia: 1,
          sector: 1,
          tipoBeneficiario: 1,
          categoria: 1,
          subCategoria: "$subCategoria.name",
          tipo: "$tipo.name",
          prioridad: 1,
          status: 1,
          viaResolucion: 1,
          analista: "$analista.name",
          createdAt: 1,
          updatedAt: 1
        }
      },
    ];
    
    
    const cases = await caseModel.aggregate(pipeline);

    if(cases && cases.length > 0){

      const reorderedCases = cases.map(doc => {
        return {
          ID: doc.subId,
          Remitente: doc.remitente,
          "Nombre del solicitante": doc.nombreSolicitante,
          "Cedula del solicitante": doc.cedulaSolicitante,
          "Nombre del beneficiario": doc.nombreBeneficiario,
          "Cedula del beneficiario": doc.cedulaBeneficiario,
          "Telefono del beneficiario": doc.telefonoBeneficiario,
          Edad: doc.edad,
          Genero: doc.genero,
          Estado: doc.estado,
          Municipio: doc.municipio,
          Parroquia: doc.parroquia,
          Sector: doc.sector,
          "tipo del Beneficiario": doc.tipoBeneficiario,
          Categoria: doc.categoria,
          Subcategoria: doc.subCategoria,
          Tipo: doc.tipo,
          Pioridad: doc.prioridad,
          Estatus: doc.status,
          "Via de resolucion": doc.viaResolucion,
          Analista: doc.analista,
          "Fecha de apertura": doc.createdAt,
          "Ultima actualizacion": doc.updatedAt
        };
      });

      //generamos la carpeta si no existe
      const dir = path.join(__dirname, '../temp');
      if (!fs.existsSync(dir)){
          fs.mkdirSync(dir, { recursive: true });
      }

      //generamos la ruta de la carpeta
      const filePath = path.join(__dirname, '../temp/Listado_De_Casos.xlsx');

      //generamos los titulos 
      const claves = Object.keys(reorderedCases[0]);

      //agregar los titulos
      worksheet.addRow([...claves]);

      // agregar los datos

      reorderedCases.forEach((elm) => {
        let data = Object.values(elm);
        worksheet.addRow(data);
      })

      // const columns = worksheet.columns;
      worksheet.columns.forEach((column) => {
        column.width = 25; // Establece el ancho en 20 unidades
      });

      // Guardar el archivo
      await workbook.xlsx.writeFile(filePath);

      console.log('Archivo creado exitosamente.');

      
      if (fs.existsSync(filePath)) {
        console.log("enviando archivo");
        // Configurar las cabeceras de respuesta
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=excel.xlsx');
    
        // Leer el archivo y enviarlo como respuesta
        const readStream = fs.createReadStream(filePath) // leemos el archivo
        readStream.pipe(res)// le pasamos la res y lo enviamos

        // cuando se termine de enviar lo eliminamos del folder temp
        readStream.on('end', () => {
          fs.unlink(filePath, (err) => {
            if (err) {
              console.error('Error al borrar el archivo:', err);
            } else {
              console.log('Archivo borrado exitosamente.');
            }
          });
        });

        // si ocurre algun error retornamos error 
        readStream.on('error', (err) => {
          console.error('Error al leer el archivo:', err);
          return res.status(500).send('Error al enviar el archivo');
        });

        return true;
      } else {
        return res.status(404).send('El archivo no existe');
      }
    }else return handleError(res,404,"No hay registros");

  }catch(error){
    return res.status(500).send({ msg:'Server error',error });
  }
}


/**
 * GET word file with expesific case
 * @param {*} req 
 * @param {*} res 
 */

export const generateExcelOneCase = async (req: Request, res: Response) => {
  try {
    const { caseSubId } = matchedData(req);
    let foundCase = await caseModel.findOne({ subId: caseSubId }).populate("tipoId subCategoriaId");

    if (!foundCase) return handleError(res, 404, "No hay Casos disponibles");

    const caseWithSubCategory = foundCase.toObject() as typeof foundCase & { subCategoriaId: SubCategoryI };

    const filePath = path.join(__dirname, '../temp/REGISTRO_FORMATO.docx');
    const content = fs.readFileSync(filePath, 'binary');
    const zip = new PizZip(content);
    const doc = new docxtemplater(zip, { paragraphLoop: true, linebreaks: true });

    doc.render({
      ID: caseWithSubCategory.subId,
      FECHA: new Date(caseWithSubCategory.createdAt).toLocaleString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit' }),
      NOMBRE_SOLICITANTE: camelize(caseWithSubCategory.nombreSolicitante),
      CEDULA_SOLICITANTE: caseWithSubCategory.cedulaSolicitante,
      CEDULA_BENEFICIARIO: caseWithSubCategory.cedulaBeneficiario,
      NOMBRE_BENEFICIARIO: camelize(caseWithSubCategory.nombreBeneficiario),
      EDAD: caseWithSubCategory.edad,
      GENERO: caseWithSubCategory.genero,
      TELEFONO_BENEFICIARIO: caseWithSubCategory.telefonoBeneficiario,
      PARROQUIA: camelize(caseWithSubCategory.parroquia),
      MUNICIPIO: camelize(caseWithSubCategory.municipio.replace(/\bmunicipio\b\s*/gi, '')),
      ESTADO: camelize(caseWithSubCategory.estado.replace(/\bestado\b\s*/gi, '')),
      SECTOR: camelize(caseWithSubCategory.sector),
      PARTICULAR: caseWithSubCategory.tipoBeneficiario === "particular" ? "☑" : "☐",
      INSTITUCIONAL: caseWithSubCategory.tipoBeneficiario === "institucional" ? "☑" : "☐",
      CONPPA: caseWithSubCategory.tipoBeneficiario === "conppa" ? "☑" : "☐",
      PESCADOR_ACUICULTOR: caseWithSubCategory.tipoBeneficiario === "acuicultor" ? "☑" : "☐",
      CATEGORIA: caseWithSubCategory.categoria,
      SUBCATEGORIA: caseWithSubCategory.subCategoriaId.name,
      // SUGERENCIA: caseWithSubCategory.categoria === "sugerencia" ? "☑" : "☐",
      // PETICION: caseWithSubCategory.categoria === "peticion" ? "☑" : "☐",
      // DENUNCIA: caseWithSubCategory.categoria === "denuncia" ? "☑" : "☐",
      // RECLAMO: caseWithSubCategory.categoria === "reclamo" ? "☑" : "☐",
      NOMBRE_OTRA: camelize(caseWithSubCategory.categoria === "quejas" ? "queja" : ""),
      DESCRIPCION: caseWithSubCategory.descripcion,
    });

    const buf = doc.getZip().generate({ type: 'nodebuffer' });
    const outputFilePath = path.join(__dirname, `../temp/planillaCasoN${caseWithSubCategory.subId}.docx`);

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


/**
 * GET word file with expesific  closed case
 * @param {*} req 
 * @param {*} res 
 */
export const generateExcelClosedCase = async (req: Request, res: Response) => {
  try {

    const { caseSubId } = matchedData(req);

    let foundCase = await caseModel.findOne({ subId: caseSubId, status:'cerrado' });

    if (!foundCase) return handleError(res, 404, "No existe el caso cerrado disponibles");

    const filePath = path.join(__dirname, '../temp/ACTA_DE_CIERRE.docx');
    const content = fs.readFileSync(filePath, 'binary');
    const zip = new PizZip(content);
    const doc = new docxtemplater(zip, { paragraphLoop: true, linebreaks: true });

    doc.render({
      ID: foundCase.subId,
      DIA:new Date(foundCase.createdAt).toLocaleString('es-ES', { day: '2-digit' }),
      MES:new Date(foundCase.createdAt).toLocaleString('es-ES', { month: 'long' }),
      ANO:new Date(foundCase.createdAt).toLocaleString('es-ES', { year: 'numeric',}),
      FECHA: new Date(foundCase.createdAt).toLocaleString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit' }),
      NOMBRE_SOLICITANTE: camelize(foundCase.nombreSolicitante),
      CEDULA_SOLICITANTE: foundCase.cedulaSolicitante,
      CEDULA_BENEFICIARIO: foundCase.cedulaBeneficiario,
      NOMBRE_BENEFICIARIO: camelize(foundCase.nombreBeneficiario),
      CATEGORIA: foundCase.categoria,
      DESCRIPCION: foundCase.descripcion,
      FONDO_NEGRO: foundCase.viaResolucion === "servicio desconcentrado fondo negro primero" ? "☑" : "☐",
      ADMINISTRATIVA: foundCase.viaResolucion === "administrativa" ? "☑" : "☐",
      REMITIDO: foundCase.viaResolucion === "remitido" ? "☑" : "☐",
      RECURSOS_PROPIOS: foundCase.viaResolucion === "recursos propios" ? "☑" : "☐",
      NO_PROCEDE: foundCase.viaResolucion === "no procede" ? "☑" : "☐",
    });

    const buf = doc.getZip().generate({ type: 'nodebuffer' });
    const outputFilePath = path.join(__dirname, `../temp/Caso_Cerrado_N${foundCase.subId}.docx`);

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

