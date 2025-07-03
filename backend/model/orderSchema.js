const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  orderBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  fullName: String,
  email: String,
  address: String,
  pincode: String,
 cart: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      quantity: Number
    }
  ],
  totalAmount: Number,
 paymentMethod: {
  type: String,
  default: "COD",
},
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
