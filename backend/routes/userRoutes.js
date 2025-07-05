import express from 'express';
import {
  deactivateUser,
  teamDashboard,
  userDashboard,
  updateProfile,
 // getUserProfile
} from '../controllers/userControl.js'
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('User base route working');
});

// Get user profile/dashboard
router.get('/dashboard', protect, userDashboard);

// Update user profile
router.put('/dashboard', protect, updateProfile);

// Get  their current team data
router.get('/team/:id', teamDashboard);

//make changes in their team,
//router.put('/team/:id',updateteam)

// maybe in home route
//router.post('/feedback',feedback)

//deactivate account
router.delete('/:id', protect, deactivateUser)

export default router;