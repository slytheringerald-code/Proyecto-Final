
import dotenv from 'dotenv';

// Cargar variables de entorno desde el archivo .env
dotenv.config();

export const config = {
  port: process.env.PORT || 3000,
    nodeEnv: process.env.NODE_ENV || 'development',
      jwtSecret: process.env.JWT_SECRET || 'token_secreto_por_defecto'
      };
