import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";

function DisplayProducts() {
  const [products, setProducts] = useState([]);
  const [userCart, setUserCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:9999/")
        setProducts(res.data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
        if (error.response?.status === 401) {
          navigate("/login");
        }
      }
    };

    const fetchCart = async () => {
      try {
        const res = await axios.get("http://localhost:9999/cart", {
          withCredentials: true,
        });
        setUserCart(res.data.product || []);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };

    fetchProducts();
    fetchCart();
  }, [navigate]);

  const handleAddToCart = async (product) => {
    try {
      const res = await axios.post(
        "http://localhost:9999/add-to-cart",
        { productId: product._id, quantity: 1 },
        {
          withCredentials: true,
        }
      );

      setUserCart((prev) => [
        ...prev,
        { product: product._id, quantity: 1, price: product.price },
      ]);

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Product added to cart!",
        confirmButtonText: "Ok",
      });
    } catch (err) {
      if (err.response?.status === 401) {
        Swal.fire({
          icon: "info",
          title: "Login Required",
          text: "Please login to add items to your cart!",
          confirmButtonText: "OK",
        }).then(() => navigate("/login"));
      } else {
        console.error("Error adding to cart:", err);
        alert("An error occurred while adding to cart.");
      }
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
      {products.map((product) => {
        const alreadyInCart = userCart.find(
          (item) =>
            item.product === product._id || item.product._id === product._id
        );

        return (
          <div
            key={product._id}
            className="bg-gray-200 p-4 rounded-lg shadow-md flex flex-col items-center"
          >
            <Link
              to={`/product/${product._id}`}
              className="w-full flex flex-col items-center"
            >
              <img
                src={product.image}
                alt={product.name}
                className="h-[280px] w-full object-contain rounded-lg"
              />
              <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
              <p className="text-gray-600">Price: ₹{product.price}</p>
            </Link>
            {alreadyInCart ? (
              <button
                className="mt-3 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                onClick={() => navigate("/cart")}
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
