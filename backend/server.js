import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
// We don't need body-parser, express has it built-in
import connectDB from "./config/db.js";
import multer from 'multer'; // Import multer
// import paymentRoutes from "./routes/paymentRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
dotenv.config();
connectDB();

const app = express();
// Middleware 
app.use(cors());

// Use express.json() and urlencoded for routes that need them.
// We apply them *before* the routes.
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));


// routes 
app.use("/api/cart", cartRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes); // Multer will handle this route's body


app.get("/", (req, res) => {
  res.send("Vineet Fashion Store API is running...");
});

// --- GLOBAL ERROR HANDLER ---
// This *must* be at the very end, after all app.use() routes
app.use((err, req, res, next) => {
  console.error("--- GLOBAL ERROR HANDLER CAUGHT: ---");
  console.error(err); // This will print the full error, not [object Object]
  
  // Check for Multer-specific errors
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ message: `File upload error: ${err.message}` });
  }
  
  // Check for Cloudinary API errors (they often have an http_code)
  if (err.http_code) {
     return res.status(err.http_code).json({ message: `Cloudinary error: ${err.message}` });
  }

  // Generic error
  res.status(500).json({
    message: "An unknown server error occurred.",
    error: err.message || 'Unknown error'
  });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Server started on port ${PORT}`));

