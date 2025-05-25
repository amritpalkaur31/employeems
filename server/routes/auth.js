// routes/auth.js
import express from 'express';
import { login, verify } from '../controllers/authController.js';
import authMiddleware from '../middleware/authMiddleware.js'

const router = express.Router();

// ✅ Use '/login' not './login'
router.post('/login', login)
router.get('/verify', authMiddleware, verify)

export default router;
