import express from 'express';
import  body from 'express-validator';
import { checkownership } from '../middleware/auth.js';
import { protect, validate } from '../middleware/auth.js';
import {
  createBlog,
  updateBlog,
  deleteBlog,
  getBlogById,
  getAllBlogs
} from '../controllers/blogController.js';

const router = express.Router();

//create blog
//owner/admin

router.post('/',
  protect,checkownership,createBlog);

//updateblog
//owner/admin
router.put('/:id', protect, checkownership, updateBlog);

//delte
//owner/admin
router.delete('/:id/delete', protect, checkownership, deleteBlog);
router.get('/:id', getBlogById);
router.get('/', getAllBlogs);

export default router;
