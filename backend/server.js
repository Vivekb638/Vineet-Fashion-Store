import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import multer from "multer";
import connectDB from "./config/db.js";

// Import Routes
import cartRoutes from "./routes/cartRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use("/api/cart", cartRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("✅ Vineet Fashion Store Backend is running successfully!");
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("--- GLOBAL ERROR HANDLER CAUGHT ---");
  console.error(err);

  if (err instanceof multer.MulterError) {
    return res.status(400).json({ message: `File upload error: ${err.message}` });
  }

  if (err.http_code) {
    return res.status(err.http_code).json({ message: `Cloudinary error: ${err.message}` });
  }

  res.status(500).json({
    message: "An unknown server error occurred.",
    error: err.message || "Unknown error",
  });
});

// Export app for Vercel serverless function
export default app;
