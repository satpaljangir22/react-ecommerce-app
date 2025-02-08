import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    otp: "",
  });
  const [step, setStep] = useState(1); // Step 1: Email & Password, Step 2: OTP
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "otp") {
      if (/^\d*$/.test(value) && value.length <= 6) {
        setFormData({
          ...formData,
          [name]: value,
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step === 1) {
      // Verify email and password
      try {
        const response = await fetch("http://localhost:5001/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        });
        if (response.ok) {
          setStep(2); // Move to OTP step
        } else {
          const errorData = await response.json();
          console.error("Error response:", errorData);
          alert(errorData.message);
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Error logging in");
      }
    } else if (step === 2) {
      // Verify OTP
      try {
        const response = await fetch("http://localhost:5001/verify-otp", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            otp: formData.otp,
          }),
        });
        if (response.ok) {
          const data = await response.json();
          localStorage.setItem("userId", data.userId); // Store userId in localStorage
          navigate("/home");
        } else {
          const errorData = await response.json();
          console.error("Error response:", errorData);
          alert(errorData.message);
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Error verifying OTP");
      }
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </>
        )}
        {step === 2 && (
          <div className="form-group">
            <label htmlFor="otp">OTP:</label>
            <input
              type="text"
              id="otp"
              name="otp"
              value={formData.otp}
              onChange={handleChange}
              maxLength="6"
              required
            />
          </div>
        )}
        <button type="submit">{step === 1 ? "Next" : "Login"}</button>
      </form>
      <div className="extra-links">
        <Link to="/change-password">Change Password</Link>
        <span> | </span>
        <Link to="/forgot-password">Forgot Password</Link>
      </div>
      <p className="register-link">
        Don't have an account? <Link to="/registration">Register here</Link>
      </p>
    </div>
  );
}

export default Login;
