// // import React, { createContext, useContext, useState, useCallback } from 'react';

// // const ToastContext = createContext();

// // export const ToastProvider = ({ children }) => {
// //   const [toast, setToast] = useState(null);

// //   const showToast = useCallback((message, type = 'success') => {
// //     setToast({ message, type });

// //     setTimeout(() => {
// //       setToast(null);
// //     }, 3000);
// //   }, []);

// //   const hideToast = () => {
// //     setToast(null);
// //   };

// //   return (
// //     <ToastContext.Provider value={{ toast, showToast, hideToast }}>
// //       {children}
// //     </ToastContext.Provider>
// //   );
// // };

// // // Custom hook to use the toast
// // export const useToast = () => {
// //   return useContext(ToastContext);
// // };


// import React, { createContext, useContext, useState, useCallback } from 'react';
// import ToastContainer from '../components/Toast.jsx'; // 1. Import the UI component

// // Create the context
// const ToastContext = createContext(null);

// // Create the Provider component
// export const ToastProvider = ({ children }) => {
//   const [toasts, setToasts] = useState([]);

//   // useCallback ensures this function doesn't change on every render,
//   // which is good for performance.
//   const showToast = useCallback((message, type = 'info') => {
//     const id = Math.random().toString(36).substr(2, 9);
//     // Add new toast to the array
//     setToasts((prevToasts) => [...prevToasts, { id, message, type }]);
//   }, []);

//   // Function to remove a toast by its ID
//   const removeToast = (id) => {
//     setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
//   };

//   return (
//     <ToastContext.Provider value={{ showToast }}>
//       {children}
      
//       {/* This is the key: The ToastContainer (the UI) is rendered *inside*
//         its own provider. This makes it self-contained and solves the
//         nesting and crash issues.
//       */}
//       <ToastContainer toasts={toasts} removeToast={removeToast} />
//     </ToastContext.Provider>
//   );
// };

// // The custom hook that other components (like AuthContext) will use
// export const useToast = () => {
//   const context = useContext(ToastContext);
  
//   // This check is crucial. It ensures you can't call useToast()
//   // from a component that isn't a child of ToastProvider.
//   if (context === null) {
//     // This error helps you debug if your provider nesting is wrong
//     throw new Error('useToast must be used within a ToastProvider');
//   }
  
//   return context;
// };



import React, { createContext, useContext, useState, useCallback } from 'react';
import ToastContainer from '../components/Toast.jsx'; // 1. Import the UI component

// Create the context
const ToastContext = createContext(null);

// Create the Provider component
export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  // useCallback ensures this function doesn't change on every render,
  // which is good for performance.
  const showToast = useCallback((message, type = 'info') => {
    const id = Math.random().toString(36).substr(2, 9);
    // Add new toast to the array
    setToasts((prevToasts) => [...prevToasts, { id, message, type }]);
  }, []);

  // Function to remove a toast by its ID
  const removeToast = (id) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      
      {/* This is the key: The ToastContainer (the UI) is rendered *inside*
        its own provider. This makes it self-contained and solves the
        nesting and crash issues.
      */}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
};

// The custom hook that other components (like AuthContext) will use
export const useToast = () => {
  const context = useContext(ToastContext);
  
  // This check is crucial. It ensures you can't call useToast()
  // from a component that isn't a child of ToastProvider.
  if (context === null) {
    // This error helps you debug if your provider nesting is wrong
    throw new Error('useToast must be used within a ToastProvider');
  }
  
  return context;
};


