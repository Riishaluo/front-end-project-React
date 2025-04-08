import React from "react";
import Home from "./component/user/pages/Home";
import Login from "./component/user/pages/login";
import Register from "./component/user/pages/register";
import CartSection from "./component/user/cartComponent/cart";
import Payment from "./component/user/paymentComponent/payment";
import ViewOrders from "./component/user/account/viewOrder";
import CategoryPage from "./component/user/categoryBased/category";
import ProductDetails from "./component/user/product/productDetailed";
import { Routes, Route } from "react-router-dom";


let App = () => {
  return (
    <div>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<CartSection />} />
          <Route path="/checkout" element={<Payment />} />
          <Route path="/account" element={<ViewOrders />} />
          <Route path="/category/:categoryName" element={<CategoryPage />} />
          <Route path="/product/:productId" element={<ProductDetails />} />
        </Routes>
      </div>
    </div>
  )
}

export default App