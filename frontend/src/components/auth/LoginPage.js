// src/components/auth/LoginPage.js
import React, { useState } from "react";
import axios from "axios";
import AuthPageLayout from "./AuthPageLayout";

function LoginPage({ setAuth }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
      });

      // 1. Store the JWT token
      localStorage.setItem("token", response.data.token);

      // 2. Update the state in App.js to authenticate the user
      setAuth(true);

    } catch (err) {
      setError(err.response?.data?.error || "Login failed. Check server connection.");
    }
  };

  return (
    <AuthPageLayout
      title="Log In"
      footerText="Don't have an account?"
      footerLinkText="Sign Up"
      footerLinkTo="/signup"
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
            style={{ width: '100%', padding: '10px', marginTop: '5px', border: '1px solid #ccc', borderRadius: '4px' }}
          />
        </div>
        {error && <div style={{ color: 'red', marginBottom: '15px', padding: '10px', backgroundColor: '#ffe6e6', borderRadius: '4px' }}>{error}</div>}
        <button
            type="submit"
            style={{
                width: '100%',
                padding: '12px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
            }}
        >
          Log In
        </button>
      </form>
    </AuthPageLayout>
  );
}

export default LoginPage;