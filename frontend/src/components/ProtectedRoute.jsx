import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = () => {
  const { user, loading } = useAuth();

  // Show a loading indicator while auth status is being checked
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div>Loading...</div>
      </div>
    );
  }

  // If user is logged in, render the requested page (e.g., ProfilePage)
  // <Outlet /> is a placeholder for the component this route is protecting.
  // If no user, redirect to the /login page
  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;