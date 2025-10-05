import express from 'express';
import {getPosts, initPost, initRecommendation} from "../controllers/PostController.js";

const router = express.Router();

//Rutas del Controlador de Posts
router.post('/recommendation', initRecommendation)
router.post('/', initPost)
router.get('/', getPosts)

export default router;