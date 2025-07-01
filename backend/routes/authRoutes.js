/*
all authentication related routes
user signin- db entry,
login- they get token with role and their id
forget password-confirms identity thourgh mailed otp
change password- confirms using old password
*/


/* pura change kar lene */
import express from 'express';
import { protect } from '../middleware/auth.js'
import { 
    register,
    changepassword,
    login } 
   from '../controllers/authControl.js'
const router = express.Router();
//for validation
/*const validate = (req, res, next)=>{
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({errors:error.array()});
    }next();
};*/


router.get('/', (req, res) => {
  res.send('auth base route working');
});

//user registers as member or admin
router.post('/register',  register);

//user login
router.post('/login', login);

//router.get('/forget-password',forgetpassword)

//change password
router.put('/change-password', protect, changepassword);


const authRouter= router;
export default authRouter;