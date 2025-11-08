// src/components/auth/AuthPageLayout.js
import React from 'react';
import { Link } from 'react-router-dom';

function AuthPageLayout({ title, children, footerText, footerLinkText, footerLinkTo }) {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '100vh', 
      padding: '20px',
      backgroundColor: '#f4f7f6'
    }}>
      <div style={{ 
        width: '100%', 
        maxWidth: '400px', 
        padding: '30px', 
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)', 
        borderRadius: '10px',
        backgroundColor: '#fff'
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>{title}</h2>
        {children}
        <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '0.9em' }}>
          {footerText} <Link to={footerLinkTo} style={{ color: '#007bff', textDecoration: 'none' }}>{footerLinkText}</Link>
        </p>
      </div>
    </div>
  );
}

export default AuthPageLayout;