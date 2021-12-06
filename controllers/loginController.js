const User=require('../models/user');
const passport=require('passport');
const express=require('express');

module.exports.renderSignin=(req, res) => {
    res.render('user/login');
}

module.exports.register=async (req, res, next) => {
    try {
        console.log(req.body);
        // res.send(req.body);
        const user=new User(
            {
                name: req.body.name,
                email: req.body.email,
                roll: req.body.roll
            }
        );

        // res.send(user);
        const regUser=await User.register(user, req.body.password);

        // console.log(regUser);
        // res.send(regUser);

        req.logIn(regUser, (err) => {
            if (err) {
                console.log(err);
                req.flash('error', err.message);
                res.redirect('/signin');
            }
        });
        req.flash('success', 'Successfully Registered!');
        const curUser=regUser;
        // console.log(curUser);
        res.send(curUser);
        // res.render('selectPage', { curUser });
    }
    catch (err) {
        console.log(err);
        req.flash('error', err.message);
        res.redirect('/signin');
    }
}

module.exports.login=(req, res, next) => {

    const curUser=req.user;
    // console.log(curUser);
    res.send(curUser);
    // res.render('selectPage', { curUser });
}

module.exports.logout=(req, res, next) => {
    req.logOut();
    req.flash('success', 'Aloha! See You Soon');
    res.redirect('/');
}