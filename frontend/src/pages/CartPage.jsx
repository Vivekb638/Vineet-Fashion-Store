// import React from "react";
// import { useCart } from "../context/CartContext";
// import { useAuth } from "../context/AuthContext";
// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";

// const CartPage = () => {
//   const { cart, loading, removeFromCart } = useCart();
//   const { user } = useAuth();

//   const formatPrice = (price) => {
//     return new Intl.NumberFormat("en-IN", {
//       style: "currency",
//       currency: "INR",
//     }).format(price);
//   };

//   const subtotal = cart?.items.reduce(
//     (acc, item) => acc + item.productId.price * item.quantity,
//     0
//   );

//   if (loading && !cart) {
//     return (
//       <div className="text-center text-xl mt-10 text-gray-700 dark:text-gray-200">
//         Loading cart...
//       </div>
//     );
//   }

//   if (!user) {
//     return (
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="text-center mt-10"
//       >
//         <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-100">
//           Your cart is empty
//         </h2>
//         <p className="text-gray-600 dark:text-gray-400 mb-6">
//           Please log in to see your cart items.
//         </p>
//         <Link
//           to="/login"
//           className="bg-blue-600 text-white py-2 px-6 rounded-lg font-medium shadow-md hover:bg-blue-700 transition-all"
//         >
//           Login
//         </Link>
//       </motion.div>
//     );
//   }

//   if (!cart || cart.items.length === 0) {
//     return (
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="text-center mt-10"
//       >
//         <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-100">
//           Your cart is empty
//         </h2>
//         <p className="text-gray-600 dark:text-gray-400 mb-6">
//           Looks like you haven't added anything yet.
//         </p>
//         <Link
//           to="/products"
//           className="bg-blue-600 text-white py-2 px-6 rounded-lg font-medium shadow-md hover:bg-blue-700 transition-all"
//         >
//           Start Shopping
//         </Link>
//       </motion.div>
//     );
//   }

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       className="container mx-auto p-6 md:p-10 dark:bg-gray-900 min-h-screen transition-colors"
//     >
//       <motion.h1
//         initial={{ x: -50, opacity: 0 }}
//         animate={{ x: 0, opacity: 1 }}
//         className="text-4xl font-extrabold text-gray-900 dark:text-gray-100 mb-10 text-center"
//       >
//         🛒 Your Shopping Cart
//       </motion.h1>

//       <div className="flex flex-col lg:flex-row gap-10">
//         {/* Cart Items */}
//         <motion.div
//           initial={{ x: -40, opacity: 0 }}
//           animate={{ x: 0, opacity: 1 }}
//           className="lg:w-2/3 bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden"
//         >
//           <ul className="divide-y divide-gray-200 dark:divide-gray-700">
//             {cart.items.map((item) => (
//               <motion.li
//                 key={item.productId._id}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.4 }}
//                 className="flex flex-col sm:flex-row p-5 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
//               >
//                 <img
//                   src={item.productId.image.url}
//                   alt={item.productId.name}
//                   className="w-full sm:w-28 h-28 object-cover rounded-lg shadow-md mb-4 sm:mb-0 sm:mr-5"
//                 />
//                 <div className="flex-1 flex flex-col justify-between">
//                   <div>
//                     <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
//                       {item.productId.name}
//                     </h3>
//                     <p className="text-sm text-gray-600 dark:text-gray-400">
//                       {item.productId.category}
//                     </p>
//                   </div>
//                   <div className="flex items-center justify-between mt-3">
//                     <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
//                       {formatPrice(item.productId.price)}
//                       <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">
//                         × {item.quantity}
//                       </span>
//                     </p>
//                     <button
//                       onClick={() => removeFromCart(item.productId._id)}
//                       className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 font-medium text-sm transition"
//                     >
//                       Remove
//                     </button>
//                   </div>
//                 </div>
//               </motion.li>
//             ))}
//           </ul>
//         </motion.div>

//         {/* Order Summary */}
//         <motion.div
//           initial={{ x: 40, opacity: 0 }}
//           animate={{ x: 0, opacity: 1 }}
//           className="lg:w-1/3 bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 sticky top-24"
//         >
//           <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 border-b border-gray-300 dark:border-gray-700 pb-4 mb-4">
//             Order Summary
//           </h2>

//           <div className="flex justify-between mb-3">
//             <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
//             <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">
//               {formatPrice(subtotal)}
//             </span>
//           </div>

//           <div className="flex justify-between mb-3">
//             <span className="text-gray-600 dark:text-gray-400">Shipping</span>
//             <span className="text-gray-900 dark:text-gray-100">Free</span>
//           </div>

//           <div className="border-t border-gray-300 dark:border-gray-700 pt-4 flex justify-between items-center">
//             <span className="text-xl font-bold text-gray-900 dark:text-gray-100">
//               Total
//             </span>
//             <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
//               {formatPrice(subtotal)}
//             </span>
//           </div>

//           <Link
//             to="/checkout"
//             className="block text-center w-full bg-blue-600 text-white py-3 rounded-lg font-semibold mt-6 shadow-md hover:bg-blue-700 dark:hover:bg-blue-500 transition"
//           >
//             Proceed to Checkout
//           </Link>
//         </motion.div>
//       </div>
//     </motion.div>
//   );
// };

