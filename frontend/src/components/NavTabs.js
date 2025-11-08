// src/components/NavTabs.js
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

function NavTabs({ setAuth }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the JWT token
    localStorage.removeItem('token');
    // Update auth state
    setAuth(false);
    // Redirect to login page
    navigate('/login');
  };

  const navItemStyle = ({ isActive }) => ({
    padding: '10px 15px',
    textDecoration: 'none',
    color: isActive ? 'white' : '#ccc',
    backgroundColor: isActive ? '#0056b3' : 'transparent',
    borderRadius: '4px'
  });

  return (
    <nav style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      backgroundColor: '#007bff', 
      padding: '10px 20px', 
      color: 'white' 
    }}>
      <div style={{ display: 'flex', gap: '15px' }}>
        <NavLink to="/dashboard" style={navItemStyle}>Dashboard</NavLink>
        <NavLink to="/results" style={navItemStyle}>Results</NavLink>
      </div>
      <button 
        onClick={handleLogout} 
        style={{ 
          padding: '8px 15px', 
          backgroundColor: '#dc3545', 
          color: 'white', 
          border: 'none', 
          borderRadius: '4px', 
          cursor: 'pointer' 
        }}
      >
        Logout
      </button>
    </nav>
  );
}

export default NavTabs;