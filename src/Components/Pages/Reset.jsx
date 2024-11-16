import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Reset.css';

const Reset = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // reset logic
    console.log('Reset password for email:', email);
    alert(`Link sent to ${email}`)
  };

  return (
    <div className="reset-page">
      <div className="wrapper">
        <div className="typography-text">
          <h2>
            Enter the email address associated with your account, and we’ll send
            you a link to reset your password.
          </h2>
        </div>

        <form onSubmit={handleSubmit}>
          <h1>Reset Password</h1>

          <div className="input-box">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <i className="bx bxs-user"></i>
          </div>

          <button type="submit" className="btn">
            Continue
          </button>

          <div className="login-link">
            <p>
              Remember your password? <Link to="/login">Login</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Reset;
