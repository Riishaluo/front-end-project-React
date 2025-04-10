import React from "react";
import BarChartComponent from "./barChart";
import Sidebar from "../commonComponent/sideBar";

function DashboardLayout() {
    return (
        <div className="flex h-screen bg-gray-100">

            <Sidebar />

            <div className="flex-1 p-4 sm:p-6 md:p-8 ml-64">
                <h1 className="text-3xl font-semibold mb-6">Dashboard Overview</h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-xl shadow">📦 Products: 120</div>
                    <div className="bg-white p-6 rounded-xl shadow">👤 Users: 85</div>
                    <div className="bg-white p-6 rounded-xl shadow">💰 Sales: $15,000</div>
                </div>

                <div className="mt-8 bg-white p-6 rounded-xl shadow">
                    <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
                    <p>Here you can show charts, tables, or logs of recent activity...</p>
                </div>

                <BarChartComponent />
            </div>
        </div>
    );
}


export default DashboardLayout