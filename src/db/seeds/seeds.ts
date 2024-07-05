import 'dotenv/config';
import mongoose from "mongoose";
// import { encrypt } from "../../helpers/handlePassword";
import { userModel } from "../../models";



const MONGO_URI = process.env.DB_URI || "mongodb://localhost:27017/emsdm";

mongoose.connect(
    MONGO_URI,
        
).then(async (mongoose) =>{

    console.log('Db connected to ',mongoose.connection.name);

    Promise.all([

        await userModel.insertMany([
          {
            name: "Emanuel Abreu",
            password: "0212",
            rol: "admin",
            ci: "27571718",
            birdDate: "1998-10-18",
            phoneNumber: "04126022414",
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
