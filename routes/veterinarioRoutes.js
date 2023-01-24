import express from 'express';
import {registrar,
        perfil,
        confirmar,
        autenticar,
        olvidePassword,
        comprobarToken,
        nuevoPassword,
        actualizarPerfil,
        actualizarPassword
} from '../controllers/veterinarioController.js';
import checkAuth from '../middleware/authMiddleware.js';

const router = express.Router();

//Area pública 
router.post("/", registrar );
router.get("/confirmar/:token", confirmar);//Podemos hacer rutas dinamicos poniendo dos puntos
router.post("/login", autenticar);
router.post('/olvide-password' , olvidePassword);
//Si tenemos dos routes iguales hacemos esto
router.route('/olvide-password/:token').get(comprobarToken).post(nuevoPassword);

//Area privada
router.get("/perfil", checkAuth, perfil );
router.put("/perfil/:id", checkAuth, actualizarPerfil );
router.put('/actualizar-password', checkAuth, actualizarPassword)

export default router; 