import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

const PaymentSuccessPage = () => {
  useEffect(() => {
    // 🎉 Confetti effect on load
    const duration = 3 * 1000; // 3 seconds
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 60,
        origin: { x: 0 },
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 60,
        origin: { x: 1 },
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  }, []);

  // 🧾 Simulated order data (you can fetch this dynamically later)
  const order = {
    id: 'ORD12345678',
    date: new Date().toLocaleDateString(),
    amount: '₹1,299.00',
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center text-center py-20 bg-white dark:bg-gray-900 min-h-screen"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {/* ✅ Success Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 120 }}
        className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6"
      >
        <svg
          className="w-16 h-16 text-green-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
        </svg>
      </motion.div>

      <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">
        Payment Successful! 🎉
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
        Thank you for your purchase. Your payment has been processed successfully.
      </p>

      {/* 🧾 Order Summary */}
      <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 mb-8 shadow-md w-80 text-left">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
          Order Summary
        </h2>
        <p className="text-gray-700 dark:text-gray-300">
          <span className="font-medium">Order ID:</span> {order.id}
        </p>
        <p className="text-gray-700 dark:text-gray-300">
          <span className="font-medium">Date:</span> {order.date}
        </p>
        <p className="text-gray-700 dark:text-gray-300">
          <span className="font-medium">Total Amount:</span> {order.amount}
        </p>
      </div>

      {/* ✅ Buttons */}
      <div className="flex space-x-4">
        <Link
          to="/profile"
          className="px-6 py-3 bg-green-600 text-white rounded-md font-medium hover:bg-green-700 transition"
        >
          View Orders
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

export default PaymentSuccessPage;
