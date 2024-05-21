// src/components/Header/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

export default function Header({ user, setUser }) {
  const handleLogout = () => {
    // Add logout functionality here, e.g., remove user from state and localStorage
    setUser(null);
    // Other logout actions if necessary
  };

  return (
    <header className="Header">
      <h1>Virtual Art Gallery Tour</h1>
      <nav>
        <Link to="/">Home</Link>
        {user ? (
          <>
            <Link to="/artworks/new">New Artwork</Link>
            <Link to="/orders">Order History</Link>
            <Link to="/artworks">Artworks</Link>
            <Link to="/galleries">Galleries</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/signup">Sign Up</Link>
            <Link to="/login">Login</Link>
          </>
        )}
      </nav>
    </header>
  );
}
