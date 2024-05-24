// src/pages/Galleries/Galleries.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as galleriesAPI from '../../utilities/galleries-api';
import './Galleries.css';

export default function Galleries() {
  const [galleries, setGalleries] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchGalleries() {
      const fetchedGalleries = await galleriesAPI.getUserGalleries();
      setGalleries(fetchedGalleries);
    }
    fetchGalleries();
  }, []);

  async function handleDelete(galleryId) {
    if (window.confirm('Are you sure you want to delete this gallery?')) {
      try {
        await galleriesAPI.deleteGallery(galleryId);
        setGalleries(galleries.filter(gallery => gallery._id !== galleryId));
      } catch (error) {
        console.error('Error deleting gallery:', error);
      }
    }
  }

  return (
    <>
      <h1>My Galleries</h1>
      <Link to="/galleries/new" className="cta-button">Create New Gallery</Link>
      <div className="galleries-list">
        {galleries.map(gallery => (
          <div key={gallery._id} className="gallery-item">
            <h2>{gallery.name}</h2>
            <Link to={`/galleries/${gallery._id}`} className="cta-button">View Gallery</Link>
            <button onClick={() => handleDelete(gallery._id)} className="cta-button delete-button">Delete Gallery</button>
          </div>
        ))}
      </div>
    </>
  );
}
