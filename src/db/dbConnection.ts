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

    console.log('Db connected to ', db.connection.name);
    return true;

  } catch (err) {

    console.log('Db Connection failure:', err);
    return false;
    
  }
};