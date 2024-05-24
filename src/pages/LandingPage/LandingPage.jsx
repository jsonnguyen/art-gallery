// src/pages/LandingPage/LandingPage.jsx
import React from 'react';
import './LandingPage.css';
import backgroundImage from '../../background.jpg'; 

export default function LandingPage({ user, setUser }) {
  return (
    <div className="LandingPage">
      <main>
        <section className="hero">
          <div className="hero-content">
            <h1>Welcome to the Virtual Art Gallery Tour</h1>
            <p>Create and explore virtual art galleries. Upload your artwork, curate personal galleries, and share them with the community.</p>
            {!user && <a href="/signup" className="cta-button">Get Started</a>}
          </div>
        </section>
      </main>
    </div>
  );
}