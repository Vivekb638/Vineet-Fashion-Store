import React from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { Link } from "react-router-dom";

const ProfilePage = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">
          Loading user data...
        </h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200 dark:from-gray-900 dark:to-gray-800 px-4 py-12">
      <div className="w-full max-w-3xl bg-white dark:bg-gray-900 shadow-2xl rounded-3xl overflow-hidden border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-blue-500/20">
        
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-10 text-center text-white">
          <h1 className="text-4xl font-extrabold tracking-wide">Your Profile</h1>
          <p className="text-blue-100 mt-2">Manage your account information</p>
        </div>

        {/* Profile Details Section */}
        <div className="p-8">
          {user.role === "admin" && (
            <div className="mb-8 p-6 bg-blue-50 dark:bg-blue-900/40 border border-blue-300 dark:border-blue-700 rounded-xl">
              <h3 className="text-2xl font-semibold text-blue-800 dark:text-blue-200 mb-2">
                Admin Controls
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                You are logged in as an <strong>Administrator</strong>.
              </p>
              <Link
                to="/admin"
                className="inline-block bg-blue-600 text-white py-2 px-5 rounded-md font-medium hover:bg-blue-700 transition-all duration-200"
              >
                Go to Admin Panel
              </Link>
            </div>
          )}

          {/* Profile Info */}
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Full Name
              </h4>
              <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {user.name}
              </p>
            </div>

            <div>
              <h4 className="text-sm uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Email Address
              </h4>
              <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {user.email}
              </p>
            </div>

            <div>
              <h4 className="text-sm uppercase tracking-wide text-gray-500 dark:text-gray-400">
                User ID
              </h4>
              <p className="text-sm break-all font-medium text-gray-700 dark:text-gray-300">
                {user._id}
              </p>
            </div>

            <div>
              <h4 className="text-sm uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Role
              </h4>
              <p className="text-lg font-semibold text-gray-900 dark:text-gray-100 capitalize">
                {user.role}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-100 dark:bg-gray-800 py-4 text-center text-gray-600 dark:text-gray-400 text-sm border-t border-gray-200 dark:border-gray-700">
          © {new Date().getFullYear()} Vineet Fashion Store. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
