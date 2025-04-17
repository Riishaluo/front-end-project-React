import React, { useEffect, useState } from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts"
import Sidebar from "../commonComponent/sideBar"
import axios from "axios"

function Dashboard() {
  const [salesData, setSalesData] = useState([])
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("http://localhost:3000/orderList")
        const orders = res.data

        const monthlySales = Array(12).fill(0)
        orders.forEach((order) => {
          if (order.createdAt) {
            const date = new Date(order.createdAt)
            const monthIndex = date.getMonth()
            monthlySales[monthIndex] += order.totalAmount || 0
          }
        })

        const formattedData = [
          "Jan", "Feb", "Mar", "Apr", "May", "Jun",
          "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ].map((month, index) => ({
          name: month,
          sales: monthlySales[index],
        }))

        setSalesData(formattedData)
      } catch (error) {
        console.error("Error fetching sales data", error)
      }
    }

    fetchOrders()
  }, [])

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">📊 Dashboard</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow lg:col-span-2">
            <h2 className="text-xl font-semibold mb-4">💰 Sales Overview</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesData}>
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sales" fill="#6366f1" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
