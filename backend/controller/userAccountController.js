const Order = require('../model/orderSchema')


exports.listOrders = async (req, res) => {
  try {
    const userId = req.user.userId
    if (!userId) {
      return res.status(401).json({ message: "Please login" });
    }
    const orders = await Order.find({ orderBy: userId }).sort({ createdAt: -1 });
    console.log(orders)
    res.status(200).json({ orders }); 
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

