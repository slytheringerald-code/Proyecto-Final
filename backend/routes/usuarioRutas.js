import { Router } from 'express';
import { usuarioControlador } from '../controllers/usuarioControlador.js';

const router = Router();

router.get('/', usuarioControlador.obtenerTodosLosUsuarios);
router.post('/registro', usuarioControlador.registro);
router.post('/acceso', usuarioControlador.login);
router.post('/', usuarioControlador.crearUsuario);

export default router;
