//register, login, profile, changepass
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import {User} from '../models/models.js';
import cookieParser from "cookie-parser";

export const register = async (req, res) => {
  try {
    const { username, email, password, phone, rollno  } = req.body;

    if (!username || username.trim().length < 2 || username.split(' ')[0].length < 2) {
      return res.status(400).json({ message: 'First name should be at least 2 characters long' });
    }

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    if (!password || password.length < 8) {
      return res.status(400).json({ message: 'Password should be at least 8 characters long' });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      username,
      email,
      password: hashedPassword,
      isActive: true,
      role: 'user',
      phone,
      rollno
    });

    await user.save();

    return res.status(201).json({
      success: true,
      message: 'User created successfully',
    });

  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error during registration',
      error: error.message || error,
    });
  }
};


export const login = async (req, res, next) => {
    try {
        const { email, password, username } = req.body;

        const user = await User.findOne({$or:[ {email},{username}]}).select('+password');
        if (!user) {
            return res.status(401).json({
                message: 'Invalid credentials'
            });
        }
        if (!user.isActive) {
            return res.status(401).json({
                message: 'Account is deactivated, contact admin'
            });
        }
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                message: 'Invalid credentials'
            });
        }
        const token = jwt.sign(
            { id: user._id ,
              role:user.role,
            },
            process.env.JWT_SECRET,
            { expiresIn: '10d' }
        );
        res.cookie("access_token", token, {
            httpOnly: true,                   
            secure: false,                   
            sameSite: "lax",              
            maxAge: 1000 * 60 * 60 * 24 * 2,
        }).json({
            success: true,
            message: 'Login successful',
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
            message: 'error during login',
            error: error.message || error,
        });
    }
};

export const changepassword = async (req, res, next) => {
    try {
        const { email, currentPassword, newPassword } = req.body;
        const user = await User.findById(req.user.id).select('+password');

        if(email!==user.email){
            return res.status(400).json({
                status:fail,
                message:'invalid creds1'
            })
        }

        const isMatch = await bcrypt.compare(currentPassword, user.password);

        if (!isMatch) {
            return res.status(400).json({
                message: 'invalid creds2'
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
