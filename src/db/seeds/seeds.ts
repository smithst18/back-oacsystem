import 'dotenv/config';
import mongoose from "mongoose";
// import { encrypt } from "../../helpers/handlePassword";
import {
  userModel,
  subcategoryModel,
  typeModel } from "../../models";



const MONGO_URI = process.env.DB_URI || "mongodb://localhost:27017/emsdm";

mongoose.connect(
    MONGO_URI,
    {
    }
).then(async (mongoose) =>{

    console.log('Db connected to ',mongoose.connection.name);

    Promise.all([
      
        await userModel.insertMany([
          {
            name: "Emanuel Abreu",
            password: "Emanuel12309/?",
            rol: "admin",
            ci: "27571718",
            birdDate: "1998-10-18",
            phoneNumber: "04126022414",
          },
        ]),


        await subcategoryModel.insertMany([
          {
            _id: "66885e41128f5eb2ede6d8a5",
            name: "salud",
            tiposId:[
              "60885e41128f5eb2ede6d8a5",
              "61885e41128f5eb2ede6d8a5",
              "62885e41128f5eb2ede6d8a5",
              "63885e41128f5eb2ede6d8a5",
              "64885e41128f5eb2ede6d8a5",
              "65885e41128f5eb2ede6d8a5",
              "66885e41128f5eb2ede6d8a9",
              "67885e41128f5eb2ede6d8a5",
              "68885e41128f5eb2ede6d8a5",
            ]
          },
          {
            _id: "66885e41128f5eb2ede6d8a6",
            name: "vivienda y habitat",
            tiposId:[
              "59885e41128f5eb2ede6d8a6",
              "58885e41128f5eb2ede6d8a6",
              "57885e41128f5eb2ede6d8a6",
            ]
          },
          {
            _id: "66885e41128f5eb2ede6d8a7",
            name: "economia",
            tiposId:[
              "49885e41128f5eb2ede6d8a6",
              "48885e41128f5eb2ede6d8a6",
              "47885e41128f5eb2ede6d8a6",
              "46885e41128f5eb2ede6d8a6",
              "45885e41128f5eb2ede6d8a6",
            ]
          },
          {
            _id: "75885e41128f5eb2ede6d8a6",
            name: "proteccion social",
            tiposId:[
              "70885e41128f5eb2ede6d8a6",
              "71885e41128f5eb2ede6d8a6",
              "72885e41128f5eb2ede6d8a6",
              "73885e41128f5eb2ede6d8a6",
              "74885e41128f5eb2ede6d8a6",
            ]
          }
        ]),
        

        await typeModel.insertMany([
          {
             _id: "60885e41128f5eb2ede6d8a5", 
            name: "reparacion de centros de salud",
            subcategoriaId:"66885e41128f5eb2ede6d8a5"
          }, 
          {
             _id: "61885e41128f5eb2ede6d8a5", 
            name: "dotacion de centro de salud",
            subcategoriaId:"66885e41128f5eb2ede6d8a5"
          }, 
          {
             _id: "62885e41128f5eb2ede6d8a5", 
            name: "jornada  de atencion integral",
            subcategoriaId:"66885e41128f5eb2ede6d8a5"
          }, 
          {
             _id: "63885e41128f5eb2ede6d8a5", 
            name: "intervencion quirurgica",
            subcategoriaId:"66885e41128f5eb2ede6d8a5"
          }, 
          {
             _id: "64885e41128f5eb2ede6d8a5", 
            name: "estudios medicos",
            subcategoriaId:"66885e41128f5eb2ede6d8a5"
          }, 
          {
             _id: "65885e41128f5eb2ede6d8a5", 
            name: "insumos medicos",
            subcategoriaId:"66885e41128f5eb2ede6d8a5"
          }, 
          {
             _id: "66885e41128f5eb2ede6d8a9", 
            name: "tratamientos medicos",
            subcategoriaId:"66885e41128f5eb2ede6d8a5"
          }, 
          {
             _id: "67885e41128f5eb2ede6d8a5", 
            name: "equipo medico",
            subcategoriaId:"66885e41128f5eb2ede6d8a5"
          }, 
          {
             _id: "68885e41128f5eb2ede6d8a5", 
            name: "ayuda tecnica",
            subcategoriaId:"66885e41128f5eb2ede6d8a5"
          }, 
          {
             _id: "68885e41128f5eb2ede6d8a1", 
            name: "consulta medica",
            subcategoriaId:"66885e41128f5eb2ede6d8a5"
          }, 
           //   vivienda y habitat
          {
            _id: "59885e41128f5eb2ede6d8a6", 
           name: "vivienda",
           subcategoriaId:"66885e41128f5eb2ede6d8a6"
          },
          {
            _id: "58885e41128f5eb2ede6d8a6", 
           name: "materiales de construccion",
           subcategoriaId:"66885e41128f5eb2ede6d8a6"
          },
          {
            _id: "57885e41128f5eb2ede6d8a6", 
           name: "equipamiento",
           subcategoriaId:"66885e41128f5eb2ede6d8a6"
          },
          //economia
          {
            _id: "49885e41128f5eb2ede6d8a6", 
           name: "dotacion",
           subcategoriaId:"66885e41128f5eb2ede6d8a7"
          },
          {
            _id: "48885e41128f5eb2ede6d8a6", 
           name: "oferta exportable",
           subcategoriaId:"66885e41128f5eb2ede6d8a7"
          },
          {
            _id: "47885e41128f5eb2ede6d8a6", 
           name: "proyectos",
           subcategoriaId:"66885e41128f5eb2ede6d8a7"
          },
          {
            _id: "46885e41128f5eb2ede6d8a6", 
           name: "apoyo para planes de desarrollo",
           subcategoriaId:"66885e41128f5eb2ede6d8a7"
          },
          {
            _id: "45885e41128f5eb2ede6d8a6", 
           name: "financiamiento",
           subcategoriaId:"66885e41128f5eb2ede6d8a7"
          },
          //proteccion social
          {
            _id: "70885e41128f5eb2ede6d8a6", 
           name: "servicios publicos",
           subcategoriaId:"75885e41128f5eb2ede6d8a6"
          },
          {
            _id: "71885e41128f5eb2ede6d8a6", 
           name: "logistica de translado y movilizacion",
           subcategoriaId:"75885e41128f5eb2ede6d8a6"
          },
          {
            _id: "72885e41128f5eb2ede6d8a6", 
           name: "deporte y recreacion",
           subcategoriaId:"75885e41128f5eb2ede6d8a6"
          },
          {
            _id: "73885e41128f5eb2ede6d8a6", 
           name: "servicios funerarios",
           subcategoriaId:"75885e41128f5eb2ede6d8a6"
          },
          {
            _id: "74885e41128f5eb2ede6d8a6", 
           name: "alimentacion",
           subcategoriaId:"75885e41128f5eb2ede6d8a6"
          },
        ]),
        
    ]).then((values) =>{

        console.log('seeds load succesfully');

    }).catch((e)=>{

        console.log(e);
        console.log('Error loading seeds');

    });

    mongoose.disconnect();
}).catch((e) =>{
    console.log(e,'conexion error');
    return false;
});