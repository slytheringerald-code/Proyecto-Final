import fs from 'fs/promises';
import path from 'path';

const RUTA_DATOS = path.join(process.cwd(), 'data', 'usuarios.json');

export const usuarioModelo = {
    async obtenerTodos() {
          try {
                  const datos = await fs.readFile(RUTA_DATOS, 'utf-8');
                  return JSON.parse(datos);
          } catch (error) {
                  if (error.code === 'ENOENT') return [];
                  throw error;
          }
    },

    async buscarPorEmail(email) {
          const usuarios = await this.obtenerTodos();
          const emailNormalizado = email.toLowerCase();
          return usuarios.find(usuario => usuario.email.toLowerCase() === emailNormalizado);
    },

    async guardar(usuarios) {
          await fs.writeFile(RUTA_DATOS, JSON.stringify(usuarios, null, 2), 'utf-8');
    }
};
