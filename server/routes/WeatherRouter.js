import express from 'express';
import {getGeneralIndicators, getWeather} from "../controllers/WeatherController.js";

const router = express.Router();

//Rutas del Controlador del Clima
router.get('/:latitude/:longitude', getWeather)
router.get('/indicators/:latitude/:longitude', getGeneralIndicators)

export default router;