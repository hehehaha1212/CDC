import express from 'express';
import { blogownership } from '../../middleware/auth.js';
import { protect /*validate*/ } from '../../middleware/auth.js';
import {
  createBlog,
  updateBlog,
  deleteBlog,
  getBlogById,
  getBlogsByUser
} from '../../controllers/blogControl.js'

const router = express.Router();

//owner
router.post('/',protect,blogownership,createBlog);

//owner/admin
router.put('/:id', protect, blogownership, updateBlog);

//owner/admin
router.delete('/:id/delete', protect, blogownership, deleteBlog);

//all
router.get('/:id', getBlogById);
router.get('/', getBlogsByUser);

export default router;
