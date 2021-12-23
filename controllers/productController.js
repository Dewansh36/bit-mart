const Product=require('../models/productModel')
const User=require('../models/user');
const Apperror=require('../utils/errorClass')
const Features=require('../utils/features')
const catchAsyncerror=require('../middleware/catchAsyncerror')
const multer=require('multer');

exports.renderCreate=(req, res, next) => {
  res.render('products/sell');
}

exports.renderEdit=async (req, res, next) => {
  let { id }=req.params;
  const product=await Product.findById(id);
  res.render('products/edit', { product });
}

exports.createProduct=catchAsyncerror(async (req, res, next) => {
  // console.log(req.body, req.files);
  try {
    const product=new Product(req.body);
    product.creator=req.user.id;
    const user=await User.findById(req.user.id);
    for (let file of req.files) {
      let obj={
        url: file.path,
        public_id: file.filename
      }
      product.images.push(obj);
    }
    await product.populate('creator');
    user.products.push(product);
    await product.save();
    await user.save();
    console.log(user, product);
    req.flash('success', 'Product Created!');
    res.redirect(`/products/${product.id}`, { product });
    // res.status(201).json({
    //   success: true,
    //   product,
    // })
  }
  catch (err) {
    req.flash('error', err.message);
    res.redirect('/products/new');
  }
});

exports.getAllProducts=catchAsyncerror(async (req, res, next) => {
  const resultperpage=5
  const features=new Features(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultperpage)
  const product=await features.query

  if (!product) {
    return next(new Apperror('Product not found', 404))
  }
  // res.redirect('/products', { product });
  res.status(200).json({
    success: true,
    product,
  })
})

exports.getProductDetails=catchAsyncerror(async (req, res, next) => {
  const product=await Product.findById(req.params.id)
    .populate({
      path: 'reviews',
      populate: {
        path: 'creator'
      }
    })
    .populate('creator');
  if (!product) {
    return next(new Apperror('Product not found', 404))
  }
  res.render('products/view', { product });
  // res.status(200).json({
  //   success: true,
  //   product,
  // })
});

exports.updateProduct=catchAsyncerror(async (req, res, next) => {
  try {
    let product=await Product.findById(req.params.id)
    if (!product) {
      return next(new Apperror('Product not found', 404))
    }
    product=await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })

    if (!product) {
      return next(new Apperror('Product not found', 404))
    }
    for (let file of req.files) {
      let obj={
        url: file.path,
        public_id: file.filename
      }
      product.images.push(obj);
    }
    if (req.body.deleteImages) {
      for (let img of req.body.deleteImages) {
        for (let i=0; i<product.images.length; i++) {
          if (product.images[i].public_id==img) {
            product.images.splice(i, 1);
            break;
          }
        }
      }
      await product.save();
    }
    req.flash('success', 'Successfully Updated Product!');
    res.redirect(`/products/${product.id}`, { product });

    // res.status(200).json({
    //   success: true,
    //   product,
    // })
  }
  catch (err) {
    req.flash('error', err.message);
    res.redirect(`/products/${req.params.id}/edit`);
  }
});

exports.deleteProduct=catchAsyncerror(async (req, res, next) => {
  const product=await Product.findById(req.params.id)
  const user=await User.findById(req.user.id)
    .populate('products');
  if (!product) {
    return res.status(500).json({
      success: false,
      message: 'Product does not exist',
    })
  }
  for (let i=0; i<user.products.length; i++) {
    if (user.products[i].id==product.id) {
      user.products.splice(i, 1);
      break;
    }
  }
  await user.save();
  await product.remove();
  req.flash('success', 'Product Deleted Successfully!');
  res.redirect('/');
  // res.status(200).json({
  //   success: true,
  //   message: 'Product deleted successfully',
  // })
})
