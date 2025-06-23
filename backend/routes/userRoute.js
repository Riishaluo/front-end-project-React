const express = require('express')
const router = express.Router()
const userController = require('../controller/userController')
const userAuth = require('../middleware/userAuth')
const cartController = require('../controller/cartController')
const paymentController = require('../controller/paymentController')

//home
router.get('/',userAuth.verifyToken,userController.renderHome)

//register
router.get('/register',userController.renderRegister)
router.post('/Addregister',userController.userRegister)


//login
router.get('/login',userController.renderLogin)
router.post('/Checklogin',userController.userLogin)


//addToCart
router.get('/cart',userAuth.verifyToken,cartController.renderCart)
router.post('/add-to-cart',userAuth.verifyToken,cartController.addToCart)
router.post('/delete-cart',userAuth.verifyToken,cartController.deleteCart)

//payment
router.get('/checkout',userAuth.verifyToken,paymentController.renderPayment)
router.post('/orderPlaced',userAuth.verifyToken,paymentController.createOrder)

module.exports = router;