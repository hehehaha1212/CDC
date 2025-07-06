import express from 'express';
import { blogownership, protect } from '../middleware/auth.js';
import {
  getMember,
  listMembers,
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog,
} from '../controllers/memberControl.js';

const router = express.Router();

//get all member all member of that year
router.get('/', listMembers);

//get member data and their blogs, maybe break these into two
router.get('/:memberID',getMember)

// Get blog by user (public)
router.get('/:memberID/:blogID', getBlog);

// Create blog (protected)
router.post('/:memberID', protect, createBlog);

// Update blog (protected, ownership)
router.put('/:memberID/:blogID', protect, blogownership, updateBlog);

// Delete blog (protected, ownership)
router.delete('/:memberID/:blogID', protect, blogownership, deleteBlog);

export default router;


