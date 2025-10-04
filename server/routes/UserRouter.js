import express from 'express';
import {logInUser, registerUser} from "../controllers/UserController.js";

const router = express.Router();

//Rutas del Controlador de Notificaciones
router.post('/', registerUser)
router.post('/login', logInUser)

export default router;