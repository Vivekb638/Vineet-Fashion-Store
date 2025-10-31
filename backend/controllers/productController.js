import Product from "../models/Product.js";
import { cloudinary } from "../config/cloudinary.js"; // Import cloudinary

//  Create a Product
export const createProduct = async (req, res, next) => { // Added 'next'
  try {
    const { name, description, price, category, stock } = req.body;

    // Check if file was uploaded
    if (!req.file) {
      return res.status(400).json({ message: "Please upload an image" });
    }

    // Create the product with image URL and public_id from Cloudinary
    const product = new Product({
      name,
      description,
      price,
      category,
      stock,
      image: {
        url: req.file.path, // URL from Cloudinary
        public_id: req.file.filename, // public_id from Cloudinary
      },
    });

    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error("DETAILED ERROR in createProduct:", error);
    next(error); 
  }
};

//  Get All Products
export const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error("DETAILED ERROR in getProducts:", error);
    next(error);
  }
};

//  Get Single Product by ID
export const getProductById = async (req, res, next) => { 
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.error("DETAILED ERROR in getProductById:", error);
    next(error);
  }
};

//  Update Product
export const updateProduct = async (req, res, next) => { 
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedProduct);
  } catch (error) {
    console.error("DETAILED ERROR in updateProduct:", error);
    next(error);
  }
};

//  Delete Product
export const deleteProduct = async (req, res, next) => { 
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(4.04).json({ message: "Product not found" });
    }

    // 1. Delete image from Cloudinary
    await cloudinary.uploader.destroy(product.image.public_id);

    // 2. Delete product from MongoDB
    await product.deleteOne(); // Replaced findByIdAndDelete

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("DETAILED ERROR in deleteProduct:", error);
    next(error);
  }
};

