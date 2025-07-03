import React, { useEffect, useState } from "react";
import Navbar from "../HomeComponent/navBar";
import { Link } from "react-router-dom";
import axios from "axios";

export default function ViewOrders() {
  const [userOrders, setUserOrders] = useState([]);

 useEffect(() => {
  async function fetchOrders() {
    try {
      const response = await axios.get("http://localhost:9999/my-orders", {
        withCredentials: true,
      });
      setUserOrders(response.data);
    } catch (err) {
      if (err.response?.status === 403) {
        alert("Your account has been blocked. Please contact support.");
        navigate("/login");
      } else if (err.response?.status === 401) {
        navigate("/login");
      } else {
        console.error("Error fetching orders:", err);
      }
    }
  }

  fetchOrders();
}, [navigate]);


  return (
    <>
      <Navbar />

      <div className="p-6 bg-gray-300 min-h-screen">
        <Link to="/" className="text-red-600 font-bold">
          Get Back To Home
        </Link>

        <div className="max-w-3xl mx-auto space-y-8 mt-6">
          {userOrders.length > 0 ? (
            userOrders.map((order, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl shadow-lg space-y-6"
              >
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    Order Summary
                  </h2>
                  <div className="grid grid-cols-2 gap-4 text-gray-700">
                    <div>
                      <p className="text-sm font-semibold text-gray-500">
                        Order ID
                      </p>
                      <p>#{order._id}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-500">
                        Customer Name
                      </p>
                      <p>{order.fullName}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-500">
                        Order Date
                      </p>
                      <p>
                        {new Date(order.createdAt).toLocaleDateString()}{" "}
                        {new Date(order.createdAt).toLocaleTimeString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-500">
                        Total Amount
                      </p>
                      <p>₹{order.totalAmount}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-500">
                        Payment Method
                      </p>
                      <p>{order.paymentMethod || "COD"}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Items in this Order
                  </h2>
                  <div className="space-y-4">
                    {order.cart.map((item, itemIdx) => (
                      <div
                        key={itemIdx}
                        className="flex items-center gap-4 p-4 border rounded-xl shadow-sm bg-gray-50"
                      >
                        <img
                          src={item.productId?.image}
                          alt={item.productId?.name}
                          className="w-24 h-24 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <p className="font-medium text-lg text-gray-800">
                            {item.productId?.name}
                          </p>
                          <p className="text-gray-600">
                            Price: ₹{item.productId?.price}
                          </p>
                          <p className="text-gray-600">
                            Quantity: {item.quantity}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 text-gray-700">
              <img
                src="/no-orders.png"
                alt="No orders"
                className="w-40 h-40 mx-auto mb-4 opacity-70"
              />
              <p className="text-2xl font-semibold">No orders found</p>
              <p className="text-sm text-gray-500 mt-2">
                You haven’t placed any orders yet.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
