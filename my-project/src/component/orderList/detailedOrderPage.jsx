import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Sidebar from '../admin/commonComponent/sideBar';

function OrderDetails() {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const res = await axios.get(`http://localhost:3000/orderList/${orderId}`);
                setOrder(res.data);
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
                    <h3 className="text-2xl font-semibold mb-4">{order.fullName}'s Order</h3>
                    <p>Email: {order.email}</p>
                    <p>Address: {order.address}</p>
                    <p>Pincode: {order.pincode}</p>
                    <p>Total Amount: ₹{order.totalAmount}</p>

                    <h4 className="mt-6 text-lg font-medium">Items Ordered:</h4>
                    <ul>
                        {order.cart.map((item, index) => (
                            <li key={index} className="text-sm mb-2">
                                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover mr-2 inline-block" />
                                {item.name} - ₹{item.price}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default OrderDetails;
