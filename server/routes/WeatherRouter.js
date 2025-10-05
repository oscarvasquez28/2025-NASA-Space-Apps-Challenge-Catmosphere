import express from 'express';
import {getWeather} from "../controllers/WeatherController.js";

const router = express.Router();

//Rutas del Controlador del Clima
router.get('/:latitude/:longitude', getWeather)

export default router;