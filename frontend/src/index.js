// /frontend/src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Auth0Provider
      domain="YOUR_AUTH0_DOMAIN" // Paste Domain from Kelvin
      clientId="YOUR_AUTH0_CLIENT_ID" // Paste Client ID from Kelvin
      authorizationParams={{
        redirect_uri: window.location.origin + '/dashboard',
        audience: "https://api.medinfo-hackathon.com" // Paste API Identifier (Audience) from Kelvin
      }}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
);