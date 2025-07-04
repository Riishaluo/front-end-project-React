const Product = require("../model/productSchema");

exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
};


//categorized
exports.getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;

    console.log(category)

    const validCategories = ['sofa', 'bed', 'dining'];
    if (!validCategories.includes(category)) {
      return res.status(400).json({ message: "Invalid category" });
    }

    const products = await Product.find({ category });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}