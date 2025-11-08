// /frontend/src/App.js (This is the CORRECT file)

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

// Import your page components
import LoginPage from './components/LoginPage';
import DashboardPage from './components/DashboardPage';
import ResultsPage from './components/ResultsPage';

// Import the logout button (we need to create this file)
import LogoutButton from './components/LogoutButton';

function App() {
  // These hooks are from the Auth0 provider
  const { isAuthenticated, isLoading } = useAuth0();

  // This "Loading..." check is critical.
  // It prevents the app from rendering until Auth0 is ready.
  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <BrowserRouter>
      <div className="App">
        <header>
          <h1>🫀 MedInfo Simplifier</h1>
          {/* This will show the Logout button only when you are logged in */}
          {isAuthenticated && <LogoutButton />}
        </header>
        <main>
          <Routes>
            {/* This logic is the core of the fix:
              - If you're on the root path ('/')...
              - ...and NOT authenticated, show the LoginPage.
              - ...and you ARE authenticated, show the DashboardPage.
            */}
            <Route path="/" element={!isAuthenticated ? <LoginPage /> : <DashboardPage />} />

            {/* This protects your other routes.
              - If you try to go to /dashboard...
              - ...and ARE authenticated, show the DashboardPage.
              - ...and are NOT authenticated, send back to the LoginPage.
            */}
            <Route path="/dashboard" element={isAuthenticated ? <DashboardPage /> : <LoginPage />} />
            <Route path="/results" element={isAuthenticated ? <ResultsPage /> : <LoginPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;