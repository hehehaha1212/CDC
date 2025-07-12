import express from 'express';
import { protect } from '../middleware/firebaseauthmiddleware.js';
import {
  
  getProfile,
  loginWithFirebase,
  registerWithFirebase,
} from '../controllers/firebaseAuthControl.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Firebase auth base route working');
});

// Main route: receives Firebase ID token from frontend
// router.post('/verify-token', verifyFirebaseUser);

// Protected route for user profile
router.get('/profile', protect, getProfile);

router.post('/register', registerWithFirebase);

router.post('/login', loginWithFirebase)

const firebaseAuthRouter = router;
export default firebaseAuthRouter;
