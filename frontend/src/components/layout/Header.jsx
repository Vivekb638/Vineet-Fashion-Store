import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
    setIsMobileMenuOpen(false);
  };

  const handleLinkClick = () => setIsMobileMenuOpen(false);

  return (
    <header className="bg-linear-to-r from-gray-900 via-gray-800 to-gray-900 text-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-4 sm:px-6 py-4 flex flex-wrap items-center justify-between">
        
        {/* Logo */}
        <Link
          to="/"
          onClick={handleLinkClick}
          className="text-2xl font-bold text-white hover:text-blue-400 transition duration-300"
        >
          Vineet Fashion Store
        </Link>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="block lg:hidden text-gray-300 focus:outline-none hover:text-white transition"
        >
          {isMobileMenuOpen ? (
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          )}
        </button>

        {/* Menu */}
        <div className={`w-full lg:flex lg:items-center lg:w-auto transition-all duration-300 ease-in-out ${isMobileMenuOpen ? "block" : "hidden"}`}>
          <ul className="flex flex-col lg:flex-row lg:space-x-8 mt-4 lg:mt-0 border-t lg:border-t-0 border-gray-700 pt-4 lg:pt-0">
            {["Home", "Products"].map((item) => (
              <li key={item}>
                <Link
                  to={item === "Home" ? "/" : "/products"}
                  onClick={handleLinkClick}
                  className="block py-2 lg:py-0 text-gray-300 hover:text-blue-400 font-medium transition duration-200"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex flex-col lg:flex-row lg:items-center mt-4 lg:mt-0 lg:ml-6 space-y-3 lg:space-y-0 lg:space-x-4">
            
            {/* Cart Button */}
            <Link
              to="/cart"
              onClick={handleLinkClick}
              className="relative flex items-center text-gray-300 hover:text-blue-400 transition duration-200"
            >
              <svg className="h-6 w-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Cart
            
              <span className="absolute -top-2 -right-3 bg-blue-500 text-xs text-white px-1.5 py-0.5 rounded-full">
                1
              </span>
            </Link>

            {/* Auth Section */}
            {user ? (
              <>
                <Link
                  to="/profile"
                  onClick={handleLinkClick}
                  className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-blue-600 transition duration-300 font-medium"
                >
                  Hi, {user.name}
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md font-medium transition duration-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={handleLinkClick}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white font-medium transition duration-300"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
