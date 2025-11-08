// /frontend/src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

// Import your components
import LoginPage from './components/LoginPage';
import DashboardPage from './components/DashboardPage';
import ResultsPage from './components/ResultsPage';
import LogoutButton from './components/LogoutButton';
import LoginButton from './components/LoginButton';

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
            <Route path="/" element={!isAuthenticated ? <LoginPage /> : <DashboardPage />} />
            <Route path="/dashboard" element={isAuthenticated ? <DashboardPage /> : <LoginPage />} />
            <Route path="/results" element={isAuthenticated ? <ResultsPage /> : <LoginPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

// Simple placeholder for LoginPage
// /frontend/src/components/LoginPage.js
import React from 'react';
import LoginButton from './LoginButton';
const LoginPage = () => (
  <div>
    <h2>Welcome, Patient!</h2>
    <p>Please log in to simplify your medical report.</p>
    <LoginButton />
  </div>
);
export default LoginPage;

// Simple placeholder for DashboardPage
// /frontend/src/components/DashboardPage.js
import React from 'react';
const DashboardPage = () => (
  <div>
    <h2>Patient Dashboard</h2>
    <p>Upload your report or paste your text below.</p>
    {/* Upload form will go here in the next step */}
  </div>
);
export default DashboardPage;

// Simple placeholder for ResultsPage
// /frontend/src/components/ResultsPage.js
import React from 'react';
const ResultsPage = () => (
  <div>
    <h2>Your Simplified Report</h2>
    {/* Results will be displayed here */}
  </div>
);
export default ResultsPage;