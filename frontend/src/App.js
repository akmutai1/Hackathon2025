import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import DashboardPage from "./components/DashboardPage";
import ResultsPage from "./components/ResultsPage";
import NavTabs from "./components/NavTabs";
import LoginPage from "./components/auth/LoginPage";
import SignupPage from "./components/auth/SignupPage";
import axios from "axios";

// Helper component for protecting routes
const PrivateRoute = ({ children, auth }) => {
  return auth ? children : <Navigate to="/login" replace />;
};

function App() {
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verify = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        await axios.get("http://localhost:5000/api/verify", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAuth(true);
      } catch (error) {
        setAuth(false);
        localStorage.removeItem("token");
      } finally {
        setLoading(false);
      }
    };
    verify();
  }, []);

  // Show loading state while token is being verified
  if (loading) {
    return <div>Verifying Authentication...</div>;
  }

  return (
    <Router>
      {auth && <NavTabs setAuth={setAuth} />} {/* NavTabs for authenticated users */}
      <Routes>

        {/* Landing Page Redirect */}
        <Route path="/" element={auth ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />

        {/* Authentication Routes (Redirect if logged in) */}
        <Route path="/login" element={auth ? <Navigate to="/dashboard" /> : <LoginPage setAuth={setAuth} />} />
        <Route path="/signup" element={auth ? <Navigate to="/dashboard" /> : <SignupPage />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute auth={auth}>
              <DashboardPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/results"
          element={
            <PrivateRoute auth={auth}>
              <ResultsPage />
            </PrivateRoute>
          }
        />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;