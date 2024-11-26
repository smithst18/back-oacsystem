import 'dotenv/config';
import mongoose from "mongoose";
import {
  caseModel
  
  } from "../../models";



const MONGO_URI = process.env.DB_URI || "mongodb://localhost:27017/emsdm";

mongoose.connect(
    MONGO_URI,
    {
    }
).then(async (mongoose) =>{

    console.log('Db connected to ',mongoose.connection.name);
    // await mongoose.connection.collection('cases').dropIndex('subId_1');
    // const updated = await caseModel.updateMany(
    //     {},
    //     { 
    //         status: "contacto inicial",
    //         subId:null
    //     });

    //     if(updated) console.log("change done succesfully");
    //     else console.log("change error ")
    //codigo futuro para cuando id deba ser unico nuevamente 
    //await mongoose.connection.collection('cases').createIndex({ subId: 1 }, { unique: true, partialFilterExpression: { subId: { $ne: null } } })

    mongoose.disconnect();
}).catch((e) =>{
    console.log(e,'conexion error');
    return false;
});