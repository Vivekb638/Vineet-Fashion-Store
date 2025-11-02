// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import { BrowserRouter } from 'react-router-dom'
// import App from './App.jsx'
// import './index.css'
// import { AuthProvider } from './context/AuthContext.jsx'
// import { CartProvider } from './context/CartContext.jsx'
// import { ToastProvider } from './context/ToastContext.jsx'

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <ToastProvider>
//         <AuthProvider>
          
//           <CartProvider>
//             <App />
//           </CartProvider>
//         </AuthProvider>
//       </ToastProvider>
//     </BrowserRouter>
//   </React.StrictMode>,
// )


import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';

// Import all your providers with the .jsx extension
import { AuthProvider } from './context/AuthContext.jsx';
import { CartProvider } from './context/CartContext.jsx';
import { ToastProvider } from './context/ToastContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      {/* This is the correct nesting order.
        ToastProvider is on the outside, so Auth and Cart can use it.
      */}
      <ToastProvider>
        <AuthProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </AuthProvider>
      </ToastProvider>
    </BrowserRouter>
  </React.StrictMode>,
);


