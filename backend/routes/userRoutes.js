/*
 a;; the things a user can do, before and after login
 (*)-login required
 get all member
 *userdashboard
 *updateprofile
 *teamdashboard
*/

//imports
import express from 'express';
import multer from 'multer';
import {
  deactivateUser,
  teamDashboard,
  userDashboard,
  updateProfile,
  getAllMember,
 // getUserProfile
} from '../controllers/userControl.js'
import { protect } from '../middleware/auth.js';

const router = express.Router();

/*
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
*/
router.get('/', (req, res) => {
  res.send('User base route working');
});

// Get all members
router.get('/members', getAllMember);

// Get user profile/dashboard
router.get('/:id', userDashboard);

// Update user profile
router.put('/:id', protect, updateProfile);

//maybe team should have its own saparate routes,
//like delete member, add member, change teamname,maybe maybe

// Get  their current team data
router.get('/team/:id', teamDashboard);

//make changes in their team,
router.put('/team/:id',updateteam)

// maybe in home route
router.post('/feedback',feedback)

router.delete('/:id', protect, deactivateUser)

export default router;