import express from 'express';
import { protect } from '../middleware/firebaseauthmiddleware.js';
import {
  verifyFirebaseUser,
  getProfile,
} from '../controllers/firebaseauthControl.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Firebase auth base route working');
});

// Main route: receives Firebase ID token from frontend
router.post('/verify-token', verifyFirebaseUser);

// Protected route for user profile
router.get('/profile', protect, getProfile);

export default router;
