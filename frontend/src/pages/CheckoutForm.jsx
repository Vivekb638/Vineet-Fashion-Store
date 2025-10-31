import React, { useState } from "react";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { motion } from "framer-motion";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsLoading(true);
    setMessage(null);

    const successUrl = `${window.location.origin}/success`;

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: successUrl,
      },
    });

    if (error?.type === "card_error" || error?.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors"
    >
      <motion.form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 shadow-2xl rounded-2xl p-8 w-full max-w-md border border-gray-100 dark:border-gray-700"
        id="payment-form"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">
          💳 Checkout
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6 text-center">
          Complete your payment securely using Stripe
        </p>

        {/* Stripe Payment Element */}
        <div className="mb-6">
          <PaymentElement id="payment-element" />
        </div>

        <button
          disabled={isLoading || !stripe || !elements}
          id="submit"
          className={`w-full py-3 rounded-lg font-semibold shadow-md transition-all duration-300 ${
            isLoading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white"
          }`}
        >
          <span id="button-text">
            {isLoading ? "Processing..." : "Pay Now"}
          </span>
        </button>

        {message && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-500 mt-4 text-center text-sm"
          >
            {message}
          </motion.div>
        )}
      </motion.form>
    </motion.div>
  );
};

export default CheckoutForm;
