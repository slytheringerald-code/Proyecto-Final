import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from '../config/env.js';

export const autenticacionServicio = {
    async hashearPassword(password) {
          const salt = await bcrypt.genSalt(10);
          return await bcrypt.hash(password, salt);
    },

    async compararPassword(password, hasheado) {
          return await bcrypt.compare(password, hasheado);
    },

    generarToken(payload) {
          return jwt.sign(payload, config.jwtSecret, { expiresIn: '1h' });
    }
};
