const express = require('express')
const router = express.Router()
const userController = require('../controller/userController')
const userAuth = require('../middleware/userAuth')
const cartController = require('../controller/cartController')
const paymentController = require('../controller/paymentController')
const accountController = require('../controller/userAccountController')

//home
router.get('/',userAuth.verifyToken,userController.renderHome)

//register
router.post('/Addregister',userController.userRegister)


//login
router.post('/Checklogin',userController.userLogin)


//addToCart
router.get('/cart',userAuth.verifyToken,cartController.renderCart)
router.post('/add-to-cart',userAuth.verifyToken,cartController.addToCart)
router.post('/delete-cart',userAuth.verifyToken,cartController.deleteCart)

//payment
router.get('/checkout',userAuth.verifyToken,paymentController.renderPayment)
router.post('/orderPlaced',userAuth.verifyToken,paymentController.createOrder)

//accountControllerx
router.get('/orders',userAuth.verifyToken,accountController.listOrders)

module.exports = router;