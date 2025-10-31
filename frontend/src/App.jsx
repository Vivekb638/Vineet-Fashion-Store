// import React from 'react';
// import { Routes, Route } from 'react-router-dom';

// // Layout Imports
// import Header from './components/layout/Header.jsx';
// import Footer from './components/layout/Footer.jsx';

// // Page Imports
// import HomePage from './pages/HomePage.jsx';
// import LoginPage from './pages/LoginPage.jsx';
// import RegisterPage from './pages/RegisterPage.jsx';
// import ProfilePage from './pages/ProfilePage.jsx';
// import ProductsPage from './pages/ProductsPage.jsx';
// import ProductDetailPage from './pages/ProductDetailPage.jsx';
// import CartPage from './pages/CartPage.jsx';
// import CheckoutPage from './pages/CheckoutPage.jsx';
// import PaymentSuccessPage from './pages/PaymentSuccessPage.jsx';
// import PaymentCancelPage from './pages/PaymentCancelPage.jsx';
// import AdminPage from './pages/AdminPage.jsx';

// // Utility Imports
// import ProtectedRoute from './components/ProtectedRoute.jsx';

// function App() {
//   return (
//     <>
//       <Header />
//       <main className="min-h-screen bg-gray-900 text-white">

//         <Routes>
//           {/* Public Routes */}
//           <Route path="/" element={<HomePage />} />
//           <Route path="/products" element={<ProductsPage />} />
//           <Route path="/product/:id" element={<ProductDetailPage />} />
//           <Route path="/cart" element={<CartPage />} />
//           <Route path="/login" element={<LoginPage />} />
//           <Route path="/register" element={<RegisterPage />} />
//           <Route path="/success" element={<PaymentSuccessPage />} /> 
//           <Route path="/cancel" element={<PaymentCancelPage />} />

//           {/* Protected Routes */}
//           <Route element={<ProtectedRoute />}>
//             <Route path="/profile" element={<ProfilePage />} />
//             <Route path="/checkout" element={<CheckoutPage />} /> 
            
//             {/* We can add role-based auth later to make this admin-only */}
//             <Route path="/admin" element={<AdminPage />} /> 
//           </Route>
          
//         </Routes>
//       </main>
//       <Footer />
//     </>
//   );
// }

// export default App;


import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Layout Imports
import Header from './components/layout/Header.jsx';
import Footer from './components/layout/Footer.jsx';

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

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-grow">
        <div className="container mx-auto px-4 sm:px-6 py-6">
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

            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/admin" element={<AdminPage />} />
            </Route>
          </Routes>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
