import express from 'express';
import userRoutes from './routes/userroutes.js';
import homeRoutes from './routes/homeroute.js';
import blogRoutes from './routes/blogroutes.js';
import authRoutes from './routes/authroutes.js';

const router = express.Router();

// User routes
router.use('/user', userRoutes);

// Home routes
router.use('/home', homeRoutes);

// Blog routes
router.use('/blog', blogRoutes);

// Auth routes
router.use('/auth', authRoutes);

export default router;