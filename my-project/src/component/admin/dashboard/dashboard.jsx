import React, { useEffect, useState } from "react";
import BarChartComponent from "./barChart";
import Sidebar from "../commonComponent/sideBar";
import axios from "axios";

function DashboardLayout() {
    const [users, setUsers] = useState([]);
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [totalSales, setTotalSales] = useState(0);
    const [chartData, setChartData] = useState([]);  

    console.log(chartData)

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const res = await axios.get("http://localhost:9999/admin/dashboard");
                const { users, products, orders, totalSales, chartData } = res.data;
                setUsers(users);
                setProducts(products);
                setOrders(orders);
                setTotalSales(totalSales);
                setChartData(chartData);
            } catch (err) {
                console.error("Error fetching dashboard data:", err);
            }
        };
        fetchDashboardData();
    }, []);

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />

            <div className="flex-1 p-4 sm:p-6 md:p-8 ml-64">
                <h1 className="text-3xl font-semibold mb-6">Dashboard Overview</h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <div className="bg-white p-6 rounded-xl shadow">📦 Products: {products.length}</div>
                    <div className="bg-white p-6 rounded-xl shadow">👤 Users: {users.length}</div>
                    <div className="bg-white p-6 rounded-xl shadow">💰 ₹{totalSales}</div>
                </div>

                <BarChartComponent data={chartData} />
            </div>
        </div>
    );
}

export default DashboardLayout;
