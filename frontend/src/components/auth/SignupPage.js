// src/components/auth/SignupPage.js
import React, { useState } from "react";
import axios from "axios";
import AuthPageLayout from "./AuthPageLayout";
import { useNavigate } from "react-router-dom";

function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await axios.post("http://localhost:5000/api/signup", {
        email,
        password,
      });

      alert("Registration successful! Please log in.");
      navigate("/login");

    } catch (err) {
      setError(err.response?.data?.error || "Registration failed. Check server connection.");
    }
  };

  return (
    <AuthPageLayout
      title="Create Account"
      footerText="Already have an account?"
      footerLinkText="Log In"
      footerLinkTo="/login"
    >
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: '10px', marginTop: '5px', border: '1px solid #ccc', borderRadius: '4px' }}
          />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength="6"
            style={{ width: '100%', padding: '10px', marginTop: '5px', border: '1px solid #ccc', borderRadius: '4px' }}
          />
        </div>
        {error && <div style={{ color: 'red', marginBottom: '15px', padding: '10px', backgroundColor: '#ffe6e6', borderRadius: '4px' }}>{error}</div>}
        <button
            type="submit"
            style={{
                width: '100%',
                padding: '12px',
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
            }}
        >
          Sign Up
        </button>
      </form>
    </AuthPageLayout>
  );
}

export default SignupPage;