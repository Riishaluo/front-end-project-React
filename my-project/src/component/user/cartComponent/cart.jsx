import React, { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import Swal from "sweetalert2"

export default function CartSection() {
    const [cart, setCartItem] = useState([])
    const navigate = useNavigate()

    console.log(cart)

    useEffect(() => {
        const fetchCartItem = async () => {
            try {
                const response = await axios.get("http://localhost:9999/cart", {
                    withCredentials: true,
                })
                setCartItem(response.data.product || [])
            } catch (err) {
                if (err.response?.status === 403) {
                    Swal.fire("Access Denied", "Your account has been blocked.", "error").then(() => {
                        navigate("/login")
                    })
                } else if (err.response?.status === 401) {
                    Swal.fire("Session Expired", "Please login again.", "warning").then(() => {
                        navigate("/login")
                    })
                } else {
                    Swal.fire("Error", err.response?.data?.message || "Failed to fetch cart", "error")
                }
            }
        }

        fetchCartItem()
    }, [navigate])


    const totalPrice = cart.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    ) 

    const updateCartCount = async (productId, newQuantity) => {
    try {
    await axios.post(
      "http://localhost:9999/update-cart-quantity",
      { productId, quantity: newQuantity },
      { withCredentials: true }
    )

    const res = await axios.get("http://localhost:9999/cart", {
      withCredentials: true,
    })
    console.log(res.data.product)     
    setCartItem(res.data.product || []) 
  } catch (err) {
    if (err.response?.status === 409) {
      Swal.fire({
        icon: "warning",
        title: "Stock Limit Reached",
        text: "You cannot add more of this product than available in stock.",
        confirmButtonText: "OK",
      })
    } else {
      console.error("Error updating cart quantity:", err)
    }
  }
}



    const handleRemoveItem = async (productId) => {
        try {
            await axios.post(
                "http://localhost:9999/delete-cart",
                { productId },
                { withCredentials: true }
            )

            const updatedCart = cart.filter(
                (item) => item.product._id !== productId
            )
            setCartItem(updatedCart)
        } catch (err) {
            Swal.fire("Error", "Failed to remove item", "error")
        }
    }

    return (
        <div className="flex flex-col lg:flex-row max-w-7xl mx-auto p-4 sm:p-6 gap-6 sm:gap-8">
            <div className="w-full lg:w-2/3 space-y-4 sm:space-y-6">
                <ul>
                    <Link to="/" className="text-red-500 hover:text-red-600 font-medium">
                        Back to Home
                    </Link>
                </ul>

                <div className="text-center">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Your Cart</h2>
                </div>

                {cart?.map((item) => (
                    <div
                        key={item.product._id}
                        className="bg-white p-4 sm:p-6 rounded-lg shadow-md"
                    >
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b pb-4">
                            <div className="flex items-center gap-4 w-full sm:w-auto">
                                <img
                                    src={item.product.image}
                                    alt={item.product.name}
                                    className="w-16 h-16 object-cover rounded"
                                />
                                <div>
                                    <p className="font-semibold text-center sm:text-left">
                                        {item.product.name}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center flex-wrap justify-center gap-3 sm:gap-4 text-sm sm:text-base">
                                <button
                                    onClick={() =>
                                        item.quantity > 1
                                            ? updateCartCount(item.product._id, item.quantity - 1)
                                            : null
                                    }
                                    className="px-2 py-1 border rounded"
                                >
                                    -
                                </button>
                                <span>{item.quantity}</span>
                                <button
                                    onClick={() =>
                                        updateCartCount(item.product._id, item.quantity + 1)
                                    }
                                    className="px-2 py-1 border rounded"
                                >
                                    +
                                </button>
                                <div className="flex flex-col items-center sm:items-start">
                                    <p className="text-gray-500">Price</p>
                                    <p className="font-semibold">₹{item.price}</p>
                                </div>
                                <div
                                    onClick={() => handleRemoveItem(item.product._id)}
                                    className="text-red-500 cursor-pointer hover:underline"
                                >
                                    Remove
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="w-full lg:w-1/3 bg-white p-4 sm:p-6 rounded-2xl shadow-lg h-fit">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">
                    Order Summary
                </h2>

                <div className="space-y-4 text-gray-700">
                    <div className="flex justify-between font-semibold text-base sm:text-lg border-t pt-4">
                        <span>Total</span>
                        <span>₹{totalPrice}</span>
                    </div>
                </div>

                {cart.length === 0 ? (
                    <div className="w-full mt-6 text-center">
                        <button
                            className="w-full py-3 bg-gray-400 text-white text-lg rounded-xl cursor-not-allowed"
                            onClick={() =>
                                Swal.fire({
                                    icon: "warning",
                                    title: "Cart is empty",
                                    text: "Please add items before proceeding to checkout",
                                })
                            }
                        >
                            Proceed to Checkout
                        </button>
                        <span className="text-sm text-red-600 mt-2 block">
                            Please add items for further process.
                        </span>
                    </div>
                ) : (
                    <Link to="/checkout" className="w-full block mt-6">
                        <button className="w-full py-3 bg-red-500 text-white text-lg rounded-xl hover:bg-red-600 transition-all duration-300">
                            Proceed to Checkout
                        </button>
                    </Link>
                )}
            </div>
        </div>
    )
}
