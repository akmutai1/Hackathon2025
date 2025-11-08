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
      domain="YOUR_AUTH0_DOMAIN" // Your key from Step 2
      clientId="YOUR_AUTH0_CLIENT_ID" // Your key from Step 2
      authorizationParams={{
        redirect_uri: window.location.origin + '/dashboard',
        audience: "https://api.medinfo-hackathon.com" // Your API Identifier from Step 2
      }}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
);