import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
// 1. Import useToast to show feedback
import { useToast } from '../context/ToastContext.jsx'; 

// 2. Add onProductDeleted as a new prop
const ProductCard = ({ product, onProductDeleted }) => {
  const { addToCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { showToast } = useToast(); // 3. Get the toast function

  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(product.price);

  const handleAddToCart = () => {
    if (!user) {
      navigate('/login');
    } else {
      addToCart(product._id, 1);
      // We already have a toast system, so let's use it!
      // showToast('Added to cart!', 'success'); // This is handled in CartContext now
    }
  };

  // 4. Create the delete handler
  const handleDelete = (e) => {
    e.preventDefault(); // Stop it from navigating to product page
    e.stopPropagation(); // Stop click event bubbling
    if (window.confirm('Are you sure you want to delete this product?')) {
      // Call the function passed from ProductsPage
      onProductDeleted(product._id);
    }
  };

  return (
    <div className="border rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 dark:bg-gray-800 dark:border-gray-700">
      <Link to={`/product/${product._id}`} className="block">
        {/* Product Image */}
        <div className="w-full h-64 overflow-hidden">
          <img
            src={product.image.url}
            alt={product.name}
            className="w-full h-full object-cover object-center"
          />
        </div>
        
        {/* Product Info */}
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 truncate dark:text-white" title={product.name}>
            {product.name}
          </h3>
          <p className="text-sm text-gray-500 mt-1 capitalize dark:text-gray-400">
            {product.category}
          </p>
          <p className="text-xl font-bold text-gray-900 mt-2 dark:text-gray-100">
            {formattedPrice}
          </p>
        </div>
      </Link>
      
      {/* Button Container */}
      <div className="px-4 pb-4 space-y-2">
        <button 
          onClick={handleAddToCart}
          className="w-full bg-blue-600 text-white py-2 rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Add to Cart
        </button>

        {/* 5. Add the Admin Delete Button */}
        {user && user.role === 'admin' && (
          <button 
            onClick={handleDelete}
            className="w-full bg-red-600 text-white py-2 rounded-md font-medium hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Delete Product
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;

