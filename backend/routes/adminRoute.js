const express = require('express')
const router = express.Router()
const adminLoginController = require('../controller/adminlogin')
const adminProductController = require('../controller/adminProductController')
const adminUserController = require('../controller/adminUserController')
const { upload } = require('../utils/cloudinary')


router.get('/login',adminLoginController.renderAdminLogin)
router.post('/checkAdminLogin',adminLoginController.adminLogin)

//add product
router.post("/addProduct",upload.single('image'),adminProductController.AddProduct)
router.post("/deleteProduct/:id",adminProductController.DeleteProduct)
router.put('/edit-product/:id', adminProductController.EditProduct)



//admin user fetch
router.get('/get-users',adminUserController.getUsers)

module.exports = router
