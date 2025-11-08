// /frontend/src/components/DashboardPage.js
import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const DashboardPage = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [file, setFile] = useState(null);

  // New state for text input
  const [text, setText] = useState("");

  // New state for loading
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if user provided input
    if (!file && !text) {
      alert("Please upload a PDF or paste text to simplify.");
      return;
    }

    setIsLoading(true); // Show loading state

    try {
      const token = await getAccessTokenSilently();
      const headers = { Authorization: `Bearer ${token}` };

      let response;

      if (file) {
        // --- Handle File Upload ---
        const formData = new FormData();
        formData.append('file', file);

        response = await axios.post('http://localhost:5000/api/upload', formData, {
          headers: {
            ...headers,
            'Content-Type': 'multipart/form-data',
          },
        });
      } else {
        // --- Handle Text Upload ---
        response = await axios.post('http://localhost:5000/api/upload',
          { text: text }, // Send as JSON
          { headers: headers }
        );
      }

      // Navigate to results page with the data
      navigate('/results', { state: { data: response.data } });

    } catch (error) {
      console.error("Error simplifying report:", error);
      alert("Sorry, something went wrong. Please try again.");
      setIsLoading(false);
    }
  };

  // Simple, accessible design
  return (
    <div>
      <h2>Patient Dashboard</h2>
      <p>Upload your medical report PDF or paste the text directly.</p>

      <form onSubmit={handleSubmit}>
        <div>
          <h3>Upload PDF Report</h3>
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            disabled={!!text || isLoading} // Disable if text is entered
          />
        </div>

        <p><strong>--- OR ---</strong></p>

        <div>
          <h3>Paste Medical Text</h3>
          <textarea
            rows="10"
            cols="50"
            value={text}
            onChange={handleTextChange}
            placeholder="Paste your medical notes here..."
            disabled={!!file || isLoading} // Disable if file is selected
          />
        </div>

        <hr />

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Simplifying..." : "Simplify My Report"}
        </button>
      </form>
    </div>
  );
};

export default DashboardPage;