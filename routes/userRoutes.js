const express=require('express');
const app=express();
const passport=require('passport');
const router=express.Router();
const user=require('../controllers/userController');

router.route('/:id')
    .get(user.profile)
    .put(user.edit)
    .delete(user.delete);

router.route('/:id/edit')
    .get(user.renderedit);

module.exports=router;