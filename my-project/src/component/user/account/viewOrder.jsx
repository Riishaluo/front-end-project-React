import React, { useEffect, useState } from "react";
import Navbar from "../../../HomeComponent/navBar";
import { Link } from "react-router-dom"
import axios from "axios";

export default function ViewOrders() {

    const [userOrders, setUserOrders] = useState([])
    const userId = localStorage.getItem("userId")
    useEffect(() => {
        async function fetching() {
            try {
                const response = await axios.get(`http://localhost:3000/orderList`)
                const data = response.data
                const filteredOrder = data.filter(order => order.userId === userId)
                setUserOrders(filteredOrder)
            } catch (err) {
                console.error("Error fetching Order Listing:", err)
            }
        }

        fetching()
    }, [userId])

    return (
        <>
            <Navbar />

            <div className="p-6 bg-gray-300 min-h-screen">
                <Link to="/" className="text-red-600 font-bold ">Get Back To Home</Link>
                <div className="max-w-3xl mx-auto space-y-8">

                    {userOrders.length > 0 ? (
                        userOrders.map((order, index) => (
                            <div key={index} className="bg-white p-6 rounded-2xl shadow-lg space-y-6">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Order Summary</h2>
                                    <div className="grid grid-cols-2 gap-4 text-gray-700">
                                        <div>
                                            <p className="text-sm font-semibold text-gray-500">Order ID</p>
                                            <p>#{order.id}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-gray-500">Customer Name</p>
                                            <p>{order.fullName}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-gray-500">Order Date</p>
                                            <p>{new Date(order.date || order.createdAt || Date.now()).toLocaleDateString()}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-gray-500">Total Amount</p>
                                            <p>₹{order.totalAmount}</p>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Items in this Order</h2>
                                    <div className="space-y-4">
                                        {order.cart.map((item, itemIdx) => (
                                            <div
                                                key={itemIdx}
                                                className="flex items-center gap-4 p-4 border rounded-xl shadow-sm bg-gray-50"
                                            >
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="w-24 h-24 object-cover rounded-lg"
                                                />
                                                <div className="flex-1">
                                                    <p className="font-medium text-lg text-gray-800">{item.name}</p>
                                                    <p className="text-gray-600">Price: ₹{item.price}</p>
                                                    <p className="text-gray-600">Quantity: {item.quantity}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-700 text-lg">No orders found.</p>
                    )}
                </div>
            </div>
        </>
    );
}
