import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './components/layout/Header.jsx';
import Footer from './components/layout/Footer.jsx';
// 1. DO NOT import ToastContainer here anymore
// import ToastContainer from './components/Toast.jsx'; 

// Page Imports
import HomePage from './pages/HomePage.jsx'; 
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import ProductsPage from './pages/ProductsPage.jsx';
import ProductDetailPage from './pages/ProductDetailPage.jsx';
import CartPage from './pages/CartPage.jsx';
import CheckoutPage from './pages/CheckoutPage.jsx';
import PaymentSuccessPage from './pages/PaymentSuccessPage.jsx';
import PaymentCancelPage from './pages/PaymentCancelPage.jsx';
import AdminPage from './pages/AdminPage.jsx'; 

// Utility Imports
import ProtectedRoute from './components/ProtectedRoute.jsx';
import AdminRoute from './components/AdminRoute.jsx';

function App() {
  return (
    <>
      <Header />
      {/* 2. REMOVE this line. The provider handles it. */}
      {/* <ToastContainer /> */}
      <main className="min-h-screen py-6 container mx-auto px-4 sm:px-6">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/success" element={<PaymentSuccessPage />} /> 
          <Route path="/cancel" element={<PaymentCancelPage />} />

          {/* Protected Routes (for any logged-in user) */}
          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/checkout" element={<CheckoutPage />} /> 
          </Route>
          
          {/* Use AdminRoute for the /admin path */}
          <Route element={<AdminRoute />}>
            <Route path="/admin" element={<AdminPage />} />
          </Route>
          
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;

