import express from 'express'
import {
    register,
    login,
    forgotPassword,
    resetPassword,
    deactivateAccount,
    reactivateAccount
} from '../controllers/auth.controller.js'
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);

router.post('/deactivate', protect, deactivateAccount);
router.post('/reactivate', reactivateAccount);

export default router;