import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTwitter, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-linear-to-r from-gray-900 via-gray-800 to-gray-900 text-gray-300 mt-16">
      <div className="container mx-auto px-6 py-10">
        
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start text-center md:text-left space-y-8 md:space-y-0">

          <div>
            <h2 className="text-2xl font-bold text-white">Vineet Fashion Store</h2>
            <p className="text-sm mt-2 text-gray-400 max-w-xs">
              Discover your style with our latest fashion trends — designed for comfort and confidence.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
            <div className="flex flex-col space-y-2">
              <Link to="/" className="hover:text-blue-400 transition-colors duration-300">Home</Link>
              <Link to="/products" className="hover:text-blue-400 transition-colors duration-300">Products</Link>
              <Link to="/cart" className="hover:text-blue-400 transition-colors duration-300">Cart</Link>
              <Link to="/login" className="hover:text-blue-400 transition-colors duration-300">Login</Link>
            </div>
          </div>

          {/* Contact / Social Media */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Follow Us</h3>
            <div className="flex space-x-4 justify-center md:justify-start">
              <a
                href="#"
                className="p-2 bg-gray-700 hover:bg-blue-600 rounded-full transition-all duration-300"
                aria-label="Facebook"
              >
                <FaFacebookF className="text-white text-lg" />
              </a>
              <a
                href="#"
                className="p-2 bg-gray-700 hover:bg-pink-600 rounded-full transition-all duration-300"
                aria-label="Instagram"
              >
                <FaInstagram className="text-white text-lg" />
              </a>
              <a
                href="#"
                className="p-2 bg-gray-700 hover:bg-sky-500 rounded-full transition-all duration-300"
                aria-label="Twitter"
              >
                <FaTwitter className="text-white text-lg" />
              </a>
              <a
                href="#"
                className="p-2 bg-gray-700 hover:bg-gray-600 rounded-full transition-all duration-300"
                aria-label="GitHub"
              >
                <FaGithub className="text-white text-lg" />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} <span className="text-white font-semibold">Vineet Fashion Store</span>. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