// export default CartPage;




import React from "react";
import { useCart } from "../context/CartContext.jsx"; // 1. Make sure paths are correct
import { useAuth } from "../context/AuthContext.jsx"; // 1. Make sure paths are correct
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const CartPage = () => {
  // 2. Get the new updateQuantity function from the context
  const { cart, loading, removeFromCart, updateQuantity } = useCart();
  const { user } = useAuth();

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(price);
  };

  const subtotal = cart?.items.reduce(
    (acc, item) => acc + item.productId.price * item.quantity,
    0
  );

 

  if (loading && !cart) {
    return (
      <div className="text-center text-xl mt-10 text-gray-700 dark:text-gray-200">
        Loading cart...
      </div>
    );
  }

  if (!user) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mt-10"
      >
        <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-100">
          Your cart is empty
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Please log in to see your cart items.
        </p>
        <Link
          to="/login"
          className="bg-blue-600 text-white py-2 px-6 rounded-lg font-medium shadow-md hover:bg-blue-700 transition-all"
        >
          Login
        </Link>
      </motion.div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mt-10"
      >
        <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-100">
          Your cart is empty
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Looks like you haven't added anything yet.
        </p>
        <Link
          to="/products"
          className="bg-blue-600 text-white py-2 px-6 rounded-lg font-medium shadow-md hover:bg-blue-700 transition-all"
        >
          Start Shopping
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto p-6 md:p-10 dark:bg-gray-900 min-h-screen transition-colors"
    >
      <motion.h1
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="text-4xl font-extrabold text-gray-900 dark:text-gray-100 mb-10 text-center"
      >
        🛒 Your Shopping Cart
      </motion.h1>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Cart Items */}
        <motion.div
          initial={{ x: -40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="lg:w-2/3 bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden"
        >
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {cart.items.map((item) => (
              <motion.li
                key={item.productId._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col sm:flex-row p-5 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
              >
                <img
                  src={item.productId.image.url}
                  alt={item.productId.name}
                  className="w-full sm:w-28 h-28 object-cover rounded-lg shadow-md mb-4 sm:mb-0 sm:mr-5"
                />
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      {item.productId.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {item.productId.category}
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    
                    {/* 4. HERE ARE THE NEW QUANTITY CONTROLS */}
                    <div className="flex items-center border rounded-md dark:border-gray-600">
                      <button
                        onClick={() => updateQuantity(item.productId._id, item.quantity - 1)}
                        disabled={item.quantity <= 1 || loading} // Disable button if quantity is 1 or if loading
                        className="px-3 py-1 text-lg font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-l-md disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        -
                      </button>
                      <span className="w-12 text-center py-1 border-l border-r dark:border-gray-600 text-gray-900 dark:text-gray-100">
                        {loading ? '...' : item.quantity}
                      </span>
                      <button
                        // Disable if quantity is already at max stock
                        disabled={item.quantity >= item.productId.stock || loading}
                        onClick={() => updateQuantity(item.productId._id, item.quantity + 1)}
                        className="px-3 py-1 text-lg font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-r-md disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        +
                      </button>
                    </div>

                    {/* 5. This section aligns price and remove button vertically */}
                    <div className="flex flex-col items-end">
                      <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                        {/* Show total price for this item */}
                        {formatPrice(item.productId.price * item.quantity)}
                      </p>
                      <button
                        onClick={() => removeFromCart(item.productId._id)}
                        disabled={loading} // Disable while loading
                        className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 font-medium text-sm transition mt-1 disabled:opacity-50"
                      >
                        Remove
                      </button>
                    </div>
                    
                  </div>
                </div>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Order Summary */}
        <motion.div
          initial={{ x: 40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="lg:w-1/3 bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 sticky top-24 h-fit" // Added h-fit
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 border-b border-gray-300 dark:border-gray-700 pb-4 mb-4">
            Order Summary
          </h2>

          <div className="flex justify-between mb-3">
            <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
            <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {formatPrice(subtotal)}
            </span>
          </div>

          <div className="flex justify-between mb-3">
            <span className="text-gray-600 dark:text-gray-400">Shipping</span>
            <span className="text-gray-900 dark:text-gray-100">Free</span>
          </div>

          <div className="border-t border-gray-300 dark:border-gray-700 pt-4 flex justify-between items-center">
            <span className="text-xl font-bold text-gray-900 dark:text-gray-100">
              Total
            </span>
            <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
              {formatPrice(subtotal)}
            </span>
          </div>

          <Link
            to="/checkout"
            className={`block text-center w-full bg-blue-600 text-white py-3 rounded-lg font-semibold mt-6 shadow-md hover:bg-blue-700 dark:hover:bg-blue-500 transition ${
              loading ? 'opacity-50 cursor-not-allowed' : '' // Disable checkout if cart is updating
            }`}
            onClick={(e) => { if (loading) e.preventDefault(); }} // Prevent click if loading
          >
            Proceed to Checkout
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CartPage;


