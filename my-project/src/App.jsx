import React from "react"
import Home from "./component/user/pages/Home"
import Login from "./component/user/pages/login"
import Register from "./component/user/pages/register"
import CartSection from "./component/user/cartComponent/cart"
import Payment from "./component/user/paymentComponent/payment"
import ViewOrders from "./component/user/account/viewOrder"
import CategoryPage from "./component/user/categoryBased/category"
import ProductDetails from "./component/user/product/productDetailed"
import AdminDisplayProducts from "./component/admin/adminProduct/adminDisplayProduct"
import DashboardLayout from "./component/admin/dashboard/dashboard"
import AdminLogin from "./component/admin/pages/adminLogin"
import AddProduct from "./component/admin/adminProduct/adminAddProduct"
import EditProduct from "./component/admin/adminProduct/adminEditProduct"
import UserList from "./component/admin/adminUser/userList"
import UserOrders from "./component/orderList/adminOrder"
import OrderDetails from "./component/orderList/detailedOrderPage"
import ProtectedRoute from "./component/admin/commonComponent/protectedRoute"
import UserProtectedRoute from "./component/user/userProtect"
import { Routes, Route } from "react-router-dom"


let App = () => {
  return (
    <div>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<UserProtectedRoute><CartSection /></UserProtectedRoute>} />
          <Route path="/checkout" element={<UserProtectedRoute><Payment /></UserProtectedRoute>} />
          <Route path="/account" element={<UserProtectedRoute><ViewOrders /></UserProtectedRoute>} />
          <Route path="/category/:categoryName" element={<UserProtectedRoute><CategoryPage /></UserProtectedRoute>} />
          <Route path="/product/:productId" element={<UserProtectedRoute><ProductDetails /></UserProtectedRoute>} />



          {/* admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>} />
          <Route path="/admin/product" element={<ProtectedRoute><AdminDisplayProducts /></ProtectedRoute>} />
          <Route path="/admin/add/product" element={<ProtectedRoute><AddProduct /></ProtectedRoute>} />
          <Route path="/admin/edit/product/:id" element={<ProtectedRoute><EditProduct /></ProtectedRoute>} />
          <Route path="/admin/user" element={<ProtectedRoute><UserList /></ProtectedRoute>} />
          <Route path="/admin/orderList" element={<ProtectedRoute><UserOrders /></ProtectedRoute>} />
          <Route path="/admin/order-details/:orderId" element={<ProtectedRoute><OrderDetails /></ProtectedRoute>} />
        </Routes>
      </div>
    </div>
  )
}

export default App