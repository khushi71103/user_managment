// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import Users from './pages/Users/Users'; // Import Users component
import ProtectedRoute from './components/ProtectedRoute'; // Import ProtectedRoute

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Route for the Login page */}
        <Route path="/" element={<Login />} />
        
        {/* Protected Route for the Users page */}
        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <Users /> {/* Users List page */}
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
