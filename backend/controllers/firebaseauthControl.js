import { User } from '../models/user.js';
import { auth } from '../configs/configs.js'; // firebase-admin auth object

// Register/Login using Firebase Token
export const verifyFirebaseUser = async (req, res) => {
  const { firebaseToken } = req.body;

  if (!firebaseToken) {
    return res.status(400).json({ message: 'Firebase token is required' });
  }

  try {
    // Verify the token with Firebase Admin SDK
    const decodedUser = await auth.verifyIdToken(firebaseToken);

    const { email, name, uid } = decodedUser;

    // Check if user exists in DB
    let user = await User.findOne({ email });

    if (!user) {
      // Create user in MongoDB if not exists
      user = await User.create({
        username: name || email.split('@')[0],
        email,
        firebaseUID: uid,
        isActive: true,
        role: 'user',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'User verified successfully',
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Firebase auth error:', error);
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired Firebase token',
    });
  }
};

// For testing protected routes
export const getProfile = async (req, res) => {
  try {
    // req.user will be attached by middleware after token verification
    const user = await User.findOne({ email: req.user.email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({
      success: true,
      message: 'User profile fetched',
      user,
    });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};
