import express from 'express'
import { requireRole } from '../middleware/auth.js';
import { protect } from '../middleware/firebaseauthmiddleware.js'
import {
    getAllTeams,
    getAllUser,
    createUser,
    deleteUser,
    getUserPofile,
    getTeam,
    updateTeam,
    deleteTeam,
    addmember,
    getAllMember,
    deleteMember
} from "../controllers/adminControl.js"

const router = express.Router();

//const sendPaymentAcceptedMail=(email,username)=>{}

//router.get('/profile',getAdminprofile); show admin(self) profile
//router.put('/profile',getAdminprofile); update admin(self) profile


router.get('/', (req, res) => {
  res.send('admin base route working');
});

router.get('/users', getAllUser);

router.post('/users',protect, requireRole('admin'), createUser);

router.put('/users/:userID', requireRole('admin'),getUserPofile);

router.delete('/users/:userId',protect, requireRole('admin'),deleteUser);

router.get('/teams',getAllTeams)

router.get('teams/:id', requireRole('admin'), getTeam);

router.put('/teams/:id',  requireRole('admin'),updateTeam);

router.delete('/teams/:id', requireRole('admin'),deleteTeam);

//router.put('/teams/:teamID/payment', requireRole('admin'), updatePaymentStatus);

router.get('/members', getAllMember)

router.post('/members', addmember)

router.delete('/members/:id',protect, requireRole("admin"),deleteMember);

export default router;