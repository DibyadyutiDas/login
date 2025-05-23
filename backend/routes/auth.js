import express from 'express';
import * as authController from '../controllers/authController.js';

const router = express.Router();

// Public routes
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password/:token', authController.resetPassword);

// Protected routes
router.use(authController.protect); // Apply middleware to all routes below
router.get('/me', authController.getMe);
router.patch('/update-password', authController.updatePassword);

export default router;