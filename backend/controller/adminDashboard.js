const User = require("../model/userSchema");
const Product = require("../model/productSchema");
const Order = require("../model/orderSchema");

exports.renderDashboard = async (req, res) => {
  try {
    const users = await User.find();
    const products = await Product.find();
    const orders = await Order.find();

    const totalSales = orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);

    const monthlySales = Array(12).fill(0)
    orders.forEach(order => {
      const month = new Date(order.createdAt).getMonth()
      monthlySales[month] += order.totalAmount || 0
    })


    console.log(monthlySales)

    const chartData = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ].map((month, i) => ({
      name: month,
      sales: monthlySales[i]
    }));

    res.status(200).json({
      users,
      products,
      orders,
      totalSales,
      chartData
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
