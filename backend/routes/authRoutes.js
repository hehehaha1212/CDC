import express from 'express';
import { protect } from '../middleware/auth.js'
import { 
    register,
    changepassword,
    login, 
    googleLogin,
    githubLogin} 
   from '../controllers/authControl.js'
const router = express.Router();

router.get('/', (req, res) => {
  res.send('auth base route working');
});

//user registers as member or admin
router.post('/register',  register);

//user login
router.post('/login', login);

//google login signup
router.get('/login/google', googleLogin);

//github login signup
router.post('/auth/github', githubLogin);

//router.get('/forget-password',forgetpassword)

//change password
router.put('/change-password', protect, changepassword);


const authRouter= router;
export default authRouter;