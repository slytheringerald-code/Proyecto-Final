import jwt from 'jsonwebtoken';
import { config } from '../config/env.js';

export const autenticacionMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
          return res.status(401).json({ error: 'Acceso denegado. No se proporciono un token.' });
    }

    const token = authHeader.split(' ')[1];

    try {
          const verificado = jwt.verify(token, config.jwtSecret);
          req.usuario = verificado;
          next();
    } catch (error) {
          res.status(401).json({ error: 'Token no valido.' });
    }
};
