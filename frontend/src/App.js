// /frontend/src/App.js (The CORRECT version)

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

// Import the simple components
import LoginPage from './components/LoginPage'; // Imports the file you pasted
import DashboardPage from './components/DashboardPage';
import ResultsPage from './components/ResultsPage';
import LogoutButton from './components/LogoutButton'; // From Step 4.A

function App() {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <BrowserRouter>
      <div className="App">
        <header>
          <h1>🫀 MedInfo Simplifier</h1>
          {isAuthenticated && <LogoutButton />}
        </header>
        <main>
          <Routes>
            {/* This logic correctly shows LoginPage or DashboardPage */}
            <Route path="/" element={!isAuthenticated ? <LoginPage /> : <DashboardPage />} />
            <Route path="/dashboard" element={isAuthenticated ? <DashboardPage /> : <LoginPage />} />
            <Route path="/results" element={isAuthenticated ? <ResultsPage /> : <LoginPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;