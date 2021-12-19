const express=require('express');
const Review=require('../models/reviewModel');
const Product=require('../models/productModel');
const User=require('../models/user');
const Apprerror=require('../utils/errorClass');

module.exports.create=async (req, res, next) => {
    console.log(req.body, req.files);
    // res.send('ok!');
    let { id }=req.params;
    const review=new Review(req.body);
    review.creator=req.user.id;
    for (let file of req.files) {
        let img={
            public_id: file.filename,
            url: file.path,
        }
        review.images.push(img);
    }
    review.date=Date.now();
    const product=await Product.findById(id);
    if (product==undefined) {
        throw new Apprerror('Product Not Found', 404);
    }
    product.reviews.push(review);
    await review.save();
    await product.save();
    req.flash('success', 'Review Posted Successfully');
    res.redirect(`/products/${id}`);
}

module.exports.delete=async (req, res, next) => {
    let { id, rid }=req.params;
    const product=await Product.findById(id).populate('reviews');
    if (product==undefined) {
        throw new Apprerror('Product Not Found', 404);
    }
    for (let i=0; i<product.reviews.length; i++) {
        if (product.reviews[i].id==rid) {
            product.reviews.splice(i, 1);
            break;
        }
    }
    await Review.findByIdAndDelete(rid);
    await product.save();
    req.flash('success', 'Review Deleted Successfully!');
    res.redirect(`/products/${id}`);
}