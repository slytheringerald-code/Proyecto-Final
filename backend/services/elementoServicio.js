import { elementoModelo } from '../models/elementoModelo.js';

export const elementoServicio = {
    async obtenerTodos() {
          return await elementoModelo.obtenerTodos();
    },

    async obtenerPorId(id) {
          return await elementoModelo.buscarPorId(id);
    },

    async crear(datosElemento) {
          const elementos = await elementoModelo.obtenerTodos();
          const nuevoElemento = {
                  id: Date.now().toString(),
                  ...datosElemento,
                  fechaCreacion: new Date().toISOString()
          };
          elementos.push(nuevoElemento);
          await elementoModelo.guardar(elementos);
          return nuevoElemento;
    },

    async actualizar(id, datosElemento) {
          const elementos = await elementoModelo.obtenerTodos();
          const indice = elementos.findIndex(el => el.id === id);
          if (indice === -1) {
                  throw new Error('Elemento no encontrado');
          }
          const elementoActualizado = {
                  ...elementos[indice],
                  ...datosElemento,
                  fechaActualizacion: new Date().toISOString()
          };
          elementos[indice] = elementoActualizado;
          await elementoModelo.guardar(elementos);
          return elementoActualizado;
    },

    async eliminar(id) {
          const elementos = await elementoModelo.obtenerTodos();
          const elementosFiltrados = elementos.filter(el => el.id !== id);
          if (elementos.length === elementosFiltrados.length) {
                  throw new Error('Elemento no encontrado');
          }
          await elementoModelo.guardar(elementosFiltrados);
          return true;
    }
};
