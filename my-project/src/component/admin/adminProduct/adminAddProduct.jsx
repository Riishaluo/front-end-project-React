import React, { useState } from "react";
import Sidebar from "../commonComponent/sideBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddProduct() {
    const navigate = useNavigate()
  const [product, setProduct] = useState({
    name: "",
    price: "",
    image: "",
    category: "",
    quantity: "",
    description: ""
  });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:3000/products",product)
    alert("Product added successfully")
    navigate("/admin/product")
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 flex justify-center items-start p-6">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl space-y-6"
        >
          <h2 className="text-2xl font-bold text-gray-800">Add New Product</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

            <div>
              <label className="block mb-1 font-medium">Name</label>
              <input
                type="text"
                name="name"
                value={product.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-400"
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Price ($)</label>
              <input
                type="number"
                name="price"
                value={product.price}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-400"
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Image URL</label>
              <input
                type="text"
                name="image"
                value={product.image}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-400"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Category</label>
              <input
                type="text"
                name="category"
                value={product.category}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-400"
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Quantity</label>
              <input
                type="number"
                name="quantity"
                value={product.quantity}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-400"
                required
              />
            </div>

            {product.image && (
              <div className="col-span-2">
                <label className="block mb-1 font-medium">Image Preview</label>
                <img
                  src={product.image}
                  alt="Preview"
                  className="h-32 rounded border object-cover"
                />
              </div>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium">Description</label>
            <textarea
              name="description"
              value={product.description}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-400"
              rows="4"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;
