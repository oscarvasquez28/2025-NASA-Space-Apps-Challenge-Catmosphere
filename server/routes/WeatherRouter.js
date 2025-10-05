import express from 'express';
import {getAirPollution, getGeneralIndicators, getWeather} from "../controllers/WeatherController.js";

const router = express.Router();

//Rutas del Controlador del Clima
router.get('/:latitude/:longitude', getWeather)
router.get('/indicators/:latitude/:longitude', getGeneralIndicators)
router.get('/forecast/:latitude/:longitude', getAirPollution)

export default router;