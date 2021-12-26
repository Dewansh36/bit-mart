const mongoose=require("mongoose");

const orderSchema=new mongoose.Schema({
  shippingInfo: {
    HostelNumber: {
      type: String,
      required: true,
    },
    RoomNumber: {
      type: String,
      required: true
    },
    phoneNo: {
      type: Number,
      required: true,
    },
  },
  orderItem: {
    type: mongoose.Schema.ObjectId,
    ref: 'Products',
    required: true
  },
  orderStatus: {
    type: String,
    default: "Processing",
  },
  deliveredAt: Date,
  createdAt: {
    type: Date,
    default: Date.now()
  }
}
);

module.exports=mongoose.model("Order", orderSchema)