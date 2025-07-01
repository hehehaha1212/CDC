//all routes for admin

import express from 'express'
import { protect, requireRole } from '../middleware/auth';

const router = express.Router;

const sendPaymentAcceptedMail=(email,username)=>{}

//router.get('/profile',getAdminprofile); show admin(self) profile
//router.put('/profile',getAdminprofile); update admin(self) profile


router.get('/users', protect, requireRole('admin'), getAllUser);

router.post('/users',protect, createUser);

router.put('/users/:userID',getUserPofile);

router.delete('/users/:userID',deleteUser);

router.get('/teams',getAllTeams)

router.get('teams/:teamID', getTeam);

router.put('/teams/:teamID', updateTeam);

router.delete('/teams/:teamID',deleteTeam);

router.put('/teams/:teamID/payment', updatePaymentStatus);