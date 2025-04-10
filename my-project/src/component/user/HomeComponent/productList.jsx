import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2"
import {Link} from "react-router-dom"

function DisplayProducts() {
    const [products, setProducts] = useState([]);

    console.log(products)

    useEffect(() => {
        axios.get("http://localhost:3000/products")
            .then((res) => {
                setProducts(res.data)
                console.log(res.data)
            })
            .catch((error) => console.error("Some Error on  fetching products:", error));
    }, []);

    const handleAddToCart = async (product) => {
        const userId = localStorage.getItem("userId");
        console.log(userId);

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

                const alreadyInCart = user.cart.find((item) => item.id === product.id);

                if (alreadyInCart) {
                    await Swal.fire({
                        icon: 'info',
                        title: 'Already in Cart',
                        text: 'This item is already in your cart!',
                        confirmButtonText: 'OK',
                    });
                } else {
                    const updatedCart = [...user.cart, product];

                    await axios.patch(`http://localhost:3000/users/${userId}`, {
                        cart: updatedCart,
                    });
                    
                        Swal.fire({
                            icon: 'success',
                            title: 'Success',
                            text: 'Product added to cart!',
                            confirmButtonText: "Ok"
                        },2000);

                }
            } catch (err) {
                alert("An error occurred while adding to cart: " + err.message);
            }
        }
    };



    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
            {products.map((product) => (
                <div key={product.id} className="bg-gray-200 p-4 rounded-lg shadow-md flex flex-col items-center">
                    <Link to={`/product/${product.id}`} className="w-full flex flex-col items-center">
                        <img src={product.image} alt={product.name} className="h-[280px] w-full object-contain rounded-lg" />
                        <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
                        <p className="text-gray-600">Price: ₹{product.price}</p>
                    </Link>
                    <button
                        className="mt-3 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                        onClick={() => handleAddToCart(product)}
                    >
                        Add to Cart
                    </button>
                </div>
            ))}
        </div>
    );
}

export default DisplayProducts;
