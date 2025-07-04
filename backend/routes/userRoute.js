const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const userAuth = require('../middleware/userAuth');
const cartController = require('../controller/cartController');
const paymentController = require('../controller/paymentController');
const accountController = require('../controller/userAccountController')
const productController = require('../controller/productDetailedController')


router.get('/', userController.renderHome)

router.post('/Addregister', userController.userRegister)

router.post('/Checklogin', userController.userLogin)


router.get('/check-auth', userAuth.verifyToken, (req, res) => {
    res.status(200).json({ username: req.user.username, message: "Authenticated" })
});


// Cart
router.get('/cart', userAuth.verifyToken, cartController.renderCart)
router.post('/add-to-cart', userAuth.verifyToken, cartController.addToCart)
router.post('/delete-cart', userAuth.verifyToken, cartController.deleteCart)
router.post("/update-cart-quantity", userAuth.verifyToken,cartController.updateCartQuantity);


// Payment
router.get('/checkout', userAuth.verifyToken, paymentController.renderPayment)
router.post('/orderPlaced', userAuth.verifyToken, paymentController.createOrder)

// Account
router.get("/my-orders", userAuth.verifyToken,accountController.getMyOrders);

//detiled route
router.get('/products/:id', productController.getProductById)
router.get('/products/category/:category', productController.getProductsByCategory)

router.post("/logout", userController.logout);



module.exports = router;
