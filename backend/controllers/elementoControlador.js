import { elementoServicio } from '../services/elementoServicio.js';

export const elementoControlador = {
    async obtenerTodosLosElementos(req, res) {
          try {
                  const elementos = await elementoServicio.obtenerTodos();
                  res.json(elementos);
          } catch (error) {
                  res.status(500).json({ error: error.message });
          }
    },

    async crearElemento(req, res) {
          try {
                  const { nombre, descripcion, ...otros } = req.body;
                  if (!nombre) {
                            return res.status(400).json({ error: 'El nombre es obligatorio' });
                  }
                  const nuevoElemento = await elementoServicio.crear({ nombre, descripcion, ...otros });
                  res.status(201).json(nuevoElemento);
          } catch (error) {
                  res.status(500).json({ error: error.message });
          }
    },

    async actualizarElemento(req, res) {
          try {
                  const { id } = req.params;
                  const elementoActualizado = await elementoServicio.actualizar(id, req.body);
                  res.json(elementoActualizado);
          } catch (error) {
                  const status = error.message === 'Elemento no encontrado' ? 404 : 500;
                  res.status(status).json({ error: error.message });
          }
    },

    async eliminarElemento(req, res) {
          try {
                  const { id } = req.params;
                  await elementoServicio.eliminar(id);
                  res.status(204).send();
          } catch (error) {
                  const status = error.message === 'Elemento no encontrado' ? 404 : 500;
                  res.status(status).json({ error: error.message });
          }
    }
};
