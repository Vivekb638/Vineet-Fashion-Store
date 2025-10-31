// import express from "express";
// import {
//   createProduct,
//   getProducts,
//   getProductById,
//   updateProduct,
//   deleteProduct,
// } from "../controllers/productController.js";

// const router = express.Router();

// // Product routes
// router.post("/", createProduct);
// router.get("/", getProducts);
// router.get("/:id", getProductById);
// router.put("/:id", updateProduct);
// router.delete("/:id", deleteProduct);

// export default router;


import express from "express";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import { upload } from "../config/cloudinary.js"; // 1. Import upload

const router = express.Router();

// 2. Add 'upload.single("image")' middleware to the POST route
// This tells multer to look for a file in a form field named "image"
router.post("/", upload.single("image"), createProduct);

router.get("/", getProducts);
router.get("/:id", getProductById);
router.delete("/:id", deleteProduct);

// We can add update later
// router.put("/:id", upload.single("image"), updateProduct); 
router.put("/:id", updateProduct); // Keep as-is for now

export default router;

