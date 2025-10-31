import express from "express";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import { upload } from "../config/cloudinary.js";
import { protect, admin } from "../middlewares/authMiddleware.js"; // 1. Import protect and admin

const router = express.Router();

router.post("/", protect, admin, upload.single("image"), createProduct);

router.get("/", getProducts);
router.get("/:id", getProductById);

router.delete("/:id", protect, admin, deleteProduct);

router.put("/:id", protect, admin, updateProduct);


export default router;



