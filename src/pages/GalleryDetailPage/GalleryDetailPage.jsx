// src/pages/GalleryDetailPage/GalleryDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as galleriesAPI from '../../utilities/galleries-api';
import './GalleryDetailPage.css';

export default function GalleryDetailPage() {
  const { id } = useParams();
  const [gallery, setGallery] = useState(null);

  useEffect(() => {
    async function fetchGallery() {
      try {
        const fetchedGallery = await galleriesAPI.getGalleryById(id);
        setGallery(fetchedGallery);
      } catch (error) {
        console.error('Error fetching gallery:', error);
      }
    }
    fetchGallery();
  }, [id]);

  if (!gallery) return <h1>Loading...</h1>;

  return (
    <div className="gallery-detail">
      <h1>{gallery.name}</h1>
      <div className="artworks">
        {gallery.artworks.map(artwork => (
          <div key={artwork._id} className="artwork-item">
            <img src={artwork.image.url} alt={artwork.title} />
            <h2>{artwork.title}</h2>
            <p>{artwork.artType}</p>
            <p>{new Date(artwork.date).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
