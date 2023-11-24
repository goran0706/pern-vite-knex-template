import express from 'express';
import userController from '../user/userController';
import authController from './authController';

const router = express.Router();

router.post('/auth/signup', userController.createUser);
router.post('/auth/signin', authController.signIn);
router.get('/auth/logout', authController.signOut);

export default router;
