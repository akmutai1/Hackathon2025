import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider } from '@auth0/auth0-react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Auth0Provider
    domain="https://api.medinfo-hackathon.com"
    clientId="MYyGr6UKBvMH5t3ZiQBh1Fu8IP7FnyYp"
    authorizationParams={{
        redirect_uri: window.location.origin + '/dashboard',
        audience: "https://api.medinfo-hackathon.com"
     }}
    >
    <App />
    </Auth0Provider>
  </React.StrictMode>
);


reportWebVitals();
