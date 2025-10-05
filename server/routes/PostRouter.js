import express from 'express';
import {getPosts, initRecommendation} from "../controllers/PostController.js";

const router = express.Router();

//Rutas del Controlador de Posts
router.post('/recommendation', initRecommendation)
router.get('/', getPosts)

export default router;