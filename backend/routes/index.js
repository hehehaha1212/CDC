import express from 'express';
import userRoutes from './routes/userroutes.js';
import homeRoutes from './routes/homeroute.js';
import blogRoutes from './routes/blogroutes.js';
import authRoutes from './routes/authroutes.js';
import adminRoutes from './routes/adminroutes.js'
const router = express.Router();

router.use('/user', userRoutes);

router.use('/home', homeRoutes);

router.use('/blog', blogRoutes);

router.use('/auth', authRoutes);

router.use('/admin', adminRoutes);

export default router;