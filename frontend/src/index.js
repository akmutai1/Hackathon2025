import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";

const domain = "dev-fufeub15o8ylzslm.us.auth0.com";
const clientId = "MYyGr6UKBvMH5t3ZiQBh1Fu8IP7FnyYp";
const audience = "https://api.medinfo-hackathon.com";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Auth0Provider
    domain={domain}
    clientId={clientId}
    authorizationParams={{ redirect_uri: window.location.origin, audience }}
  >
    <App />
  </Auth0Provider>
);
