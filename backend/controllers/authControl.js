//register, login, profile, changepass
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import validationResult  from 'express-validation';
import {User} from '../models/models.js';

//signup, takes minimal data for setup
export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Input validation
    if (username.split(' ').length < 2 || username.split(' ')[0].length < 2) {
      return res.status(400).send('First name should be at least 2 characters long');
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      return res.status(400).send('Invalid email format');
    }
    if (password.length < 8) {
      return res.status(400).send('Password should be at least 8 characters long');
    }
    
        const existinguser = await User.findOne({ email });
        if (existinguser) {
            return res.status(400).json(
                {
                    message: "user already exists"
                })
        };
        const salt = await bcrypt.genSalt(10);
        const hashedpassword = await bcrypt.hash(password, salt);

        const user = new User({
            username,
            email,
            password: hashedpassword,
            isActive: true,
            role:user,
        });

        res.status(200).json({
            success: true,
            message: "user created",
        });

    }catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error during registration'
        });
    }
}

export const login = async (req, res, next) => {
    try {
        const { email, password, username } = req.body;

        // Find user by email
        const user = await User.findOne({$or:[ {email},{username}]});
        if (!user) {
            return res.status(401).json({
                message: 'Invalid credentials'
            });
        }

        // Check if user is active
        if (!user.isActive) {
            return res.status(401).json({
                message: 'Account is deactivated, contact admin'
            });
        }

        // Validate password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                message: 'Invalid credentials'
            });
        }
        // Generate JWT token iwth only user id as payload, will use later to get other data, maybe?
        const token = jwt.sign(
            { id: user._id ,
              role:user.role,
            },
            process.env.JWT_SECRET,
            { expiresIn: '10d' }
        );
        res.json({
            success: true,
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                phone:user.phone,
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            message: 'error during login'
        });
    }
};

export const changepassword = async (req, res, next) => {
    try {

        const { username, currentPassword, newPassword } = req.body;

        // Get user with password
        const user = await User.findById(req.user.id).select('+password');

        // Verify current password
        const isMatch = await bcrypt.compare(currentPassword, user.password);

        if (!isMatch) {
            return res.status(400).json({
                message: 'invalid creds'
            });
        }
        
        // Hash new password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);

        await user.save();

        res.json({
            success: true,
            message: 'success'
        });

    } catch (error) {
        console.error('error:', error);
        res.status(500).json({
            message: 'Server error'
        });
    }
};
