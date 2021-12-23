const express=require('express');
const router=express.Router({ mergeParams: true });
const checkLogin=require('../middleware/checkLogin');
const checkAuth=require('../middleware/checkUserAuth');
const catchAsync=require('../middleware/catchAsyncerror');
const cartController=require('../controllers/cartController');

router.route('/')
    .get(checkLogin, catchAsync(cartController.viewCart));

router.route('/:id')
    .get(checkLogin, catchAsync(cartController.addProduct))
    // .get(checkLogin, (req, res) => {
    //     console.log(req.params, req.query);
    //     res.send('Ok!');
    // })
    .delete(checkLogin, catchAsync(cartController.removeProduct));

module.exports=router;