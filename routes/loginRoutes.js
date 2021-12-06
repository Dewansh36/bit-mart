const express=require('express');
const app=express();
const passport=require('passport');
const router=express.Router();
const login=require('../controllers/loginController');


router.route('/signin')
    .get(login.renderSignin);

router.route('/login')
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/signin' }), login.login);

router.route('/register')
    .post(login.register);

router.route('/logout')
    .get(login.logout);

module.exports=router;

