import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const PaymentCancelPage = () => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center text-center py-20 bg-white dark:bg-gray-900 min-h-screen"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {/* ❌ Warning Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 120 }}
        className="w-24 h-24 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-6 shadow-md"
      >
        <svg
          className="w-16 h-16 text-red-600 dark:text-red-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      </motion.div>

      <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">
        Payment Cancelled
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
        Your payment was not completed. Don’t worry — your items are still in your cart.
      </p>

      {/* 💡 Helpful Tip Box */}
      <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 mb-8 shadow-md w-80 text-left">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
          What You Can Do
        </h2>
        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
          <li>Review your cart before trying again.</li>
          <li>Ensure your payment method is valid.</li>
          <li>Contact support if the issue persists.</li>
        </ul>
      </div>

      {/* 🔘 Buttons */}
      <div className="flex space-x-4">
        <Link
          to="/cart"
          className="px-6 py-3 bg-red-600 text-white rounded-md font-medium hover:bg-red-700 transition"
        >
          Back to Cart
        </Link>
        <Link
          to="/products"
          className="px-6 py-3 bg-gray-200 text-gray-800 rounded-md font-medium hover:bg-gray-300 transition dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
        >
          Continue Shopping
        </Link>
      </div>
    </motion.div>
  );
};

export default PaymentCancelPage;
