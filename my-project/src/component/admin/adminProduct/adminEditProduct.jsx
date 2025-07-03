import React, { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Sidebar from "../commonComponent/sideBar"
import axios from "axios"

function EditProduct() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [product, setProduct] = useState({
    name: "",
    price: "",
    image: "",
    category: "",
    quantity: "",
    description: ""
  })

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:9999/admin/editProducts/${id}`)
        console.log(res)
        setProduct({
          name: res.data.name || "",
          price: res.data.price || "",
          image: res.data.image || "",
          category: res.data.category || "",
          quantity: res.data.stock || "",
          description: res.data.description || ""
        })
      } catch (error) {
        console.error("Error fetching product:", error)
      }
    }
    fetchProduct()
  }, [id])

  const handleChange = (e) => {
    const { name, value } = e.target
    const newValue = name === "price" || name === "quantity" ? parseFloat(value) : value
    setProduct({ ...product, [name]: newValue })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const updatedData = {
        ...product,
        stock: product.quantity 
      }
      delete updatedData.quantity 
      await axios.put(`http://localhost:9999/admin/edit-product/${id}`, updatedData)
      alert("Product updated successfully!")
      navigate("/admin/admin-products")
    } catch (error) {
      console.error("Error updating product:", error)
      alert("Failed to update product")
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start p-6">
      <Sidebar />
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl space-y-6"
      >
        <h2 className="text-2xl font-bold text-gray-800">Edit Product</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block mb-1 font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-400"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Price ($)</label>
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-400"
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
              required
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-400"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Quantity</label>
            <input
              type="number"
              name="quantity"
              value={product.quantity}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-400"
            />
          </div>
        </div>

        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            rows="4"
            required
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-400"
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Update Product
        </button>
      </form>
    </div>
  )
}

export default EditProduct
