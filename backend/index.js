import app from './app.js';
import { config } from './config/env.js';

const PORT = config.port;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
        console.log(`Entorno: ${config.nodeEnv}`);
        });
