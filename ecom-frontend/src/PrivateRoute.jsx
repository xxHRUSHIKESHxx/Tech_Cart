import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, isAdminRoute = false }) => {
  const { isLoggedIn, isAdmin } = useSelector((state) => state.auth);

  if (!isLoggedIn) {
    // If not logged in, redirect to login
    return <Navigate to="/login" />;
  }

  if (isAdminRoute && !isAdmin) {
    // If trying to access an admin route but not an admin, redirect to user profile
    return <Navigate to="/profile" />;
  }

  // Render the child components if authenticated and authorized
  return children;
};

export default PrivateRoute;
