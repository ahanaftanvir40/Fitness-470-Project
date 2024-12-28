import express from 'express';
import { getTips } from '../controllers/healthtipsController.js';
const router = express.Router();


router.get('/getTips', getTips)

export default router;