const express = require('express')
const router = express.Router()
const adminLoginController = require('../controller/adminlogin')
const adminProductController = require('../controller/adminProductController')
const adminUserController = require('../controller/adminUserController')
const adminDashboardController = require('../controller/adminDashboard')
const orderController = require("../controller/adminOrderContoller");
const { upload } = require('../utils/cloudinary')


router.get('/login',adminLoginController.renderAdminLogin)
router.post('/checkAdminLogin',adminLoginController.adminLogin)

router.get("/dashboard", adminDashboardController.renderDashboard)


//add product
router.get('/admin-products', adminProductController.getAllProducts)
router.post("/addProduct",upload.single('image'),adminProductController.AddProduct)
router.post("/deleteProduct/:id",adminProductController.DeleteProduct)
router.get("/editProducts/:id", adminProductController.renderEditProduct);
router.put('/edit-product/:id', adminProductController.EditProduct)



//admin user fetch
router.get("/get-users", adminUserController.getUsers)
router.patch("/toggle-block/:id", adminUserController.toggleBlockUser)

// order
router.get("/orderList", orderController.getAllOrders);
router.get("/orderList/:id", orderController.getOrderById);

module.exports = router
