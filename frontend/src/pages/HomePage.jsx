import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import ProductCard from "../components/ProductCard";

const API_URL = import.meta.env.VITE_API_URL;

import heroImage from "../assets/03.jpg";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const { data } = await axios.get(`${API_URL}/products`);
        setProducts(data.slice(0, 4)); // Feature first 4
      } catch (err) {
        setError("Failed to load featured products.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-r from-gray-950 via-gray-900 to-gray-800 text-white space-y-20 py-10">
      {/* 🌟 Hero Section */}
      <section
        className="relative bg-cover bg-center h-[70vh] rounded-3xl overflow-hidden flex items-center justify-center text-center shadow-2xl"
        style={{
          backgroundImage: `url(${heroImage})`,
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

        {/* Hero Content */}
        <motion.div
          className="relative z-10 max-w-2xl px-6"
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-4 text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-pink-500 to-purple-500 drop-shadow-lg">
            Welcome to Vineet Fashion World
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed">
            Discover fresh styles, timeless elegance, and the best of modern
            fashion — curated just for you.
          </p>

          <motion.div whileHover={{ scale: 1.05 }}>
            <Link
              to="/products"
              className="px-10 py-4 bg-linear-to-r from-blue-500 to-purple-600 text-white text-lg font-semibold rounded-full shadow-lg hover:shadow-2xl transition duration-300"
            >
              🛍️ Explore Now
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* 🛒 Featured Products Section */}
      <section className="container mx-auto px-6">
        <motion.h2
          className="text-4xl font-bold text-center mb-10 bg-linear-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Featured Collection
        </motion.h2>

        {loading && (
          <motion.div
            className="text-center text-xl text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Loading featured products...
          </motion.div>
        )}

        {error && (
          <div className="text-center text-xl text-red-500 font-medium">
            {error}
          </div>
        )}

        {!loading && !error && (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { staggerChildren: 0.1 },
              },
            }}
          >
            {products.map((product) => (
              <motion.div
                key={product._id}
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>
    </div>
  );
};

export default HomePage;
