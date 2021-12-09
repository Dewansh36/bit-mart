const Product = require('../models/productModel')
const Apperror = require('../utils/errorClass')
const Features = require('../utils/features')
const catchAsyncerror = require('../middleware/catchAsyncerror')

exports.createProduct = catchAsyncerror(async (req, res, next) => {
  console.log(req.user)
  req.body.user = req.user.id;
  const product = await Product.create(req.body)
  await product.save();
  res.status(201).json({
    success: true,
    product,
  })
})

exports.getAllProducts = catchAsyncerror(async (req, res, next) => {
  const resultperpage = 5
  const features = new Features(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultperpage)
  const product = await features.query

  if (!product) {
    return next(new Apperror('Product not found', 404))
  }
  res.status(200).json({
    success: true,
    product,
  })
})

exports.getProductDetails = catchAsyncerror(async (req, res, next) => {
  const product = await Product.findById(req.params.id)
  if (!product) {
    return next(new Apperror('Product not found', 404))
  }
  res.status(200).json({
    success: true,
    product,
  })
})

exports.updateProduct = catchAsyncerror(async (req, res, next) => {
  let product = await Product.findById(req.params.id)
  if (!product) {
    return next(new Apperror('Product not found', 404))
  }
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  })

  if (!product) {
    return next(new Apperror('Product not found', 404))
  }
  res.status(200).json({
    success: true,
    product,
  })
})

exports.deleteProduct = catchAsyncerror(async (req, res, next) => {
  const product = await Product.findById(req.params.id)
  if (!product) {
    return res.status(500).json({
      success: false,
      message: 'Product doesnot exist',
    })
  }
  await product.remove()
  res.status(200).json({
    success: true,
    message: 'Product deleted successfully',
  })
})
