import fs from 'fs/promises';
import path from 'path';

const RUTA_DATOS = path.join(process.cwd(), 'data', 'elementos.json');

export const elementoModelo = {
  async obtenerTodos() {
    try {
      const datos = await fs.readFile(RUTA_DATOS, 'utf-8');
      return JSON.parse(datos);
    } catch (error) {
      if (error.code === 'ENOENT') return [];
      throw error;
    }
  },

  async buscarPorId(id) {
    const elementos = await this.obtenerTodos();
    return elementos.find(elemento => elemento.id === id);
  },

  async guardar(elementos) {
    await fs.writeFile(RUTA_DATOS, JSON.stringify(elementos, null, 2), 'utf-8');
  }
};
