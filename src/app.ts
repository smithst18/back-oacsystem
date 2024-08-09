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


// Routes

// user routes
app.use('/api/user', routes.userRouts); 
// diary routes
app.use('/api/diary', routes.diaryRouts); 
// cases routes
app.use('/api/cases', routes.casesRouts); 
// categories routes
app.use('/api/categories', routes.categoryRouts);
// subcategories routes
app.use('/api/subcategories', routes.subcategoryRouts);

export default app; // Export the app instance