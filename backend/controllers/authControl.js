//register, login, profile, changepass
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User } from '../models/user.js';
import cookieParser from "cookie-parser";
import { OAuth2Client } from 'google-auth-library';
import axios from 'axios'

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
            phone,
            rollno,
            password: hashedPassword,
            isActive: true,
            role: 'user',
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

        const user = await User.findOne({ $or: [{ email }, { username }] }).select('+password');
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
            {
                id: user._id,
                role: user.role,
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
                phone: user.phone,
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

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleLogin = async (req, res) => {
    const { token } = req.body;
    try {

        const ticket = await googleClient.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID
        });
        const payload = ticket.getPayload();

        let user = await User.findOne({ email: payload.email });
        if (!user) {
            user = await User.create({
                username: payload.name,
                email: payload.email,
                password: '',
                isActive: true,
                role: 'user'
            });
        }
        const appToken = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '10d' }
        );

        res.cookie('access_token', appToken, {
            httpOnly: true,
            sameSite: 'lax',
            maxAge: 1000 * 60 * 60 * 24 * 2
        }).json({
            success: true,
            message: 'Google login successful',
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });
    } catch (err) {
        console.error('Google auth error:', err);
        res.status(401).json({ message: 'Invalid Google token' });
    }
};


export const changepassword = async (req, res, next) => {
    try {
        const { email, currentPassword, newPassword } = req.body;
        const user = await User.findById(req.user.id).select('+password');

        if (email !== user.email) {
            return res.status(400).json({
                status: fail,
                message: 'invalid creds1'
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


export const githubLogin = async (req, res) => {
    const { code } = req.body;
    try {
        const tokenRes = await axios.post('https://github.com/login/oauth/access_token', {
            client_id: process.env.GITHUB_CLIENT_ID,
            client_secret: process.env.GITHUB_CLIENT_SECRET,
            code
        }, {
            header: { accept: 'application/json' }
        });

        const access_token = tokenRes.data.access_token;
        if (!access_token) {
            return res.status(401).json({
                success: false,
                message: 'invalid github code'
            })
        }
        const userRes = await axios.get('https:/api.github.com/user/user', {
            headers: { Authorization: `token ${access_token}` }
        });

        const emailRes = await axios.get('https:/api.github.com/user/emails', {
            headers: { Authorization: `token ${access_token}` }
        });

        const githubData = userRes.data;
        const primaryEmailObj = emailRes.data.find(e => e.primary) || emailRes.data[0];

        const email = primaryEmailObj.email;
        const username = githubData.login;

        let user = User.findOne({ email })
        if (!user) {
            user = await User.create({
                username: username,
                email: email,
            });
        }
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '2d' }
        );

        res.cookie('access_token', token, {
            httpOnly: true,
            sameSite: 'lax',
            maxAge: 1000 * 60 * 60 * 24 * 2
        }).json({
            success: true,
            message: 'gitHub login successful',
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });

    } catch (error) {
        res.status(500).json({ message: 'github login failed' })
    }
}
