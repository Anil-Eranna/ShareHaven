import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import './Login.css';
import { AuthContext } from '../AppContext/AppContext';
import { auth, onAuthStateChanged } from '../firebase/firebase';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);

  const { loginWithEmailAndPassword } = useContext(AuthContext);
  const navigate = useNavigate();

  // Check if the user is already logged in
  useEffect(() => {
    setLoading(true);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate('/'); // Redirect to home page if already logged in
        setLoading(false);
      } else {
        setLoading(false);
      }
    });
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the input fields first
    if (validate()) {
      setLoading(true);
      try {
        // Login with email and password
        await loginWithEmailAndPassword(email, password);
        
        // Redirect to home page after successful login
        navigate('/');
      } catch (error) {
        setLoading(false);
        console.error('Login failed:', error);
        alert('Login failed. Please check your email and password.');
      }
    } else {
      setLoading(false); // Stop loading if validation fails
    }
  };

  const validate = () => {
    let isValid = true;

    // Reset error states
    setEmailError('');
    setPasswordError('');

    // Email validation
    if (!email) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Invalid email address');
      isValid = false;
    }

    // Password validation
    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters long');
      isValid = false;
    }

    return isValid;
  };

  return (
    <div className="login-page">
      <div className="wrapper">
        {loading ? (
          <div className="loader">
            <ClipLoader color="#367fd6" size={40} />
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <h1>Login</h1>

            {/* Email input */}
            <div className="input-box">
              <input
                type="email"
                placeholder="Email"
                value={email}
                autoComplete="username"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <i className="bx bxs-user"></i>
              {emailError && <span className="error-text">{emailError}</span>}
            </div>

            {/* Password input */}
            <div className="input-box">
              <input
                type="password"
                placeholder="Password"
                value={password}
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <i className="bx bxs-lock-alt"></i>
              {passwordError && <span className="error-text">{passwordError}</span>}
            </div>

            {/* Remember me and forgot password */}
            <div className="remember-forgot">
              <label>
                <input type="checkbox" checked readOnly /> Remember me
              </label>
              <Link to="/reset">Reset the password</Link>
            </div>

            <button type="submit" className="btn">Login</button>

            {/* Register link */}
            <div className="register-link">
              <p>
                Don't have an account? <Link to="/register">Register</Link>
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default LoginPage;
