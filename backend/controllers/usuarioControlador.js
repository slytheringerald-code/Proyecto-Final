import { usuarioServicio } from '../services/usuarioServicio.js';

export const usuarioControlador = {
    async obtenerTodosLosUsuarios(req, res) {
          try {
                  const usuarios = await usuarioServicio.obtenerTodos();
                  res.json(usuarios);
          } catch (error) {
                  res.status(500).json({ error: error.message });
          }
    },

    async crearUsuario(req, res) {
          try {
                  const { nombre, email } = req.body;
                  if (!nombre || !email) {
                            return res.status(400).json({ error: 'El nombre y el email son obligatorios' });
                  }
                  const nuevoUsuario = await usuarioServicio.crear({ nombre, email });
                  res.status(201).json(nuevoUsuario);
          } catch (error) {
                  res.status(500).json({ error: error.message });
          }
    },

    async registro(req, res) {
          try {
                  const { nombre, email, password } = req.body;
                  if (!nombre || !email || !password) {
                            return res.status(400).json({ error: 'Todos los campos son obligatorios' });
                  }
                  const usuario = await usuarioServicio.registro({ nombre, email, password });
                  res.status(201).json({ mensaje: 'Usuario registrado exitosamente', usuario });
          } catch (error) {
                  const status = error.message === 'El usuario ya existe' ? 400 : 500;
                  res.status(status).json({ error: error.message });
          }
    },

    async login(req, res) {
          try {
                  const { email, password } = req.body;
                  if (!email || !password) {
                            return res.status(400).json({ error: 'El email y la contrasena son obligatorios' });
                  }
                  const resultado = await usuarioServicio.login(email, password);
                  res.json(resultado);
          } catch (error) {
                  const status = error.message === 'Credenciales invalidas' ? 401 : 500;
                  res.status(status).json({ error: error.message });
          }
    }
};
