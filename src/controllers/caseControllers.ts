import { Request, Response } from "express";
import { matchedData } from "express-validator";
import  { caseModel }  from "../models";
import { handleError } from "../utils/handleErrors";
import { ObjectId } from 'mongodb';

/**
 * deleted user by id
 * @param {*} req 
 * @param {*} res 
 */

export const save = async ( req:Request, res:Response ) =>{
  try{
    const cleanBody = matchedData(req);
    
    const savedCase = await caseModel.create(cleanBody)
    if(savedCase)return res.status(200).send({msg:"user Created",savedCase});

    else return handleError(res,403,"Error al registrar"); 
  }catch(error){
    return res.status(500).send({ msg:'Server error',error });
  }
}

/**
 * Get users with pagination 
 * @param {*} req 
 * @param {*} res 
 */

export const getCases = async ( req:Request, res:Response ) =>{
  try{
    const { page , search } = matchedData(req);
    
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
      select:["_id","remitente","prioridad","status","cedulaBeneficiario","analistaId"],
      populate:[{
        path: 'analistaId',
        select:["name","_id"]
        // match: { name: new RegExp('.*h.*', 'i') },
        // sort: { name: -1 }
      }]
    };

    let query = {}

    if(search && search != undefined && search != "undefined" && search != null ) {
      query = {
        $or: [
          ...(ObjectId.isValid(search) ? [{ _id: search }] : []), // operador ternario donde se valida si la cadena es un object id valido en caso de cerlo se busca por la id
          { remitente: { $regex: new RegExp(`^${search}`, "i") } },
          { nombreSolicitante: { $regex: new RegExp(`^${search}`, "i") } },
          { cedulaSolicitante: { $regex: new RegExp(`^${search}`, "i") } },
          { nombreBeneficiario: { $regex: new RegExp(`^${search}`, "i") } },
          { cedulaBeneficiario: { $regex: new RegExp(`^${search}`, "i") } },
          { estado: { $regex: new RegExp(`^${search}`, "i") } },
          { tipoBeneficiario: { $regex: new RegExp(`^${search}`, "i") } },
        ]
      }
    };

    const paginatedData =  await caseModel.paginate(query, options, (err:any, result:any) => {
      if (err) {
        
        return console.log("Error paginando los Datos",err)
      }else return result
    });

    if(paginatedData && paginatedData.cases && Array.isArray(paginatedData.cases) && paginatedData.cases.length > 0 ) {
      // console.log(paginatedData);
      return res.status(200).send({ paginatedData });
    
    }else return handleError(res,404,"No se ha encontrado casos");

  }catch(error){
    return res.status(500).send({msg:"Server error",error});
  }
}

/**
 * Get case by  id ( get ) parma : id 
 * @param {*} req 
 * @param {*} res 
 */

export const getcaseById = async ( req:Request, res:Response ) =>{
  try{
    const cleanBody = matchedData(req);
    
    const Case = await caseModel.findById(cleanBody.id).populate(["categoriaId","subCategoriaId","analistaId"]);
    if(Case) return res.status(200).send({ Case });

    else return handleError(res,404,"case not found"); 
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
    if(cleanBody.id){

      const updatedCase =  await caseModel.findByIdAndUpdate(cleanBody.id,cleanBody);

      if(!updateCase) return handleError(res,403,"Error al Actualizar el caso");
      else return res.status(200).send({updatedCase});

    }else return handleError(res,404,"Id inexistente");
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
        $lookup: {
          from: "categories",
          localField: "categoriaId",
          foreignField: "_id",
          as: "category"
        }
      },
      {
        $unwind: "$category"
      },
      {
        $group: {
          _id: "$category.name", // Corrección aquí
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          _id:0,
          name: "$_id", // Renombrar _id a name
          count: 1
        }
      }
    ]);

    const categories = quantityPerCategory.reduce((acc, curr) => {
      acc.push(curr.name);
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
