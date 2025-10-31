// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import ProductCard from '../components/ProductCard.jsx';
// // 1. Import useToast and useAuth
// import { useToast } from '../context/ToastContext.jsx';
// import { useAuth } from '../context/AuthContext.jsx';

// // Get the API URL from our .env file
// const API_URL = import.meta.env.VITE_API_URL;

// const ProductsPage = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
  
//   // 2. Get toast and auth functions
//   const { showToast } = useToast();
//   // We need the token to authorize the delete request
//   const { token } = useAuth(); 

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         setLoading(true);
//         setError(null);
//         // This calls your backend route: GET /api/products
//         const { data } = await axios.get(`${API_URL}/products`);
//         setProducts(data);
//       } catch (err) {
//         setError(err.response?.data?.message || 'Failed to fetch products.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []); // The empty array [] means this runs once when the component mounts

//   // 3. Create the delete handler function
//   const handleProductDeleted = async (productId) => {
//     try {
//       // Call the delete API with auth token
//       // 
//       await axios.delete(`${API_URL}/products/${productId}`, {
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });
      
//       // Update the product list in the state to remove the deleted item
//       setProducts(currentProducts => 
//         currentProducts.filter(p => p._id !== productId)
//       );
      
//       showToast('Product deleted successfully!', 'success');
//     } catch (err) {
//       showToast(err.response?.data?.message || 'Failed to delete product.', 'error');
//     }
//   };

//   // Show loading state
//   if (loading) {
//     return <div className="text-center text-xl mt-10 dark:text-white">Loading products...</div>;
//   }

//   // Show error state
//   if (error) {
//     return <div className="text-center text-xl mt-10 text-red-600">{error}</div>;
//   }

//   return (
//     <div className="container mx-auto">
//       <h1 className="text-3xl font-bold text-gray-800 mb-8 dark:text-white">
//         All Products
//       </h1>
      
//       {/* Responsive Product Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//         {products.map((product) => (
//           <ProductCard 
//             key={product._id} 
//             product={product} 
//             // 4. Pass the handler function as a prop
//             onProductDeleted={handleProductDeleted}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ProductsPage;


import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import ProductCard from "../components/ProductCard.jsx";
import { useToast } from "../context/ToastContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";

const API_URL = import.meta.env.VITE_API_URL;

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { showToast } = useToast();
  const { token } = useAuth();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`${API_URL}/products`);
        setProducts(data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch products.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleProductDeleted = async (productId) => {
    try {
      await axios.delete(`${API_URL}/products/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts((prev) => prev.filter((p) => p._id !== productId));
      showToast("Product deleted successfully!", "success");
    } catch (err) {
      showToast(err.response?.data?.message || "Failed to delete product.", "error");
    }
  };

  if (loading)
    return (
      <div className="text-center text-xl mt-10 dark:text-white">
        Loading products...
      </div>
    );

  if (error)
    return (
      <div className="text-center text-xl mt-10 text-red-600">{error}</div>
    );

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12">
      {/* Soft Gradient Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.12),transparent_60%)] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-extrabold text-gray-900 mb-10 dark:text-white text-center"
        >
          Our Latest Products
        </motion.h1>

        {/* Glassmorphic Card Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          {products.map((product, index) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className="bg-white/30 dark:bg-gray-800/40 backdrop-blur-xl rounded-2xl shadow-lg hover:shadow-2xl border border-gray-200 dark:border-gray-700 transition-all"
            >
              <ProductCard
                product={product}
                onProductDeleted={handleProductDeleted}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* If No Products */}
        {products.length === 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-gray-500 mt-10 dark:text-gray-400"
          >
            No products available at the moment.
          </motion.p>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
