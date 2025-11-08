# 🫀 MedInfo Simplifier – Hackathon Challenge

### Problem Statement

Patients with implantable cardiac devices often receive complex medical reports filled with unknown terms or alerts they struggle to interpret.

**Your challenge:**  
Design a **website or mobile app** that helps patients simplify medical information — particularly for heart failure — so they can clearly understand their health and feel more connected to their care.

---

## 💡 Core Functionalities

1. **Secure Login & Logout System for Patients**  
   - Protect patient data with authentication and authorization.

2. **Upload or Input Capability**  
   - Allow users to upload or input medical data (e.g., PDFs, text entries).

3. **Medical Term Recognition**  
   - Utilize trusted sources like WebMD or Harvard Health.  
   - Maintain a lookup method or internal dictionary for term recognition.

4. **Medical Translation Engine**  
   - Likely incorporates AI for summarization and interpretation.  
   - Provide structured output such as:
     ```
     Term | Meaning | Why it Matters
     ```

5. **Simple Accessibility & Design**  
   - Use clean layouts, readable fonts, and intuitive navigation.  
   - Prioritize accessibility for older patient demographics.

---

## 🚀 Bonus / Optional Functionalities

- **Chatbot or Voice Assistant**  
  - Help patients ask health-related questions conversationally.

- **Multilingual Support**  
  - Make the app accessible to non-English-speaking users.

- **Lightweight or Offline Mode**  
  - Enable use without internet; focus on design efficiency and caching.

- **Gamification or Learning System**  
  - Quiz patients to reinforce health literacy.  
  - Include visuals or animations to explain medical terms.

---

## 👥 Team & Task Assignments

| Member          | Role | Responsibilities |
|-----------------|------|------------------|
| **Adams**       | **Frontend Lead** | Build the main UI/UX, set up navigation, design patient-friendly pages (login, dashboard, upload, results). Focus on accessibility and responsive design. |
| **Finai**       | **Backend & API Developer** | Set up authentication, database, and API endpoints. Handle secure data flow between the frontend, AI engine, and external medical APIs (WebMD, Harvard Health, etc.). |
| **Abdelrahman** | **AI & NLP Developer** | Build the medical translation engine. Implement term recognition, summarization, and context explanations using NLP or AI tools. |
| **Kelvin**      | **Project Manager & Integrations** | Coordinate tasks, ensure consistent communication, and manage integration between modules (frontend ↔ backend ↔ AI). Prepare final presentation/demo. |

---

## 🧠 Inspiration & Impact

This project bridges the gap between **complex medical data** and **patient understanding**, empowering users to manage their heart health with confidence and clarity.

---

## 🛠️ Suggested Tech Stack

| Area | Tools / Frameworks |
|------|--------------------|
| Frontend | React, Flutter, or Next.js |
| Backend | Node.js, Flask, or Django |
| AI / NLP | OpenAI API, spaCy, Hugging Face |
| Database | Firebase, MongoDB, or PostgreSQL |
| Authentication | OAuth, Firebase Auth, Auth0 |
| APIs | WebMD, Harvard Health, or other medical term databases |

---

## 🏆 Judging Criteria

- Innovation & Creativity  
- Functionality & User Experience  
- Accessibility & Inclusivity  
- Technical Implementation  
- Real-world Impact

---

## 📁 Submission Guidelines

- Include a link to your deployed project or demo video.  
- Provide clear setup instructions in your repository.  
- Submit all source code and documentation via GitHub.

---

Create Page Components: In /frontend/src, create a new folder called components. Inside it, create three files:

LoginPage.js

DashboardPage.js (This is your main page with the upload form)

ResultsPage.js

Create Login/Logout Buttons: In the same components folder, create LoginButton.js and LogoutButton.js.

JavaScript

// /frontend/src/components/LoginButton.js
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  return <button onClick={() => loginWithRedirect()}>Log In</button>;
};

export default LoginButton;
JavaScript

// /frontend/src/components/LogoutButton.js
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = () => {
  const { logout } = useAuth0();
  return (
    <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
      Log Out
    </button>
  );
};

export default LogoutButton;
Set Up App Routing: Open /frontend/src/App.js and replace its content. This will set up your page navigation.

JavaScript

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
Run the App: Open your terminal in the /frontend directory and run npm start. This should open http://localhost:3000 in your browser. You should see your LoginPage. Try logging in. It should redirect you to Auth0 and then back to your DashboardPage.

**Organizer:** Medtronic  
**Theme:** Patient Empowerment through Health Literacy

This is test commit 
