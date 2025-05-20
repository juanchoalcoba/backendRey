import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';

// Importar rutas
import authRoutes from '../routes/auth.routes.js'; 


const app = express();

// Configuración de CORS
const corsOptions = {
    origin: 'https://front-rey.vercel.app', // La URL de tu frontend en Vercel
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],  // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],  // Cabeceras permitidas
    optionsSuccessStatus: 204,  // Opcional para manejar preflight exitoso
  };
  
  // Aplica CORS a toda la aplicación
  app.use(cors(corsOptions));

// Middlewares
app.use(morgan('dev')); // Logs de peticiones
app.use(express.json()); // Leer JSON del body
app.use(cookieParser()); // Leer cookies

// Rutas
app.use('/api', authRoutes); // prefijo para todas las rutas de auth


export default app;
