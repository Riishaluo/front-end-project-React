const Order = require('../model/orderSchema')


exports.getMyOrders = async (req, res) => {
  try {
    const userId = req.user.userId;
    const orders = await Order.find({ orderBy: userId })
      .populate("cart.productId")
      .exec();

    res.json(orders);
  } catch (err) {
    console.error("Error fetching user orders:", err);
    res.status(500).json({ message: "Internal server error" });
  }
}

