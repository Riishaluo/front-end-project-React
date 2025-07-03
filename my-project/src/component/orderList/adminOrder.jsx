import React, { useEffect, useState } from 'react';
import Sidebar from '../admin/commonComponent/sideBar';
import { Link } from 'react-router-dom';
import axios from 'axios';

function UserOrders() {
  const [orders, setOrders] = useState([]);
  console.log("Orders", orders)

  console.log(orders)

  useEffect(() => {
    const fetchUserOrders = async () => {
      try {
        const res = await axios.get('http://localhost:9999/admin/orderList');
        setOrders(res.data);
      } catch (err) {
        alert('Failed to fetch orders')
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
                <th className="py-4 px-6 text-left font-semibold">Date of Order</th>
                <th className="py-4 px-6 text-left font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={index} className="hover:bg-gray-100 transition-all border-b">
                  <td className="py-4 px-6">{order.orderBy?.username || 'Unknown User'}</td>
                  <td className="py-4 px-6">{order.orderBy?.email || 'N/A'}</td>
                  <td className="py-4 px-6">
                    {new Date(order.createdAt).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                    })},{" "}
                    {new Date(order.createdAt).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: true,
                    })}
                  </td>
                  <td className="py-4 px-6">
                    <Link to={`/admin/orderList/${order._id}`}>
                      <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-md shadow-md hover:scale-105 transition-transform">
                        View Order
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default UserOrders;
