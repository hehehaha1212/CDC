//imports
import express from 'express';
import multer from 'multer';
import { deleteuserblog,
   getuserblogs,
   teamdashboard, 
   uploadprofileimage, 
   userDashboard } 
  from '../../controllers/userControl.js';
import { protect } from '../../middleware/auth.js';


const router= express.Router();

//memory storage config for multer, to be done before cloudinary upload
const upload = multer({
  Storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'), false);
    }
  }
});

//get user profile
router.get('/api/user/:id', userDashboard);

//get team data 
router.get('/api/team/:id',teamdashboard)

//upload image
router.post('/api/:id/upload-avatar', protect, upload.single('avatar'), uploadprofileimage);

//get user blogs
router.get('/api/:id/blogs', getuserblogs);

router.delete('/:id', protect, deleteuserblog);

export default router;