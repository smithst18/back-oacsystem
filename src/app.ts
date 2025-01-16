import express from 'express'; // Import express with default import
import cors from "cors";
import routes from "./routes";
// Serv instance
const app = express(); // Use type annotation for app


// CORS configuration
const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: false, // Deshabilitar credenciales con wildcard
};

app.use(cors(corsOptions)); // Assuming cors is already imported or a global function


// Request to JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Config for public files
//nombre de la ruta               //ruta carpeta de la cual se esta haciendo recurso publico
app.use('/public',express.static(__dirname + '/public/files'));
// Configuración para archivos estáticos en public/html
app.use('/html', express.static(__dirname + '/public/html'));
// Routes

// user routes
app.use('/api/user', routes.userRouts); 
// diary routes
app.use('/api/diary', routes.diaryRouts); 
// cases routes
app.use('/api/cases', routes.casesRouts); 
// subcategories routes
app.use('/api/subCategories', routes.subcategoryRouts);
// types routes
app.use('/api/types', routes.typesRouts);
// server routes
app.use('/api/server', routes.serverRouts);

export default app;