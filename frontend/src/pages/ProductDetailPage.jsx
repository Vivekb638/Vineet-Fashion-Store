import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { useToast } from "../context/ToastContext.jsx";

const API_URL = import.meta.env.VITE_API_URL;

const ProductDetailPage = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [feedback, setFeedback] = useState("");

  const { id: productId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { user, token } = useAuth();
  const { showToast } = useToast();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`${API_URL}/products/${productId}`);
        setProduct(data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch product.");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  const addToCartHandler = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    addToCart(product._id, quantity);
    setFeedback("Added to cart!");
    setTimeout(() => setFeedback(""), 2000);
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`${API_URL}/products/${productId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        showToast("Product deleted successfully!", "success");
        navigate("/products");
      } catch (err) {
        showToast(err.response?.data?.message || "Failed to delete product.", "error");
      }
    }
  };

  if (loading)
    return (
      <div className="text-center text-xl mt-10 dark:text-white">
        Loading product...
      </div>
    );
  if (error)
    return (
      <div className="text-center text-xl mt-10 text-red-600">{error}</div>
    );
  if (!product)
    return (
      <div className="text-center text-xl mt-10 dark:text-white">
        Product not found.
      </div>
    );

  const formattedPrice = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(product.price);

  return (
    <div className="relative min-h-screen bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-10">
      {/* Floating Gradient Background Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.15),transparent_70%)] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <Link
          to="/products"
          className="text-blue-600 hover:underline mb-6 inline-block dark:text-blue-400"
        >
          &larr; Back to Products
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col md:flex-row gap-10 bg-white/30 dark:bg-gray-800/40 backdrop-blur-xl p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700"
        >
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="md:w-1/2 flex justify-center"
          >
            <img
              src={product.image.url}
              alt={product.name}
              className="w-full h-auto object-cover rounded-xl shadow-lg"
            />
          </motion.div>

          {/* Details */}
          <div className="md:w-1/2">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl font-bold text-gray-800 mb-4 dark:text-white"
            >
              {product.name}
            </motion.h1>

            <p className="text-sm text-gray-500 mb-4 capitalize dark:text-gray-400">
              Category: {product.category}
            </p>

            <p className="text-3xl font-light text-gray-900 mb-6 dark:text-gray-100">
              {formattedPrice}
            </p>

            <p className="text-base text-gray-600 mb-6 leading-relaxed dark:text-gray-300">
              {product.description}
            </p>

            <div className="border-t border-b py-4 dark:border-gray-700 mb-6">
              <div className="flex items-center justify-between">
                <span className="text-gray-700 font-medium dark:text-gray-300">
                  Status:
                </span>
                <span
                  className={
                    product.stock > 0 ? "text-green-500" : "text-red-500"
                  }
                >
                  {product.stock > 0 ? "In Stock" : "Out of Stock"}
                </span>
              </div>
            </div>

            {/* Add to Cart Section */}
            {product.stock > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="flex items-center gap-4">
                  <div className="flex items-center border rounded-lg dark:border-gray-700">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-4 py-2 text-lg font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 transition"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      readOnly
                      value={quantity}
                      className="w-16 text-center py-2 border-l border-r dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                    />
                    <button
                      onClick={() =>
                        setQuantity(Math.min(product.stock, quantity + 1))
                      }
                      className="px-4 py-2 text-lg font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 transition"
                    >
                      +
                    </button>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={addToCartHandler}
                    className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-medium shadow-md hover:bg-blue-700 dark:hover:bg-blue-500 transition"
                  >
                    Add to Cart
                  </motion.button>
                </div>

                {feedback && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-green-500 font-medium mt-4 text-center"
                  >
                    {feedback}
                  </motion.div>
                )}
              </motion.div>
            )}

            {/* Admin Action */}
            {user && user.role === "admin" && (
              <div className="mt-8 border-t pt-6 dark:border-gray-700">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Admin Actions
                </h3>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleDelete}
                  className="w-full mt-4 bg-red-600 text-white py-3 rounded-md font-medium shadow hover:bg-red-700 transition"
                >
                  Delete This Product
                </motion.button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
