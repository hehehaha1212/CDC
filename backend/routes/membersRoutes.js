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

//get member data and their blogs, maybe break these into two
router.get('/:memberID',getMember)

// Create blog (protected)
router.post('/:memberID', protect, createBlog);

// Get blog by user (public)
router.get('/:memberID/:blogID', getBlog);

// Update blog (protected, ownership)
router.put('/:memberID/:blogID', protect, blogownership, updateBlog);

// Delete blog (protected, ownership)
router.delete('/:memberID/:blogID', protect, blogownership, deleteBlog);

export default router;


