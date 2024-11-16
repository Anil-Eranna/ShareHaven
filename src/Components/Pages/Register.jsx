import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { AuthContext } from "../AppContext/AppContext";
import { auth, onAuthStateChanged } from "../firebase/firebase";
import "./Register.css";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setComfirmPassword] = useState("");
  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { registerWithEmailAndPassword } = useContext(AuthContext);
  const navigate = useNavigate();

  // Check if the user is already logged in
  useEffect(() => {
    setLoading(true);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/"); // Redirect to home page if already logged in
        setLoading(false);
      } else {
        setLoading(false);
      }
    });
  }, [navigate]);

  // Input change handlers
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // Validation function
  const validate = () => {
    let errors = {};

    if (!name) {
      errors.name = "Name is required";
    } else if (name.length < 4) {
      errors.name = "Name must be at least 4 characters long";
    } else if (!/^[a-zA-Z]+$/.test(name)) {
      errors.name = "Name can only contain letters";
    }

    if (!email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Invalid email address";
    }

    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
    }

    if (!confirmPassword) {
      errors.confirmPassword = "Confirm password is required";
    } else if (confirmPassword !== password) {
      errors.confirmPassword = "Password do not match";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form before submitting
    if (validate()) {
      setLoading(true);
      try {
        // Register user
        await registerWithEmailAndPassword(name, email, password);

        // Once registration is successful, navigate to login page
        navigate("/login");
      } catch (error) {
        setLoading(false);
        console.error("Registration failed:", error);
        alert("Registration failed. Please try again.");
      }
    } else {
      setLoading(false); // Stop loading if validation fails
    }
  };

  return (
    <div className="register-page">
      {loading ? (
        <div className="loader">
          <ClipLoader color="#367fd6" size={40} />
        </div>
      ) : (
        <div className="wrapper">
          <h1>REGISTER</h1>
          <form onSubmit={handleSubmit}>
            {/* Name input */}
            <div className="input-box">
              <input
                name="name"
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={handleNameChange}
              />
              {formErrors.name && (
                <div className="error">{formErrors.name}</div>
              )}
            </div>

            {/* Email input */}
            <div className="input-box">
              <input
                name="email"
                type="email"
                placeholder="Email"
                value={email}
                autoComplete="current-password"
                onChange={handleEmailChange}
              />
              {formErrors.email && (
                <div className="error">{formErrors.email}</div>
              )}
            </div>

            {/* Password input */}
            <div className="input-box">
              <input
                name="password"
                type="password"
                placeholder="Password"
                value={password}
                autoComplete="current-password"
                onChange={handlePasswordChange}
              />
              {formErrors.password && (
                <div className="error">{formErrors.password}</div>
              )}
            </div>

            <div className="input-box">
              <input
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                autoComplete="current-password"
                onChange={(e) => setComfirmPassword(e.target.value)}
              ></input>
              {formErrors.confirmPassword && (
                <div className="error">{formErrors.confirmPassword}</div>
              )}
            </div>

            <button type="submit" className="btn">
              Register
            </button>
          </form>

          <div className="register-link">
            <p>
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;
