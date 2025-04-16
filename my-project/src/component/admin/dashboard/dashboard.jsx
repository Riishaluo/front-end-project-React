import React, { useEffect, useState } from "react"
import BarChartComponent from "./barChart"
import Sidebar from "../commonComponent/sideBar"
import axios from "axios"

function DashboardLayout() {
    const [users, setUsers] = useState([])
    const [products, setProducts] = useState([])
    const [orders, setOrders] = useState([])
    const [totalSales, setTotalSales] = useState(0)

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axios.get("http://localhost:3000/users")
                setUsers(res.data);
                console.log("Total Users:", res.data.length)
            } catch (err) {
                console.error("Error fetching users:", err)
            }
        };

        fetchUsers();
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get("http://localhost:3000/products")
                setProducts(res.data);
            } catch (err) {
                console.error("Error fetching products:", err)
            }
        };

        fetchProducts()
    }, [])

    
useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("http://localhost:3000/orderList")
        setOrders(res.data);
  
        const total = res.data.reduce((sum, order) => sum + Number(order.totalAmount), 0)
        setTotalSales(total)    
      } catch (err) {
        console.error("Error fetching orders:", err)
      }
    };
  
    fetchOrders();
  }, [])

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />

            <div className="flex-1 p-4 sm:p-6 md:p-8 ml-64">
                <h1 className="text-3xl font-semibold mb-6">Dashboard Overview</h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-xl shadow">
                        📦 Products: {products.length}
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow">
                        👤 Users: {users.length}
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow">
                        💰 {totalSales}
                    </div>
                </div>

                <BarChartComponent />
            </div>
        </div>
    );
}

export default DashboardLayout;
