import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';

// Importar rutas
import authRoutes from '../routes/auth.routes.js'; 


const app = express();

// Configuración de CORS
app.use(cors({
  origin: 'https://front-rey.vercel.app', // Frontend
  credentials: true // Permite el envío de cookies
}));

// ✅ Opcional pero recomendado: responde preflight
app.options('*', cors());

// Middlewares
app.use(morgan('dev')); // Logs de peticiones
app.use(express.json()); // Leer JSON del body
app.use(cookieParser()); // Leer cookies

// Rutas
app.use('/api', authRoutes); // prefijo para todas las rutas de auth


export default app;
