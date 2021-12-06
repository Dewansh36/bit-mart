const User=require('../models/user');
const passport=require('passport');
const express=require('express');

module.exports.profile=async (req, res, next) => {
    let { id }=req.params;
    const user=await User.findById(id)
        .populate('articles')
        .populate('orders');
    res.send(user);
}

module.exports.renderedit=async (req, res, next) => {
    let { id }=req.params;
    const user=await User.findById(id);
    console.log(user);
    res.render('user/edit', { user });
}

module.exports.edit=async (req, res, next) => {
    let { id }=req.params;
    const user=await User.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
    req.flash('success', 'Successfully Updated User Details!');
    res.redirect(`/`);
}

module.exports.delete=async (req, res, next) => {
    let { id }=req.params;
    await User.findByIdAndDelete(id);
    req.flash('success', 'Successfully Deleted User!');
    res.redirect('/');
}