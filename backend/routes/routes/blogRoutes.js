import express from 'express';
import  body from 'express-validator';
import { checkownership } from '../../middleware/auth.js';
import { protect, validate } from '../../middleware/auth.js';
import {
  createBlog,
  updateBlog,
  deleteBlog,
  getBlogById,
  getAllBlogs
} from '../controllers/blogController.js';

const router = express.Router();

//owner
router.post('/',protect,checkownership,createBlog);

//owner/admin
router.put('/:id', protect, checkownership, updateBlog);

//owner/admin
router.delete('/:id/delete', protect, checkownership, deleteBlog);

//all
router.get('/:id', getBlogById);
router.get('/', getAllBlogs);

export default router;
