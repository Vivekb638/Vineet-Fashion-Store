import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx'; // Make sure path is correct

const AdminRoute = () => {
  const { user, loading } = useAuth();

  // Show a loading spinner while we check the user's status
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl dark:text-white">Loading...</div>
      </div>
    );
  }

  // Check if user exists AND if their role is 'admin'
  if (user && user.role === 'admin') {
    return <Outlet />; // This renders the page (e.g., <AdminPage />)
  }
  
  // If not loading and not an admin, redirect them to the homepage.
  return <Navigate to="/" replace />; 
};

export default AdminRoute;

