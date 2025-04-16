import React, { useEffect, useState } from 'react';
import Sidebar from '../admin/commonComponent/sideBar';
import {Link} from "react-router-dom"
import axios from 'axios';

function UserOrders() {

    const [orders, setOrders] = useState([]);
    const [user, setUser] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const res = await axios.get("http://localhost:3000/users");
            setUser(res.data);
        };
        fetchUsers();
    }, []);

    useEffect(() => {
        const fetchUserOrders = async () => {
            try {
                const res = await axios.get("http://localhost:3000/orderList");
                setOrders(res.data);
            } catch (err) {
                alert(err);
            }
        };

        fetchUserOrders();
    }, []);

    return (
        <div className="flex min-h-screen bg-gray-100">
            <div className="w-64">
                <Sidebar />
            </div>

            <div className="flex-1 p-8">
                <h2 className="text-3xl font-semibold text-gray-800 mb-8">User Orders</h2>

                <div className="bg-white shadow-lg rounded-xl overflow-x-auto">
                    <table className="min-w-full text-sm text-gray-700">
                        <thead className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
                            <tr>
                                <th className="py-4 px-6 text-left font-semibold">Name</th>
                                <th className="py-4 px-6 text-left font-semibold">Email</th>
                                <th className="py-4 px-6 text-left font-semibold">Item Ordered</th>
                                <th className="py-4 px-6 text-left font-semibold">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order, index) => {
                                const matchedUser = user.find(u => u.id === order.userId);

                                return (
                                    <tr key={index} className="hover:bg-gray-100 transition-all border-b">
                                        <td className="py-4 px-6">{matchedUser ? matchedUser.username : 'Unknown User'}</td>
                                        <td className="py-4 px-6">{matchedUser ? matchedUser.email : 'N/A'}</td>
                                        <td className="py-4 px-6 space-y-1">
                                            {order.cart.map((item, i) => (
                                                <div key={i} className="text-sm">{item.name}</div>
                                            ))}
                                        </td>
                                        <td className="py-4 px-6">
                                            <Link to={`/admin/order-details/${order.id}`}>
                                                <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-md shadow-md hover:scale-105 transition-transform">
                                                    View Order
                                                </button>
                                            </Link>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default UserOrders;
