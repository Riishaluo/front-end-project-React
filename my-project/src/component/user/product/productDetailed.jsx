import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import Navbar from "../HomeComponent/navBar";
import Footer from "../HomeComponent/footer";

export default function ProductDetails() {
    const { productId } = useParams();
    const navigate = useNavigate();
    const [cartProducts, setCartProducts] = useState([]);
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:9999/products/${productId}`);
                setProduct(response.data);
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };

        const fetchCart = async () => {
            try {
                const res = await axios.get("http://localhost:9999/cart", {
                    withCredentials: true
                });
                setCartProducts(res.data.products || []);
            } catch (err) {
                console.error("Error fetching cart:", err);
            }
        };

        fetchProduct();
        fetchCart();
    }, [productId]);

    const isAlreadyInCart = cartProducts.some(item => item.product?._id === productId);

    const handleAddToCart = async () => {
        try {
            const cartItem = {
                productId: product._id,
                quantity: 1,
                price: product.price
            };

            await axios.post("http://localhost:9999/add-to-cart", cartItem, {
                withCredentials: true
            });

            Swal.fire({
                icon: "success",
                title: "Added to Cart",
                text: "Product successfully added to your cart!",
                confirmButtonText: "OK"
            });

        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Something went wrong while adding to cart.",
                confirmButtonText: "OK"
            });
            console.error("Error adding to cart:", error);
        }
    };

    if (!product) return <div className="p-6 text-center">Loading...</div>;

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />

            <div className="flex flex-col md:flex-row max-w-5xl mx-auto my-8 bg-white shadow-xl rounded-xl overflow-hidden">
                <img src={product.image} alt={product.name} className="w-full md:w-1/2 object-cover h-96" />
                <div className="p-6 flex-1">
                    <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
                    <p className="text-gray-600 mb-2">Category: {product.category}</p>
                    <p className="text-xl font-semibold text-green-600 mb-4">₹{product.price}</p>
                    <p className="text-gray-700 mb-6">
                        {product.description || "No detailed description available."}
                    </p>
                    {isAlreadyInCart ? (
                        <button
                            onClick={() => navigate("/cart")}
                            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300"
                        >
                            Go to Cart
                        </button>
                    ) : (
                        <button
                            onClick={handleAddToCart}
                            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                        >
                            Add to Cart
                        </button>
                    )}
                </div>
            </div>

            <Footer />
        </div>
    );
}
