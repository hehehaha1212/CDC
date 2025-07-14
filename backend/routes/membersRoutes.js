import express from 'express';
import { blogownership, protect, requireRole } from '../middleware/auth.js';
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
router.get('/:id',getMember)

//update member data in member profile
router.put('/:id',protect, requireRole(admin,member) ,updateMember)

// Get blog by user (public)
router.get('/:id/:blogID', getBlog);

// Create blog (protected)
router.post('/:id', protect, createBlog);

// Update blog (protected, ownership)
router.put('/:id/:blogID', protect, blogownership, updateBlog);

// Delete blog (protected, ownership)
router.delete('/:id/:blogID', protect, blogownership, deleteBlog);

export default router;



