import express from 'express';
import authController from '../controllers/authController';
import { validRegister } from '../middleware/validation';

const router = express.Router();

router.post('/register', validRegister, authController.register);
router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.get('/refresh_token', authController.refreshToken);

export default router;
