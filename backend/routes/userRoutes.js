/**
 get all member
 userdashboard
 updateprofile
 teamdashboard
 uploadprofileimage
 get userblog
 deleteuserblog
 
*/

//imports
import express from 'express';
import multer from 'multer';
import {
  deleteUserBlog,
  getUserBlogs,
  teamDashboard,
  uploadProfileImage,
  userDashboard,
  updateProfile,
  getAllMember,
 // getUserProfile
} from '../controllers/userControl.js'
import { protect } from '../middleware/auth.js';

const router = express.Router();

// memory storage config for multer, to be done before cloudinary upload
const upload = multer({
  storage: multer.memoryStorage(), // fixed typo
  limits: {
    fileSize: 5 * 1024 * 1024
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } 
    else {
      cb(new Error('Only image files are allowed'), false);
    }
  }
});

router.get('/', (req, res) => {
  res.send('User base route working');
});

// Get all members
router.get('/members', getAllMember);

// Get user profile/dashboard
router.get('/:id', userDashboard);

// Update user profile
router.put('/:id', protect, updateProfile);

// Get team data
router.get('/team/:id', teamDashboard);

// Upload image
router.post('/:id/upload-avatar', protect, upload.single('avatar'), uploadProfileImage);

// Get user blogs
router.get('/:id/blogs', getUserBlogs);

// Delete user
router.delete('/:id', protect,deleteUserBlog);

export default router;