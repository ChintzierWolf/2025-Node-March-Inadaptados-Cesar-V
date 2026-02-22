import express from 'express';

import userRoutes from './userRoutes.js';
import authRoutes from './authRoutes.js';
import teamRoutes from './teamRoutes.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/teams', teamRoutes);

export default router;