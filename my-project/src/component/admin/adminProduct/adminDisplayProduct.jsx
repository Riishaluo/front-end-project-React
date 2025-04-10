import React, { useEffect, useState } from "react";
import Sidebar from "../commonComponent/sideBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminDisplayProducts() {
    const navigate = useNavigate()
    const [products, setProducts] = useState([])
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get("http://localhost:3000/products");
                setProducts(res.data)
                console.log(res.data)
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        }

        fetchProducts();
    }, [])

    const deleteItem = async (id)=>{
        try{
            await axios.delete(`http://localhost:3000/products/${id}`)
            setProducts((prev) => prev.filter((product) => product.id !== id))
            alert("Item deleted")
        }catch(err){
            alert(err)
        }
    }

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
            <Sidebar />
            <div className="flex-1 p-4 sm:p-6 md:p-8 ml-64">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Manage Products</h1>
                    <button onClick={()=>navigate("/admin/add/product")} className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700 transition">
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
                                <th className="px-4 sm:px-6 py-4">Stock</th>
                                <th className="px-4 sm:px-6 py-4">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {products.map((product, index) => (
                                <tr key={product.id || index} className="border-b hover:bg-gray-50">
                                    <td className="px-4 sm:px-6 py-4">{product.id}</td>
                                    <td className="px-4 sm:px-6 py-4">
                                        <img
                                            src={product.image || "https://via.placeholder.com/50"}
                                            alt="Product"
                                            className="w-12 h-12 object-cover rounded"
                                        />
                                    </td>
                                    <td className="px-4 sm:px-6 py-4 font-medium text-gray-800">
                                        {product.name}
                                    </td>
                                    <td className="px-4 sm:px-6 py-4">{product.quantity}</td>
                                    <td className="px-4 sm:px-6 py-4 space-x-2">
                                        <button onClick={()=>navigate(`/admin/edit/product/${product.id}`)} className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition">
                                            Edit
                                        </button>
                                        <button onClick={()=>deleteItem(product.id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition">
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
    );
}

export default AdminDisplayProducts
