import { ConnectOptions, connect } from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

export const dbConexion = async ():Promise<boolean> => {

  const MONGO_URI = process.env.DB_URI || "mongodb://localhost:27017/emsdm";
  const options: ConnectOptions = {

  };

  if (!MONGO_URI) {
    console.error('Error: Missing DB_URI environment variable');
  }

  try {
    const db = await connect(MONGO_URI);
    if (db.connection.readyState === 1) {
      console.log('Db connected to ', db.connection.name);
      return true
    } else {
      console.log("❌ Conexión fallida");
      return false
    }

  } catch (err:any) {

     // Manejo de errores detallado
     console.error('Db Connection failure:', {
      message: (err as Error).message,
      name: (err as Error).name,
      stack: (err as Error).stack,
    });
    
    // Si Mongoose genera errores específicos
    if ('code' in err) {
      console.error('Mongoose error code:', (err as any).code);
    }

    if ('reason' in err) {
      console.error('Mongoose error reason:', (err as any).reason);
    }

    return false;
  }
    
};