const Product = require('../model/productSchema')
const { cloudinary } = require('../utils/cloudinary')


exports.AddProduct = (async (req, res) => {
    try {
        const { name, price, category, stock, description } = req.body

        const image = req.file?.path

        if (!name || !price || !image || !category || !stock || !description) {
            return res.status(400).json({ message: "All fields are required" })
        }
        const newProduct = new Product({
            name,
            price,
            image,
            category,
            stock,
            description,
        })

        await newProduct.save()

        res.status(201).json({ message: "Product added successfully", product: newProduct })
    }
    catch (err) {
        res.status(500).json({ message: "Something went wrong", error: err.message });
    }
})


exports.DeleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const imageUrl = product.image;

    const publicId = imageUrl.split('/').pop().split('.')[0]; 
    await cloudinary.uploader.destroy(`products/${publicId}`);

    await Product.findByIdAndDelete(productId);

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Delete error:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
}


exports.EditProduct = async (req, res) => {
  try {
    const productId = req.params.id

    const existingProduct = await Product.findById(productId)
    if (!existingProduct) {
      return res.status(404).json({ message: "Product not found" })
    }

    const { name, price, category, stock, description } = req.body

    const updatedData = {
      name: name || existingProduct.name,
      price: price || existingProduct.price,
      category: category || existingProduct.category,
      stock: stock || existingProduct.stock,
      description: description || existingProduct.description
    }

    const updatedProduct = await Product.findByIdAndUpdate(productId, updatedData, { new: true })

    res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
    })

  } catch (error) {
    console.error("Edit error:", error.message);
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

