//home page will display eventts 
import express  from 'express';
//import eventHome from '../controller/events';

const router =express.Router();

//i  think all of home page can be managed in the frontend
//some events details only would have to be shown and that can be strored in the frontemd

router.get('/event',eventHome);

router.get("/feedback",feedback);

router.get("/contactus",contactUs);

export default router;