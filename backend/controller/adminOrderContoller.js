const Order = require("../model/orderSchema");
const User = require("../model/userSchema");

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("orderBy", "username email") 
      .sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch orders", error: err.message });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await Order.findById(orderId)
      .populate("orderBy", "username email")
      .populate("cart.productId", "name image price")

    console.log("orders"+ order)

    if (!order) return res.status(404).json({ message: "Order not found" });

    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ message: "Error fetching order", error: err.message });
  }
};
