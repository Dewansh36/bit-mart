const Order = require("../models/orderModel")
const Product = require('../models/productModel')
const Apperror = require('../utils/errorClass')
const catchAsyncerror = require('../middleware/catchAsyncerror')

exports.newOrder = catchAsyncerror( async (req,res,next)=>{
   const {
      shippingInfo,
      orderItems,
      paymentInfo,
      itemsPrice,
      totalPrice
   } = req.body

   const order = await Order.create({
     shippingInfo,
     orderItems,
     paymentInfo,
     itemsPrice,
     totalPrice,
     paidAt: Date.now(),
     user: req.user._id
   });

   res.status(201).json({
      success:true,
      order
   })
})

exports.myOrders = catchAsyncerror( async (req,res,next)=>{
   const orders = await Order.find({user: req.user._id})

   res.status(200).json({
      success:true,
      orders
   })
})