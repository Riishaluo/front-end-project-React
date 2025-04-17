import { createContext, useState, useEffect } from "react"
import axios from "axios"

export const ProductContext = createContext()

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([])

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:3000/products")
      setProducts(res.data)
    } catch (error) {
      console.error("Error fetching products:", error)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/products/${id}`)
      setProducts((prev) => prev.filter((product) => product.id !== id))
      alert("Item deleted")
    } catch (err) {
      alert(err)
    }
  }

  const addProduct = async (newProduct) => {
    try {
      await axios.post("http://localhost:3000/products", newProduct)
      fetchProducts()
    } catch (err) {
      alert(err)
    }
  }

  return (
    <ProductContext.Provider value={{ products, deleteProduct, addProduct }}>
      {children}
    </ProductContext.Provider>
  )
}
