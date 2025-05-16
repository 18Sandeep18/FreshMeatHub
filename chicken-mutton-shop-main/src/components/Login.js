import React, { useState } from 'react';
import './Login.css';
import { FaTimes, FaUser } from 'react-icons/fa';

function Login({ onClose, onLoginSuccess }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (!email || !password || (isSignUp && !confirmPassword)) {
      setError('Please fill in all fields.');
      return;
    }

    if (isSignUp) {
      if (password !== confirmPassword) {
        setError('Passwords do not match.');
        return;
      }
      // Call backend for signup
      try {
        const res = await fetch('https://freshmeathub.onrender.com/api/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });
        const data = await res.json();
        if (!data.success) {
          setError(data.error || 'Sign up failed');
          return;
        }
        setSuccessMessage('Sign up successful! Please sign in.');
        setIsSignUp(false);
        setEmail('');
        setPassword('');
        setConfirmPassword('');
      } catch (err) {
        setError('Sign up failed. Please try again.');
      }
    } else {
      // Call backend for login
      try {
        const res = await fetch('https://freshmeathub.onrender.com/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });
        const data = await res.json();
        if (!data.success) {
          setError(data.error || 'Login failed');
          return;
        }
        setSuccessMessage('Login successful!');
        onLoginSuccess({ email });
        setTimeout(() => onClose(), 2000);
      } catch (err) {
        setError('Login failed. Please try again.');
      }
    }
  };

  return (
    <div className="login-overlay">
      <div className="login-popup">
        <button className="close-btn" onClick={onClose}>
          <FaTimes />
        </button>
        <div className="login-header">
          <FaUser className="login-icon" />
          <h2>{isSignUp ? "Sign Up" : "Login"} to Abdul's Chicken</h2>
        </div>
        <form className="input-group" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          {isSignUp && (
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              required
            />
          )}
          <button type="submit">{isSignUp ? "Sign Up" : "Login"}</button>
          {error && <p className="error-message">{error}</p>}
          {successMessage && <p className="success-message">{successMessage}</p>}
        </form>
        <p className="toggle-link">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}
          <button
            type="button"
            className="link-btn"
            onClick={() => {
              setIsSignUp(!isSignUp);
              setError('');
              setSuccessMessage('');
            }}
          >
            {isSignUp ? "Login" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;
