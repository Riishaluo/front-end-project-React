const Order = require('../model/orderSchema');
const Cart = require('../model/cartSchema')



exports.renderPayment = async (req, res) => {
  try {
    const userId = req.user.userId
    const cart = await Cart.findOne({ user: userId }).populate('products.product')

    if (!cart) {
      return res.status(404).json({ message: "Cart is not found" })
    }

    res.status(200).json({ message: "page rendered", cart })

  } catch (err) {
    return res.status(500).json({ message: err.message })
  }


}

exports.createOrder = async (req, res) => {
  try {
    const userId = req.user.userId
    const { items, total } = req.body
    console.log(total)
    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Order must include at least one item." });
    }

    if (!total || total <= 0) {
      return res.status(400).json({ message: "Invalid total amount." });
    }

    const newOrder = await Order.create({
      orderBy: userId,
      items,
      total
    })

    await Cart.deleteOne({user:userId})

    res.status(201).json({ message: "Order placed successfully", order: newOrder });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
  