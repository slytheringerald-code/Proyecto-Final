import { Router } from 'express';
import { elementoControlador } from '../controllers/elementoControlador.js';
import { autenticacionMiddleware } from '../middlewares/autenticacionMiddleware.js';

const router = Router();

router.use(autenticacionMiddleware);

router.get('/', elementoControlador.obtenerTodosLosElementos);
router.post('/', elementoControlador.crearElemento);
router.put('/:id', elementoControlador.actualizarElemento);
router.delete('/:id', elementoControlador.eliminarElemento);

export default router;
