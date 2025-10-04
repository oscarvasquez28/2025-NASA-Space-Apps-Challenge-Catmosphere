import express from 'express';
import {getLocation} from "../controllers/NotificationController.js";

const router = express.Router();

//Rutas del Controlador de Notificaciones
router.get('/', getLocation)

export default router;