// src/components/Header/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import * as userService from '../../utilities/users-service';
import './Header.css';

export default function Header({ user, setUser }) {
  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }

  return (
    <header className="Header">
      <h1>Virtual Art Gallery Tour</h1>
      <nav>
        <Link to="/">Home</Link>
        {user ? (
          <>
            <Link to="/artworks/new">New Artwork</Link>
            <Link to="/artworks">Artworks</Link>
            <Link to="/galleries">Galleries</Link>
            <button onClick={handleLogOut}>Logout</button>
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
