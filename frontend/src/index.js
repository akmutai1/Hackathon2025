// /frontend/src/index.js (Ensure this is correct)

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-fufeub15o8ylzslm.us.auth0.com" // <-- FIX THIS
      clientId="MYyGr6UKBvMH5t3ZiQBh1Fu8IP7FnyYp" // <-- FIX THIS
      authorizationParams={{
        redirect_uri: window.location.origin + '/dashboard',
        audience: "https://api.medinfo-hackathon.com" // <-- CHECK THIS
      }}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
);