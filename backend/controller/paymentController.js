const Order = require('../model/orderSchema');
const Cart = require('../model/cartSchema')
const Product = require('../model/productSchema')


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
    const userId = req.user.userId;
    const { fullName, email, address, pincode, items, total, paymentMethod } = req.body
    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Order must include at least one item." })
    }
    console.log(items)
    const cart = items.map(item => ({
      productId: item.productId,
      quantity: item.quantity
    }))

    const newOrder = await Order.create({
      orderBy: userId,
      fullName,
      email,
      address,
      pincode,
      cart,
      totalAmount: total,
      paymentMethod: paymentMethod || "COD"
    })

    for (const item of items) {
      const product = await Product.findById(item.productId);
      console.log(product.stock)
      if (product) {
        if (product.stock >= item.quantity){
          product.stock -= item.quantity
          await product.save()
        } else {
          console.warn(`Product ${product.name} has insufficient stock`);
        }
      }
    }



    await Cart.deleteOne({ user: userId })

    res.status(201).json({ message: "Order placed successfully", order: newOrder });

  } catch (err) {
    console.error("🔥 Order creation failed:", err)
    res.status(500).json({ message: err.message })
  }
}

