import { usuarioModelo } from '../models/usuarioModelo.js';
import { autenticacionServicio } from './autenticacionServicio.js';

export const usuarioServicio = {
    async obtenerTodos() {
          return await usuarioModelo.obtenerTodos();
    },

    async crear(usuario) {
          const usuarios = await usuarioModelo.obtenerTodos();
          const nuevoUsuario = { id: Date.now().toString(), ...usuario };
          usuarios.push(nuevoUsuario);
          await usuarioModelo.guardar(usuarios);
          return nuevoUsuario;
    },

    async registro(datosUsuario) {
          const { nombre, email, password } = datosUsuario;
          const usuarioExistente = await usuarioModelo.buscarPorEmail(email);
          if (usuarioExistente) {
                  throw new Error('El usuario ya existe');
          }

      const passwordHasheado = await autenticacionServicio.hashearPassword(password);
          const nuevoUsuario = {
                  id: Date.now().toString(),
                  nombre,
                  email,
                  password: passwordHasheado
          };

      const usuarios = await usuarioModelo.obtenerTodos();
          usuarios.push(nuevoUsuario);
          await usuarioModelo.guardar(usuarios);

      const { password: _, ...usuarioSinPassword } = nuevoUsuario;
          return usuarioSinPassword;
    },

    async login(email, password) {
          const usuario = await usuarioModelo.buscarPorEmail(email);
          if (!usuario) {
                  throw new Error('Credenciales invalidas');
          }

      const coinciden = await autenticacionServicio.compararPassword(password, usuario.password);
          if (!coinciden) {
                  throw new Error('Credenciales invalidas');
          }

      const token = autenticacionServicio.generarToken({ id: usuario.id, email: usuario.email });
          return { token, usuario: { id: usuario.id, nombre: usuario.nombre, email: usuario.email } };
    }
};
