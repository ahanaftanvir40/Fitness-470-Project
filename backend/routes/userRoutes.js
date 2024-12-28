import express from 'express';
import { SignUp, SignIn , GetUserProfile , updateUser } from '../controllers/userController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/signup', SignUp);
router.post('/signin', SignIn);
router.get('/profile' , authMiddleware, GetUserProfile)
router.post('/updateUser' , authMiddleware, updateUser)

export default router;