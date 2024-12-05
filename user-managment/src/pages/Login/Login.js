// src/pages/Login/Login.js

import React, { useState } from 'react';
import axios from 'axios';
import { saveToken } from '../../utils/auth';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check for invalid credentials manually
    if (email !== 'eve.holt@reqres.in' || password !== 'cityslicka') {
      setError('Invalid email or password');
      return;
    }

    try {
      const response = await axios.post('https://reqres.in/api/login', {
        email,
        password,
      });

      // Simulate error if the API returns a response without a valid token
      if (!response.data.token) {
        setError('Invalid email or password');
        return;
      }

      saveToken(response.data.token); // Save token to localStorage
      navigate('/users'); // Redirect to Users List
    } catch (err) {
      setError('Something went wrong, please try again');
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h2>Welcome Back</h2>
        <p>Please log in to continue</p>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <span className="input-underline"></span>
          </div>
          <div className="input-container">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span className="input-underline"></span>
          </div>
          {error && <p className="error">{error}</p>}
          <button type="submit" className="login-button">
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
