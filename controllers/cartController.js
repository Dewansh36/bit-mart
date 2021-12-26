const express=require('express');
const User=require('../models/user');
const Cart=require('../models/cartModel');
const Product=require('../models/productModel');

module.exports.addProduct=async (req, res, next) => {
    let { id }=req.params;
    let { quantity }=req.query;
    if (quantity==undefined) {
        quantity=1;
    }
    const user=await User.findById(req.user.id)
        .populate('cartItems');
    const product=await Product.findById(id);
    if (quantity<1) {
        req.flash('error', 'Please Select Product Quantity');
        res.redirect(`/products/${id}`);
    }
    else if (quantity>product.quantity) {
        req.flash('error', 'Please Select Lesser Quantity');
        res.redirect(`/products/${id}`);
    }
    else {
        const item=new Cart({
            cartItem: product,
            quantity: quantity
        });
        let flag=false;
        for (let carti of user.cartItems) {
            if (carti.cartItem.id==item.cartItem.id) {
                carti.quantity+=item.quantity;
                flag=true;
                await carti.save();
                break;
            }
        }
        if (flag==false) {
            await item.save();
            user.cartItems.push(item);
        }
        // console.log(item, user, product);
        // res.send('Ok!');
        await user.save();
        req.flash('success', 'Product Successfully Added to the Cart');
        res.redirect(`/products/${id}`);
    }
}

module.exports.removeProduct=async (req, res, next) => {
    let { id }=req.params;
    const user=await User.findById(req.user.id)
        .populate('cartItems');
    const item=await Cart.findById(id)
        .populate('cartItem');
    const product=await Product.findById(item.cartItem.id);
    for (let i=0; i<user.cartItems.length; i++) {
        if (user.cartItems[i].id==item.id) {
            user.cartItems.splice(i, 1);
            break;
        }
    }
    await Cart.findByIdAndDelete(id);
    // console.log(item, user, product);
    await user.save();
    await product.save();
    req.flash('success', 'Product Successfully Removed From Cart');
    res.redirect('/cart');
}

module.exports.viewCart=async (req, res, next) => {
    const curUser=await User.findById(req.user.id)
        .populate({
            path: 'cartItems',
            populate: {
                path: 'cartItem',
                populate: {
                    path: 'images'
                }
            }
        });
    // console.log(curUser.cartItems[0].cartItem.images[0]);
    // for (let items of curUser.cartItems) {
    //     console.log(items);
    //     for (let pic of items.images) {
    //         console.log(pic);
    //     }
    // }
    // res.send('Ok!');
    res.render('cart/cart', { curUser });
}

