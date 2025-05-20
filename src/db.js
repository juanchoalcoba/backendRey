import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

// Carga las variables de entorno desde el archivo .env
dotenv.config();

export const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: process.env.MYSQL_PORT,
});
