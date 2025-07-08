import express from 'express'
import { protect, requireRole} from '../middleware/auth'
import { teamDashboard } from '../controllers/userControl';
//import node mailer, to send mails 
const router = express.Router();

router.get('/',protect, teamDashboard);

router.post('/createTeam',protect,requireRole(leader), createTeam);

router.post('/addmember',protect,requireRole(leader),addMember);

router.put('/:teamID',protect,requireRole(leader), changeName);

router.put('/:teamID/:memberID',protect,requireRole(leader),updateMember);

router.get('/:teamID',protect, getTeamData);
