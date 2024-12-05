// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

// ProtectedRoute component
const ProtectedRoute = ({ children }) => {
  // Check if the token is present in localStorage
  const token = localStorage.getItem('token');
  
  // If no token, redirect to the login page
  if (!token) {
    return <Navigate to="/" />;
  }

  // If the token exists, render the children (i.e., the Users List page)
  return children;
};

export default ProtectedRoute;
