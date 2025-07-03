import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:9999/admin/admin-products");
      setProducts(res.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteProduct = async (id) => {
    try {
      await axios.post(`http://localhost:9999/admin/deleteProduct/${id}`);
      setProducts((prev) => prev.filter((p) => p._id !== id));
      alert("Item deleted");
    } catch (err) {
      alert("Failed to delete");
    }
  };

  const addProduct = async (formData) => {
    try {
      await axios.post("http://localhost:9999/admin/addProduct", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      fetchProducts();
    } catch (err) {
      console.error("Add product error:", err);
      alert("Failed to add product");
    }
  };

  return (
    <ProductContext.Provider value={{ products, deleteProduct, addProduct }}>
      {children}
    </ProductContext.Provider>
  );
};
