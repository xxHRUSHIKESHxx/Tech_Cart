import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'; 
import { login } from '../../apis/authentications'; // Your API function
import { loginSuccess, loginFail } from '../../redux/authSlice'; // Redux actions
import './auth.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClose = () => {
    navigate(-1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = { email, password };

    try {
      // Call the login function from your auth API
      const response = await login(payload); // Login function takes care of cookies

      // Dispatch login success action to Redux store
      dispatch(loginSuccess(response.user));

      // Redirect based on the user role (admin or user)
      if (response.user.is_admin) {
        navigate('/admin'); // Redirect to the admin dashboard
      } else {
        navigate('/'); // Redirect to the homepage for users
      }

    } catch (error) {
      console.error('Login error:', error);
      const errorMessage = error.response?.data?.error || 'Login failed. Please try again.';
      setError(errorMessage);

      // Dispatch login fail action to Redux store
      dispatch(loginFail(errorMessage));
    }
  };

  return (
    <div className="auth-overlay">
      <div className="auth-box">
        <button className="auth-close-btn" onClick={handleClose}>&times;</button>
        <h2 className="auth-title">Welcome Back</h2>
        <p className="auth-subtitle">Sign in to continue</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <input
            type="email"
            className="auth-input"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            className="auth-input"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="auth-button">Login</button>
        </form>

        {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error if login fails */}

        <p className="auth-switch">
          Don't have an account yet?
          <span className="auth-switch-link" onClick={() => navigate('/signup')}> Sign Up</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
