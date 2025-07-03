import React, { useContext } from "react"
import { ProductContext } from "./productContext"
import Sidebar from "../commonComponent/sideBar"
import { useNavigate } from "react-router-dom"

function AdminDisplayProducts() {
  const { products, deleteProduct } = useContext(ProductContext)
  const navigate = useNavigate()
  console.log(products)
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-4 sm:p-6 md:p-8 ml-64">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Manage Products</h1>
          <button
            onClick={() => navigate("/admin/add/product")}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700 transition"
          >
            + Add Product
          </button>
        </div>

        <div className="bg-white shadow-lg rounded-xl overflow-x-auto">
          <table className="min-w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-gray-200 text-gray-700 uppercase text-xs font-semibold">
              <tr>
                <th className="px-4 sm:px-6 py-4">Product ID</th>
                <th className="px-4 sm:px-6 py-4">Image</th>
                <th className="px-4 sm:px-6 py-4">Name</th>
                <th className="px-4 sm:px-6 py-4">Price</th>
                <th className="px-4 sm:px-6 py-4">Stock</th>
                <th className="px-4 sm:px-6 py-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {products.map((product, index) => (
                <tr key={product._id || index} className="border-b hover:bg-gray-50">
                  <td className="px-4 sm:px-6 py-4">{product._id}</td>
                  <td className="px-4 sm:px-6 py-4">
                    <img
                      src={product.image || "https://via.placeholder.com/50"}
                      alt={product.name || "Product"}
                      className="w-20 h-20 object-cover rounded"
                    />
                  </td>
                  <td className="px-4 sm:px-6 py-4 font-medium text-gray-800">{product.name}</td>
                  <td className="px-4 sm:px-6 py-4">
                    {product.price?.toLocaleString("en-IN", {
                      style: "currency",
                      currency: "INR",
                    })}
                  </td>
                  <td className="px-4 sm:px-6 py-4">{product.stock}</td>
                  <td className="px-4 sm:px-6 py-4 space-x-2">
                    <button
                      onClick={() => navigate(`/admin/edit/product/${product._id}`)}
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteProduct(product._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AdminDisplayProducts
