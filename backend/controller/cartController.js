const Cart = require('../model/cartSchema')
const Product = require('../model/productSchema')


exports.renderCart = (async (req, res) => {
    try {
        const userId = req.user.userId

        if (!userId) {
            return res.status(404).json({ message: "Please login" })
        }
        const cart = await Cart.findOne({ user: userId })
        const product = cart.products

        if (product.length === 0) {
            return res.status(404).json({ message: "Cart is empty" });
        }

        res.status(200).json({ message: "Cart is fetched", product })

    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
})

exports.addToCart = (async (req, res) => {
    try {
        const userId = req.user.userId
        const { productId, quantity } = req.body

        if (!userId) {
            res.status(404).json({ message: "please login" })
        }

        const product = await Product.findById(productId)

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        if (product.stock < 1) {
            return res.status(404).json({ message: "No stock" })
        }

        const price = product.price

        let cart = await Cart.findOne({ user: userId })

        if (cart) {
            const existingItem = cart.products.find(
                (item) => item.product.toString() === productId
            )

            if (existingItem) {
                existingItem.quantity += quantity
            } else {
                cart.products.push({ product: productId, quantity, price })
            }


            cart.totalPrice = cart.products.reduce((total, item) => {
                return total + item.price * item.quantity;
            }, 0)
            await cart.save()
        } else {
            cart = new Cart({
                user: userId,
                products: [{ product: productId, quantity, price }],
                totalPrice: price * quantity,
            })
            await cart.save();
        }

        res.status(201).json({ message: "Item added to cart", cart })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }

})

exports.deleteCart = (async (req, res) => {
    try {
        const userId = req.user.userId
        if (!userId) {
            return res.status(404).json({ message: "Please login" })
        }
        const { productId } = req.body
        if (!productId) {
            return res.status(404).json({ message: "Product not found" })
        }

        const cart = await Cart.findOne({ user: userId })

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" })
        }

        productToRemove = cart.products.find((item) =>
            item.product.toString() === productId
        )
        console.log(productToRemove)

        const productTotal = productToRemove.price * productToRemove.quantity;
        cart.totalPrice -= productTotal

        cart.products = cart.products.filter(
            (item) => item.product.toString() !== productId
        )

        await cart.save()

        res.status(200).json({ message: "Product removed from cart", cart });
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})




