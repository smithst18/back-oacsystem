import express from 'express'; // Import express with default import
import cors from "cors";
import routes from "./routes";
// Serv instance
const app = express(); // Use type annotation for app

// Request to JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS configuration
app.use(cors()); // Assuming cors is already imported or a global function

// Config for public files
        //nombre de la ruta               //ruta carpeta de la cual se esta haciendo recurso publico
app.use('/public',express.static(__dirname + '/public/files'));

// Routes

// user routes
app.use('/api/user', routes.userRouts); 
// diary routes
app.use('/api/diary', routes.diaryRouts); 
// cases routes
app.use('/api/cases', routes.casesRouts); 
// categories routes
app.use('/api/subCategories', routes.subcategoryRouts);
// subcategories routes
app.use('/api/types', routes.typesRouts);

export default app;