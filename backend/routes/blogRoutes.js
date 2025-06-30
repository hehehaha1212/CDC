

import express from 'express';
import { blogownership, protect } from '../middleware/auth.js';
import {
  createBlog,
  updateBlog,
  deleteBlog,
  getBlogById,
  getBlogsByUser
} from '../controllers/blogControl.js';

const router = express.Router();


router.get('/', (req, res) => {
  res.send('blog base route working');
});

// Create blog (protected)
router.post('/', protect, createBlog);

// Update blog (protected, ownership)
router.put('/:id', protect, blogownership, updateBlog);

// Delete blog (protected, ownership)
router.delete('/:id', protect, blogownership, deleteBlog);

// Get blog by id (public)
router.get('/:id', getBlogById);

// Get blogs by user (public)
router.get('/user/:userId', getBlogsByUser);

export default router;


