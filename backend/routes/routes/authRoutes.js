import express from 'express';
//import { validationResult, body } from 'express-validator';
import { protect } from '../../middleware/auth';
import { register,profile,changepassword,login } from '../../controllers/authControl';

const router = express.Router();
//for validation
/*const validate = (req, res, next)=>{
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({errors:error.array()});
    }next();
};*/

//user registers as member or admin
router.post('/register',  register);

//user login
router.post('/login', login);


//get user profile
router.get('/profile', protect, profile);

//change password
router.put('/change-password', protect, changepassword);

export default router;