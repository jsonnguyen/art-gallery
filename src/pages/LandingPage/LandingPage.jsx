// src/pages/LandingPage/LandingPage.jsx
import React from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './LandingPage.css';

export default function LandingPage({ user, setUser }) {
  return (
    <div className="LandingPage">
      <Header user={user} setUser={setUser} />
      <main>
        <section className="hero">
          <h1>Welcome to the Virtual Art Gallery Tour</h1>
          <p>Create and explore virtual art galleries. Upload your artwork, curate personal galleries, and share them with the community.</p>
          {!user && <a href="/signup" className="cta-button">Get Started</a>}
        </section>
        <section className="features">
          <h2>Features</h2>
          <ul>
            <li>User authentication and artist profiles</li>
            <li>Upload and categorization of artwork</li>
            <li>Creation of virtual galleries with drag-and-drop layouts</li>
            <li>Virtual tour functionality with commentary and music options</li>
            <li>Social features for community interactions and gallery sharing</li>
          </ul>
        </section>
      </main>
      <Footer />
    </div>
  );
}
