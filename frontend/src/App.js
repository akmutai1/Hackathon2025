import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

// --- Mock Auth0 ---
// We can't use the external '@auth0/auth0-react' library here.
// Let's create a simple mock version to simulate login/logout.

const AuthContext = React.createContext();

const MockAuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Simulates loading state

  const loginWithRedirect = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsAuthenticated(true);
      setIsLoading(false);
    }, 500); // Simulate network delay
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        loginWithRedirect,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth0 = () => React.useContext(AuthContext);

// --- Components ---
// All components must be in this single file.

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <button
      onClick={() => loginWithRedirect()}
      className="px-4 py-2 font-semibold text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
    >
      Log In
    </button>
  );
};

const LogoutButton = () => {
  const { logout } = useAuth0();
  return (
    <button
      onClick={() => logout()}
      className="px-4 py-2 font-semibold text-white bg-red-500 rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75"
    >
      Log Out
    </button>
  );
};

const LoginPage = () => (
  <div className="flex flex-col items-center justify-center p-8 text-center bg-white rounded-lg shadow-xl">
    <h2 className="mb-4 text-3xl font-bold text-gray-800">Welcome, Patient!</h2>
    <p className="mb-6 text-lg text-gray-600">
      Please log in to simplify your medical report.
    </p>
    <LoginButton />
  </div>
);

const DashboardPage = () => (
  <div className="w-full max-w-2xl p-8 bg-white rounded-lg shadow-xl">
    <h2 className="mb-6 text-3xl font-bold text-center text-gray-800">
      Patient Dashboard
    </h2>
    <p className="mb-6 text-lg text-center text-gray-600">
      Upload your report or paste your text below.
    </p>
    {/* Placeholder for upload/paste functionality */}
    <div className="p-6 text-gray-400 border-2 border-dashed rounded-lg bg-gray-50">
      <p className="text-center">
        [Upload Form and Text Area will go here]
      </p>
    </div>
    <div className="flex justify-center mt-6">
      <Link
        to="/results"
        className="px-6 py-3 font-semibold text-white bg-green-500 rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
      >
        Go to Results (Demo)
      </Link>
    </div>
  </div>
);

const ResultsPage = () => (
  <div className="w-full max-w-2xl p-8 bg-white rounded-lg shadow-xl">
    <h2 className="mb-6 text-3xl font-bold text-center text-gray-800">
      Your Simplified Report
    </h2>
    {/* Placeholder for results */}
    <div className="p-6 space-y-4 text-gray-700 bg-gray-50 rounded-lg">
      <h3 className="text-xl font-semibold text-gray-800">Summary</h3>
      <p>
        [A simplified summary of the medical report will appear here.]
      </p>
      <h3 className="text-xl font-semibold text-gray-800">Key Findings</h3>
      <ul className="list-disc list-inside">
        <li>[Key finding 1 will be listed here.]</li>
        <li>[Key finding 2 will be listed here.]</li>
      </ul>
    </div>
    <div className="flex justify-center mt-6">
      <Link
        to="/dashboard"
        className="px-6 py-3 font-semibold text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
      >
        Back to Dashboard
      </Link>
    </div>
  </div>
);

// --- Main App Component ---

function App() {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl font-semibold">Loading ...</div>
      </div>
    );
  }

  return (
    <div className="App">
      <header className="flex items-center justify-between p-4 text-white bg-blue-600 shadow-md">
        <h1 className="text-2xl font-bold">🫀 MedInfo Simplifier</h1>
        {isAuthenticated && <LogoutButton />}
      </header>
      <main className="flex items-center justify-center p-8 bg-gray-100" style={{minHeight: 'calc(100vh - 68px)'}}>
        <Routes>
          <Route
            path="/"
            element={!isAuthenticated ? <LoginPage /> : <DashboardPage />}
          />
          <Route
            path="/dashboard"
            element={isAuthenticated ? <DashboardPage /> : <LoginPage />}
          />
          <Route
            path="/results"
            element={isAuthenticated ? <ResultsPage /> : <LoginPage />}
          />
        </Routes>
      </main>
    </div>
  );
}

// --- Entry Point ---
// We wrap the entire application in BrowserRouter and our MockAuthProvider.

export default function AppWrapper() {
  return (
    <MockAuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MockAuthProvider>
  );
}