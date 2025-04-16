import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";

function DisplayProducts() {
    const [products, setProducts] = useState([]);
    const [userCart, setUserCart] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:3000/products")
            .then((res) => {
                setProducts(res.data);
            })
            .catch((error) => console.error("Some Error on fetching products:", error));
    }, []);

    useEffect(() => {
        const fetchUserCart = async () => {
            const userId = localStorage.getItem("userId");
            if (userId) {
                try {
                    const res = await axios.get(`http://localhost:3000/users/${userId}`);
                    setUserCart(res.data.cart || []);
                } catch (err) {
                    console.error("Error fetching user cart:", err);
                }
            }
        }

        fetchUserCart();
    }, []);

    const handleAddToCart = async (product) => {
        const userId = localStorage.getItem("userId");

        if (!userId) {
            await Swal.fire({
                icon: 'info',
                title: 'Login Required',
                text: 'Please login to add items to your cart!',
                confirmButtonText: 'OK',
                allowOutsideClick: false,
                allowEscapeKey: false,
            });
        } else {
            try {
                const res = await axios.get(`http://localhost:3000/users/${userId}`);
                const user = res.data;

                const updatedCart = [...user.cart, product];

                await axios.patch(`http://localhost:3000/users/${userId}`, {
                    cart: updatedCart,
                });

                setUserCart(updatedCart); 

                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Product added to cart!',
                    confirmButtonText: "Ok"
                });
            } catch (err) {
                alert("An error occurred while adding to cart: " + err.message);
            }
        }
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
            {products.map((product) => {
                const alreadyInCart = userCart.find((item) => item.id === product.id);

                return (
                    <div key={product.id} className="bg-gray-200 p-4 rounded-lg shadow-md flex flex-col items-center">
                        <Link to={`/product/${product.id}`} className="w-full flex flex-col items-center">
                            <img src={product.image} alt={product.name} className="h-[280px] w-full object-contain rounded-lg" />
                            <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
                            <p className="text-gray-600">Price: ₹{product.price}</p>
                        </Link>
                        {alreadyInCart ? (
                            <button
                                className="mt-3 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                                onClick={() => navigate('/cart')}
                            >
                                Go to Cart
                            </button>
                        ) : (
                            <button
                                className="mt-3 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                                onClick={() => handleAddToCart(product)}
                            >
                                Add to Cart
                            </button>
                        )}
                    </div>
                );
            })}
        </div>
    );
}

export default DisplayProducts;
