import app from "./app";
import { dbConexion } from "./db/dbConnection";
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 3000;

if (!PORT) {
    console.error('Error: Missing PORT environment variable');
}

(async () => {
    const dbAlive = await dbConexion();
  
    if (dbAlive) {
        app.listen(PORT, () => console.log(` Server Running on port ${PORT}`));
    }
})();