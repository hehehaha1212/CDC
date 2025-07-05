import express from 'express'
import { protect, requireRole } from '../middleware/auth.js';


const router = express.Router();

//const sendPaymentAcceptedMail=(email,username)=>{}

//router.get('/profile',getAdminprofile); show admin(self) profile
//router.put('/profile',getAdminprofile); update admin(self) profile


router.get('/users', protect, requireRole('admin'), getAllUser);

router.post('/users',protect, requireRole('admin'), createUser);

router.put('/users/:userID', requireRole('admin'),getUserPofile);

router.delete('/users/:userID', requireRole('admin'),deleteUser);

router.get('/teams', requireRole('admin'),getAllTeams)

router.get('teams/:teamID', requireRole('admin'), getTeam);

router.put('/teams/:teamID',  requireRole('admin'),updateTeam);

router.delete('/teams/:teamID', requireRole('admin'),deleteTeam);

router.put('/teams/:teamID/payment', requireRole('admin'), updatePaymentStatus);