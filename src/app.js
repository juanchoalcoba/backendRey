import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';

// Importar rutas
import authRoutes from '../routes/auth.routes.js'; 


const app = express();

const corsOptions = {
  origin: 'https://front-rey.vercel.app',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
};
app.use(cors(corsOptions));


// Middlewares
app.use(morgan('dev')); // Logs de peticiones
app.use(express.json()); // Leer JSON del body
app.use(cookieParser()); // Leer cookies

// Rutas
app.use('/api', authRoutes); // prefijo para todas las rutas de auth


export default app;
