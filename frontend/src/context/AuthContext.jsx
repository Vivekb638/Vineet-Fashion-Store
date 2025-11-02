// import React, { createContext, useState, useEffect, useContext } from 'react';
// import axios from 'axios';
// import { useToast } from './ToastContext'; // 1. Import useToast

// const API_URL = import.meta.env.VITE_API_URL;

// const AuthContext = createContext(); // Create the context

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [token, setToken] = useState(localStorage.getItem('token') || null);
//   const [loading, setLoading] = useState(true);
//   const { showToast } = useToast(); 

//   // Set the default auth token for all axios requests
//   useEffect(() => {
//     if (token) {
//       axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//       localStorage.setItem('token', token);
//     } else {
//       delete axios.defaults.headers.common['Authorization'];
//       localStorage.removeItem('token');
//     }

//     // On initial load, fetch user profile if token exists
//     const fetchUserProfile = async () => {
//       if (token) {
//         try {
//           const { data } = await axios.get(`${API_URL}/auth/profile`);
//           setUser(data);
//         } catch (error) {
//           console.error('Failed to fetch user profile', error);
//           setToken(null); 
//           localStorage.removeItem('token');
//         }
//       }
//       setLoading(false);
//     };

//     fetchUserProfile();
//   }, [token]);


//   // Base Login function (without toast)
//   const login = async (email, password) => {
//     const { data } = await axios.post(`${API_URL}/auth/login`, { email, password });
//     setToken(data.token);
//     setUser({ _id: data._id, name: data.name, email: data.email });
//     showToast('Logged in successfully!', 'success'); // 3. Show toast
//   };

//   // Base Register function (without toast)
//   const register = async (name, email, password) => {
//     const { data } = await axios.post(`${API_URL}/auth/register`, { name, email, password });
//     setToken(data.token);
//     setUser({ _id: data._id, name: data.name, email: data.email });
//     showToast('Account created successfully!', 'success'); // 4. Show toast
//   };

//   // Logout function
//   const logout = () => {
//     setToken(null);
//     setUser(null);
//     showToast('Logged out.', 'info');
//   };

//   // Login wrapper function with toast error handling
//   const loginWithToast = async (email, password) => {
//     try {
//       await login(email, password);
//     } catch (err) {
//       const message = err.response?.data?.message || 'Login failed. Please try again.';
//       showToast(message, 'error');
//       throw err; 
//     }
//   };

//   const registerWithToast = async (name, email, password) => {
//     try {
//       await register(name, email, password);
//     } catch (err) {
//       const message = err.response?.data?.message || 'Registration failed. Please try again.';
//       showToast(message, 'error');
//       throw err; 
//     }
//   };

//   return (
//     <AuthContext.Provider 
//       value={{ 
//         user, 
//         token, 
//         login: loginWithToast, 
//         register: registerWithToast, 
//         loading 
//       }}
//     >
//       {!loading && children}
//     </AuthContext.Provider> 
//   );
// };

// // Custom hook to easily use the auth context
// export const useAuth = () => {
//   return useContext(AuthContext);
// };



import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useToast } from './ToastContext.jsx'; // This import must be correct

const API_URL = import.meta.env.VITE_API_URL;

const AuthContext = createContext(null); 

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); 
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast(); // This call requires correct nesting in main.jsx

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.setItem('token', token);
    } else {
      delete axios.defaults.headers.common['Authorization'];
      localStorage.removeItem('token');
    }

    const fetchUserProfile = async () => {
      if (token) {
        try {
          const { data } = await axios.get(`${API_URL}/auth/profile`);
          setUser(data); // data is the full user object { _id, name, email, role }
        } catch (error) {
          console.error('Failed to fetch user profile', error);
          setToken(null); 
          localStorage.removeItem('token');
        }
      }
      setLoading(false);
    };

    fetchUserProfile();
  }, [token]);


  const login = async (email, password) => {
    try {
      const { data } = await axios.post(`${API_URL}/auth/login`, { email, password });
      setToken(data.token);
      setUser(data); // Save the full user object from the response
      showToast('Login successful!', 'success');
    } catch (err) {
      const message = err.response?.data?.message || 'Login failed. Please try again.';
      showToast(message, 'error');
      throw err; // Re-throw error so the component can stop loading
    }
  };

  const register = async (name, email, password) => {
    try {
      const { data } = await axios.post(`${API_URL}/auth/register`, { name, email, password });
      setToken(data.token);
      setUser(data); // Save the full user object from the response
      showToast('Account created successfully!', 'success');
    } catch (err) {
      const message = err.response?.data?.message || 'Registration failed. Please try again.';
      showToast(message, 'error');
      throw err; // Re-throw error
    }
  };

  // Logout function
  const logout = () => {
    setToken(null);
    setUser(null);
    showToast('Logged out.', 'info');
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        token, 
        login, 
        register, 
        logout, // Make sure logout is included
        loading 
      }}
    >
      {!loading && children}
    </AuthContext.Provider> 
  );
};

// Custom hook to easily use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};


