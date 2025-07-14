import {Router} from 'express';
import {protect} from "../middleware/auth.js";
import{teamNameRegistration,getForm,teamInfo,updateMembers, teamDetails} from '../controllers/eventControls.js';
// const roleMiddleware = require('../middleware/role');

const router=Router();
router.get("/register",protect,getForm);
// router.post("/crateTeam",protect,roleMiddleware,teamNameRegistration); 
// router.post('/addMembers', authMiddleware, roleMiddleware('Team Leader'),addMembers);
// router.put('/:teamId', authMiddleware, roleMiddleware('Team Leader'), teamInfo);
// router.put('/members/:memberId', authMiddleware, roleMiddleware('Team Leader'),updateMembers);
// router.get('/:teamId', authMiddleware, teamDetails);

export default router;
