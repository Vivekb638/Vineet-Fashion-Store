// import React, { useState, useEffect } from 'react';
// import { loadStripe } from '@stripe/stripe-js';
// import { Elements } from '@stripe/react-stripe-js';
// import axios from 'axios';
// import { useCart } from '../context/CartContext';
// import CheckoutForm from './CheckoutForm.jsx';

// // Get Stripe key and API URL from .env
// const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
// const API_URL = import.meta.env.VITE_API_URL;

// const CheckoutPage = () => {
//   const [clientSecret, setClientSecret] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const { cart } = useCart();

//   useEffect(() => {
//     const createPaymentIntent = async () => {
//       if (!cart || cart.items.length === 0) {
//         setError('Your cart is empty.');
//         setLoading(false);
//         return;
//       }

//       // 1. Calculate the total amount (in base currency, e.g., rupees)
//       const subtotal = cart.items.reduce(
//         (acc, item) => acc + item.productId.price * item.quantity,
//         0
//       );
      
//       try {
//         // 2. Ask your backend to create a payment intent
//         // This calls: POST /api/payment/create-payment-intent
//         const { data } = await axios.post(`${API_URL}/payment/create-payment-intent`, {
//           amount: subtotal, // Your backend expects 'amount'
//         });

//         // 3. Save the clientSecret from the response
//         setClientSecret(data.clientSecret);
//       } catch (err) {
//         console.error(err);
//         setError('Failed to initialize payment. Please try again.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     createPaymentIntent();
//   }, [cart]);

//   // Options for the Stripe Elements provider
//   const appearance = {
//     theme: 'stripe',
//   };
//   const options = {
//     clientSecret,
//     appearance,
//   };

//   if (loading) {
//     return <div className="text-center text-xl mt-10">Loading checkout...</div>;
//   }

//   if (error) {
//     return <div className="text-center text-xl mt-10 text-red-600">{error}</div>;
//   }

//   return (
//     <div className="max-w-xl mx-auto">
//       <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Checkout</h1>
//       {clientSecret && (
//         <Elements options={options} stripe={stripePromise}>
//           {/* CheckoutForm will go here */}
//           <CheckoutForm />
//         </Elements>
//       )}
//     </div>
//   );
// };

// export default CheckoutPage;


import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { motion } from "framer-motion";
import CheckoutForm from "./CheckoutForm.jsx";

// Get Stripe key and API URL from .env
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
const API_URL = import.meta.env.VITE_API_URL;

const CheckoutPage = () => {
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { cart } = useCart();

  useEffect(() => {
    const createPaymentIntent = async () => {
      if (!cart || cart.items.length === 0) {
        setError("Your cart is empty.");
        setLoading(false);
        return;
      }

      const subtotal = cart.items.reduce(
        (acc, item) => acc + item.productId.price * item.quantity,
        0
      );

      try {
        const { data } = await axios.post(
          `${API_URL}/payment/create-payment-intent`,
          { amount: subtotal }
        );
        setClientSecret(data.clientSecret);
      } catch (err) {
        console.error(err);
        setError("Failed to initialize payment. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    createPaymentIntent();
  }, [cart]);

  const appearance = { theme: "stripe" };
  const options = { clientSecret, appearance };

  // --- Loading State ---
  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors"
      >
        <div className="text-xl text-gray-700 dark:text-gray-300 animate-pulse">
          Loading checkout...
        </div>
      </motion.div>
    );
  }

  // --- Error State ---
  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900"
      >
        <div className="bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 p-6 rounded-xl shadow-lg">
          {error}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center px-6 py-10 transition-colors"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="w-full max-w-lg bg-white dark:bg-gray-800 shadow-2xl rounded-2xl p-8 border border-gray-100 dark:border-gray-700"
      >
        <h1 className="text-3xl font-extrabold text-center mb-6 text-gray-900 dark:text-gray-100">
          🛒 Secure Checkout
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
          Review your order and complete your payment below
        </p>

        {clientSecret && (
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        )}
      </motion.div>
    </motion.div>
  );
};

export default CheckoutPage;
