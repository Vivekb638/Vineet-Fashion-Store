// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import ProductCard from '../components/ProductCard'; // 1. Import ProductCard

// // Get the API URL from our .env file
// const API_URL = import.meta.env.VITE_API_URL;

// // TODO: Remember to add your hero image to this path
// const heroImageUrl = '/src/assets/hero-background.jpg'; 

// const HomePage = () => {
//   // 2. Add state for featured products
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // 3. Add useEffect to fetch products on load
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         setLoading(true);
//         setError(null);
//         // This calls your backend route: GET /api/products
//         const { data } = await axios.get(`${API_URL}/products`);
        
//         // We'll just feature the first 4 products
//         setProducts(data.slice(0, 4)); 
//       } catch (err) {
//         setError('Failed to load featured products.');
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []); // The empty array [] means this runs once

//   return (
//     // We add space-y-16 to create a nice gap between sections
//     <div className="container mx-auto space-y-16">
      
//       {/* Hero Section */}
//       <section 
//         className="relative bg-cover bg-center h-[60vh] min-h-[400px] rounded-lg overflow-hidden flex items-center justify-center text-center text-white px-4 shadow-lg"
//         style={{ backgroundImage: `url(${heroImageUrl})` }}
//       >
//         {/* Dark Overlay */}
//         <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
        
//         {/* Hero Content */}
//         <div className="relative z-20 max-w-2xl">
//           <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
//             Welcome to Vineet Fashion
//           </h1>
//           <p className="text-lg sm:text-xl md:text-2xl mb-8" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
//             Discover the Latest Trends in Men's and Women's Apparel
//           </p>
//           <Link 
//             to="/products" 
//             className="px-8 py-3 bg-blue-600 text-white text-lg font-medium rounded-md hover:bg-blue-700 transition duration-300"
//           >
//             Shop Now
//           </Link>
//         </div>
//       </section>

//       {/* 4. NEW: Featured Products Section */}
//       <section>
//         <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
//           Featured Products
//         </h2>
        
//         {/* Handle loading and error states */}
//         {loading && <div className="text-center text-xl">Loading featured products...</div>}
//         {error && <div className="text-center text-xl text-red-600">{error}</div>}
        
//         {/* Product Grid */}
//         {!loading && !error && (
//           // This grid shows 1 column on mobile, 2 on tablet, and 4 on desktop
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//             {products.map((product) => (
//               <ProductCard key={product._id} product={product} />
//             ))}
//           </div>
//         )}
//       </section>
      
//     </div>
//   );
// };

// export default HomePage;


import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import ProductCard from "../components/ProductCard";

// ✅ Environment Variables
const API_URL = import.meta.env.VITE_API_URL;

// ✅ Hero Image (import instead of using /src path)
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
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 text-white space-y-20 py-10">
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
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-pink-500 to-purple-500 drop-shadow-lg">
            Welcome to Vineet Fashion World
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed">
            Discover fresh styles, timeless elegance, and the best of modern
            fashion — curated just for you.
          </p>

          <motion.div whileHover={{ scale: 1.05 }}>
            <Link
              to="/products"
              className="px-10 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-lg font-semibold rounded-full shadow-lg hover:shadow-2xl transition duration-300"
            >
              🛍️ Explore Now
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* 🛒 Featured Products Section */}
      <section className="container mx-auto px-6">
        <motion.h2
          className="text-4xl font-bold text-center mb-10 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
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
