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
import Blocked from "./component/user/pages/blockpage"
import { ProductProvider } from "./component/admin/adminProduct/productContext"
import { Routes, Route } from "react-router-dom"

let App = () => {
  return (
    <div>
      <ProductProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<CartSection />} />
          <Route path="/checkout" element={<Payment />} />
          <Route path="/account" element={<ViewOrders />} />
          <Route path="/category/:categoryName" element={<CategoryPage />} />
          <Route path="/product/:productId" element={<ProductDetails />} />
          <Route path="/blocked" element={<Blocked />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<DashboardLayout />} />
          <Route path="/admin/admin-products" element={<AdminDisplayProducts />} />
          <Route path="/admin/add/product" element={<AddProduct />} />
          <Route path="/admin/edit/product/:id" element={<EditProduct />} />
          <Route path="/admin/user" element={<UserList />} />
          <Route path="/admin/orderList" element={<UserOrders />} />
          <Route path="/admin/orderList/:orderId" element={<OrderDetails />} />
        </Routes>
      </ProductProvider>
    </div>
  )
}

export default App
