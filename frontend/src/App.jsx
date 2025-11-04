
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './components/layout/Header.jsx';
import Footer from './components/layout/Footer.jsx';
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
    // 1. This outer div sets the dark background for the whole page
    <div className="flex flex-col min-h-screen bg-[#0d1b2a] text-white">
      <Header />
      
      <main className="flex-grow">
        {/* 3. This inner div centers your content and adds padding */}
        <div className="container mx-auto px-4 sm:px-6 py-6">
          <Routes>
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
            
            {/* Admin-Only Routes */}
            <Route element={<AdminRoute />}>
              <Route path="/admin" element={<AdminPage />} />
            </Route>
            
          </Routes>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;

