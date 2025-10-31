import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useToast } from './ToastContext'; // 1. Import useToast

const API_URL = import.meta.env.VITE_API_URL;

const AuthContext = createContext(); // Create the context

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast(); // 2. Get the showToast function

  // Set the default auth token for all axios requests
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.setItem('token', token);
    } else {
      delete axios.defaults.headers.common['Authorization'];
      localStorage.removeItem('token');
    }

    // On initial load, fetch user profile if token exists
    const fetchUserProfile = async () => {
      if (token) {
        try {
          // You already built this route: /api/auth/profile
          const { data } = await axios.get(`${API_URL}/auth/profile`);
          setUser(data);
        } catch (error) {
          // Token might be invalid or expired
          console.error('Failed to fetch user profile', error);
          setToken(null); // Clear invalid token
          localStorage.removeItem('token');
        }
      }
      setLoading(false);
    };

    fetchUserProfile();
  }, [token]);


  // Base Login function (without toast)
  const login = async (email, password) => {
    const { data } = await axios.post(`${API_URL}/auth/login`, { email, password });
    setToken(data.token);
    setUser({ _id: data._id, name: data.name, email: data.email });
    showToast('Logged in successfully!', 'success'); // 3. Show toast
  };

  // Base Register function (without toast)
  const register = async (name, email, password) => {
    const { data } = await axios.post(`${API_URL}/auth/register`, { name, email, password });
    setToken(data.token);
    setUser({ _id: data._id, name: data.name, email: data.email });
    showToast('Account created successfully!', 'success'); // 4. Show toast
  };

  // Logout function
  const logout = () => {
    setToken(null);
    setUser(null);
    showToast('Logged out.', 'info'); // 5. Show toast
  };

  // Login wrapper function with toast error handling
  const loginWithToast = async (email, password) => {
    try {
      await login(email, password);
    } catch (err) {
      const message = err.response?.data?.message || 'Login failed. Please try again.';
      showToast(message, 'error');
      throw err; // Re-throw error so component knows it failed
    }
  };

  // Register wrapper function with toast error handling
  const registerWithToast = async (name, email, password) => {
    try {
      await register(name, email, password);
    } catch (err) {
      const message = err.response?.data?.message || 'Registration failed. Please try again.';
      showToast(message, 'error');
      throw err; // Re-throw error
    }
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        token, 
        login: loginWithToast, // Use the new wrapped functions
        register: registerWithToast, // Use the new wrapped functions
        logout, 
        loading 
      }}
    >
      {!loading && children}
    </AuthContext.Provider> 
  );
};

// Custom hook to easily use the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

