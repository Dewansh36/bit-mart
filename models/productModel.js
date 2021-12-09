const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter product name'],
  },
  description: {
    type: String,
    required: [true, 'Please enter product description'],
  },
  price: {
    type: Number,
    required: [true, 'Please enter product price'],
  },
  rating: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, 'Please enter product category'],
  },
  quantity: {
    type: Number,
    required: [true, 'Please enter product quantity'],
    default: 1,
  },
  noOfReviews: {
    type: Number,
    default: 0,
  },
  Reviews: [{
     name:{
        type:String,
        required:true,
     },
     rating:{
        type:Number,
        required:true
     },
     comment:{
        type:String,
        required:true
     },
     createdAt:{
        type:Date,
        default:Date.now
     },
     user:{
       type:mongoose.Schema.ObjectId,
       ref:"User"
     }
  }],
})

module.exports = mongoose.model("Products",productSchema)
