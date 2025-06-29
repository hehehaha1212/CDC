import express from 'express';
import userRoutes from './routes/userRoutes.js';
//import homeRoutes from './routes/homeRoute.js';
import blogRoutes from './routes/blogRoutes.js';
import authRoutes from './routes/authRoutes.js';
//import adminRoutes from './routes/adminRoutes.js'
const router = express.Router();

router.use('/user', userRoutes);

//router.use('/home', homeRoutes);

router.use('/blog', blogRoutes);

router.use('/auth', authRoutes);

//router.use('/admin', adminRoutes);

export default router;