
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import usuarioRutas from './routes/usuarioRutas.js';
import elementoRutas from './routes/elementoRutas.js';
import { errorMiddleware } from './middlewares/errorMiddleware.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(process.cwd(), 'public'))); // Servir archivos estaticos desde public/

// Rutas
app.use('/api/usuarios', usuarioRutas);
app.use('/api/elementos', elementoRutas);

// Verificacion de salud (Health Check)
app.get('/salud', (req, res) => {
    res.status(200).json({ estado: 'OK', tiempo_actividad: process.uptime() });
});

// Ruta raiz para servir el frontend
app.get('/', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'public', 'index.html'));
});

// Middleware de error global (debe ser el ultimo)
app.use(errorMiddleware);

export default app;
