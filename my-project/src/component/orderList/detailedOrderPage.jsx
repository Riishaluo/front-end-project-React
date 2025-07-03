import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Sidebar from '../admin/commonComponent/sideBar';

function OrderDetails() {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);

    console.log(order)

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const res = await axios.get(`http://localhost:9999/admin/orderList/${orderId}`);
                setOrder(res.data)
            } catch (err) {
                console.error("Error fetching order details", err);
            }
        };

        fetchOrderDetails();
    }, [orderId]);

    if (!order) return <div>Loading...</div>;

    return (
        <div className="flex min-h-screen bg-gray-100">
            <div className="w-64">
                <Sidebar />
            </div>

            <div className="flex-1 p-8">
                <h2 className="text-3xl font-semibold text-gray-800 mb-8">Order Details</h2>
                <div className="bg-white shadow-lg rounded-xl overflow-hidden p-6">
                    <h3 className="text-2xl font-semibold mb-4">
                        {order.orderBy?.username || "Unknown User"}'s Order
                    </h3>
                    <p>Email: {order.orderBy?.email || "N/A"}</p>
                    <p>Payment Method: {order.paymentMethod}</p>
                    <p>Total Amount: ₹{order.totalAmount}</p>
                    <p>Order Date: {new Date(order.createdAt).toLocaleString()}</p>

                    <h4 className="mt-6 text-lg font-medium">Items Ordered:</h4>
                    <ul>
                        <ul>
                            {order.cart.map((item, index) => (
                                <li key={index} className="text-sm mb-4 flex items-center gap-3">
                                    <img
                                        src={item.productId?.image || "https://via.placeholder.com/100"}
                                        alt={item.productId?.name || "Product"}
                                        className="w-20 h-20 object-cover rounded"
                                    />
                                    <div>
                                        <p className="font-semibold">{item.productId?.name}</p>
                                        <p>Quantity: {item.quantity}</p>
                                        <p>Price: ₹{item.price}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>

                    </ul>
                </div>
            </div>

        </div>
    );
}

export default OrderDetails;
