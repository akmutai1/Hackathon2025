// /frontend/src/components/ResultsPage.js
import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const ResultsPage = () => {
  const location = useLocation();

  // Get the data passed from the DashboardPage
  const data = location.state?.data;

  // Handle case where user navigates here directly
  if (!data) {
    return (
      <div>
        <h2>No Report Found</h2>
        <p>Please <Link to="/dashboard">upload a report</Link> first.</p>
      </div>
    );
  }

  if (data.error) {
    return (
      <div>
        <h2>An Error Occurred</h2>
        <p>{data.details}</p>
        <Link to="/dashboard">Try again</Link>
      </div>
    );
  }

  // This creates the "Term | Meaning | Why it Matters" structure
  //
  return (
    <div>
      <h2>Your Simplified Report</h2>
      <p>Here are the complex terms from your report, explained in simple language.</p>

      <div className="results-list">
        {data.simplified_terms && data.simplified_terms.map((item, index) => (
          <div key={index} className="term-card">
            <h3>{item.term}</h3>
            <p><strong>What it means:</strong> {item.meaning}</p>
            <p><strong>Why it matters:</strong> {item.why_it_matters}</p>
          </div>
        ))}
      </div>

      <Link to="/dashboard">Simplify another report</Link>
    </div>
  );
};

export default ResultsPage;