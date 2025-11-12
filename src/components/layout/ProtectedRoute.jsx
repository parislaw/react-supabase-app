import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider';

// ProtectedRoute wrapper component to secure routes
export const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  // Show loading state while checking authentication
  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Render children if authenticated
  return children;
};
