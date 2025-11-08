import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import DashboardPage from "./components/DashboardPage";
import ResultsPage from "./components/ResultsPage";
import NavTabs from "./components/NavTabs";

function App() {
  return (
    <Router>
      <NavTabs /> {/* Persistent navigation at the top */}
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/results" element={<ResultsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
