import express from 'express';
import { SignUp, SignIn , GetUserProfile } from '../controllers/userController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/signup', SignUp);
router.post('/signin', SignIn);
router.get('/profile' , authMiddleware, GetUserProfile)

export default router;