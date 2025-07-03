import React, { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import axios from "axios"
import Navbar from "../HomeComponent/navBar"
import Footer from "../HomeComponent/footer"
import { useNavigate } from "react-router-dom"


export default function CategoryPage() {
    const { categoryName } = useParams()
    const [products, setProducts] = useState([])
    const [searchItem, setSearchItem] = useState("")
    const [minPrice, setMinPrice] = useState("")
    const [maxPrice, setMaxPrice] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
  const fetchProductsByCategory = async () => {
    try {
      const response = await axios.get(`http://localhost:9999/products/category/${categoryName}`, {
        withCredentials: true,
      });
      setProducts(response.data);
    } catch (err) {
      if (err.response?.status === 403) {
        Swal.fire("Access Denied", "Your account has been blocked.", "error").then(() => {
          navigate("/login");
        });
      } else if (err.response?.status === 401) {
        Swal.fire("Session Expired", "Please login to continue.", "warning").then(() => {
          navigate("/login");
        });
      } else {
        console.error("Failed to fetch products:", err);
      }
    }
  };

  fetchProductsByCategory();
}, [categoryName, navigate]);


    const displayedProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchItem.toLowerCase())
        const matchesMin = minPrice ? product.price >= parseInt(minPrice) : true
        const matchesMax = maxPrice ? product.price <= parseInt(maxPrice) : true
        return matchesSearch && matchesMin && matchesMax
    })

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="p-6 flex-grow">
                <Link to="/" className="font-bold text-red-500 mb-4 inline-block">← Back To Home</Link>
                <h2 className="text-2xl font-bold capitalize mb-4">{categoryName}</h2>

                <div className="mb-6 max-w-3xl mx-auto flex flex-col sm:flex-row gap-4">
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchItem}
                        onChange={(e) => setSearchItem(e.target.value)}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <input
                        type="number"
                        placeholder="Min Price"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                        className="w-full sm:w-40 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <input
                        type="number"
                        placeholder="Max Price"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        className="w-full sm:w-40 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {displayedProducts.length > 0 ? (
                        displayedProducts.map(product => (
                            <Link key={product._id} to={`/product/${product._id}`}>
                                <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-48 object-cover rounded-md mb-4"
                                    />
                                    <h3 className="text-lg font-semibold">{product.name}</h3>
                                    <p className="text-gray-600">₹{product.price}</p>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <p className="text-gray-600 col-span-full text-center">No products found.</p>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    )
}
