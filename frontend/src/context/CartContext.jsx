// import React, { createContext, useState, useEffect, useContext } from 'react';
// import axios from 'axios';
// import { useAuth } from './AuthContext';
// import { useToast } from './ToastContext'
// const API_URL = import.meta.env.VITE_API_URL;

// const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//   const [cart, setCart] = useState(null); // Will hold { _id, userId, items: [...] }
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const { user } = useAuth();
//   const { showToast } = useToast(); // Get the currently logged-in user

//   // Fetch cart when user logs in
//   useEffect(() => {
//     const fetchCart = async () => {
//       if (user) {
//         setLoading(true);
//         try {
//           // This calls your backend route: GET /api/cart/:userId
//           const { data } = await axios.get(`${API_URL}/cart/${user._id}`);
//           setCart(data);
//         } catch (err) {
//           setError('Failed to fetch cart.');
//           console.error(err);
//         }
//         setLoading(false);
//       } else {
//         // If user logs out, clear the cart
//         setCart(null);
//       }
//     };
//     fetchCart();
//   }, [user]); // Re-run this effect whenever the user object changes

//   // Add an item to the cart
//   const addToCart = async (productId, quantity) => {
//     if (!user) {
//       setError('You must be logged in to add items to the cart.');
//       return;
//     }
//     setLoading(true);
//     try {
//       // This calls your backend route: POST /api/cart/add
//       const { data } = await axios.post(`${API_URL}/cart/add`, {
//         userId: user._id,
//         productId,
//         quantity,
//       });
//       // Update the local cart state with the new cart from the server
//       setCart(data);
//       showToast('Added to cart!', 'success');
//     } catch (err) {
//       setError('Failed to add item to cart.');
//       showToast('Failed to add item to cart.', 'error');
//       console.error(err);
//     }
//     setLoading(false);
//   };

//   // Remove an item from the cart
//   const removeFromCart = async (productId) => {
//     if (!user) return;
//     setLoading(true);
//     try {
//       // This calls your backend route: DELETE /api/cart/remove
//       const { data } = await axios.delete(`${API_URL}/cart/remove`, {
//         data: { userId: user._id, productId },
//       });
//       // Update the local cart state
//       setCart(data);
//       showToast('Item removed from cart.', 'success');
//     } catch (err) {
//       setError('Failed to remove item from cart.');
//       showToast('Failed to remove item.', 'error');
//       console.error(err);
//     }
//     setLoading(false);
//   };

//   return (
//     <CartContext.Provider 
//       value={{ 
//         cart, 
//         loading, 
//         error, 
//         addToCart, 
//         removeFromCart 
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };

// // Custom hook to easily use the cart context
// export const useCart = () => {
//   return useContext(CartContext);
// };


import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext.jsx';
import { useToast } from './ToastContext.jsx'; // 1. Import useToast

const API_URL = import.meta.env.VITE_API_URL;

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const { showToast } = useToast(); // 2. Get showToast

  // Fetch cart when user logs in
  useEffect(() => {
    const fetchCart = async () => {
      if (user) {
        setLoading(true);
        try {
          // Use the protected route: GET /api/cart/:userId
          const { data } = await axios.get(`${API_URL}/cart/${user._id}`);
          setCart(data);
        } catch (err) {
          console.error('Failed to fetch cart', err);
          setError('Failed to fetch cart.');
        }
        setLoading(false);
      } else {
        // If user logs out, clear the cart
        setCart(null);
      }
    };
    fetchCart();
  }, [user]); // Re-run this effect whenever the user object changes

  // Add an item to the cart
  const addToCart = async (productId, quantity) => {
    if (!user) {
      showToast('You must be logged in to add items.', 'error');
      return;
    }
    setLoading(true);
    try {
      // POST /api/cart/add
      // We don't need to send userId, the 'protect' middleware adds it
      const { data } = await axios.post(`${API_URL}/cart/add`, {
        productId,
        quantity,
      });
      setCart(data); // Instantly update cart with populated data
      showToast('Item added to cart!', 'success');
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to add item.', 'error');
      console.error(err);
    }
    setLoading(false);
  };

  // Remove an item from the cart
  const removeFromCart = async (productId) => {
    if (!user) return;
    setLoading(true);
    try {
      // DELETE /api/cart/remove
      const { data } = await axios.delete(`${API_URL}/cart/remove`, {
        data: { productId }, // userId is added by 'protect' middleware
      });
      setCart(data); // Instantly update cart
      showToast('Item removed from cart.', 'info');
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to remove item.', 'error');
      console.error(err);
    }
    setLoading(false);
  };

  // 3. NEW: Update item quantity
  const updateQuantity = async (productId, newQuantity) => {
    if (!user) return;

    // Prevent quantity from going below 1
    if (newQuantity < 1) {
      return;
    }

    // Set loading to true so the UI can show a spinner if needed
    setLoading(true); 
    try {
      // PATCH /api/cart/update
      const { data } = await axios.patch(`${API_URL}/cart/update`, {
        productId,
        newQuantity,
      });
      setCart(data); // Instantly update cart with populated data
      // No toast here, it would be too noisy as the user clicks +/-
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to update quantity.', 'error');
      console.error(err);
    }
    setLoading(false);
  };


  return (
    <CartContext.Provider 
      value={{ 
        cart, 
        loading, 
        error, 
        addToCart, 
        removeFromCart,
        updateQuantity // 4. Add new function to the provider
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to easily use the cart context
export const useCart = () => {
  return useContext(CartContext);
};

