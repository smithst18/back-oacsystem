import app from "./app";
import { dbConexion } from "./db/dbConnection";
import dotenv from 'dotenv';
dotenv.config();

const port = process.env.PORT || 3000;
if (!port) {
    console.error('Error: Missing PORT environment variable');
}

(async () => {
    const dbAlive = await dbConexion();
  
    if (dbAlive) {
        app.listen(port, () => console.log(` Server Running on port ${port}`));
    }
})();