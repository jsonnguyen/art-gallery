// src/pages/NewGalleryPage/NewGalleryPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as galleriesAPI from '../../utilities/galleries-api';
import * as artworksAPI from '../../utilities/artwork-api';

export default function NewGalleryPage() {
  const [formData, setFormData] = useState({ name: '' });
  const [artworks, setArtworks] = useState([]);
  const [selectedArtworks, setSelectedArtworks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchArtworks() {
      try {
        const fetchedArtworks = await artworksAPI.getAllArtworks();
        setArtworks(fetchedArtworks);
      } catch (error) {
        console.error('Error fetching artworks:', error);
      }
    }
    fetchArtworks();
  }, []);

  function handleInputChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  function handleArtworkSelect(e) {
    const artworkId = e.target.value;
    setSelectedArtworks(prevSelected =>
      prevSelected.includes(artworkId)
        ? prevSelected.filter(id => id !== artworkId)
        : [...prevSelected, artworkId]
    );
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const data = { ...formData, artworks: selectedArtworks };
    console.log('Form data to be sent:', data);  // Debug log to see the form data

    try {
      const response = await galleriesAPI.create(data);
      console.log('Gallery created successfully', response);
      navigate(`/galleries/${response._id}`); // Redirect to the gallery detail page after creation
    } catch (error) {
      console.error('Error creating gallery', error);
    }
  }

  return (
    <>
      <h1>Create New Gallery</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Gallery Name"
          required
        />
        <h2>Select Artworks</h2>
        {artworks.map(artwork => (
          <div key={artwork._id}>
            <input
              type="checkbox"
              value={artwork._id}
              onChange={handleArtworkSelect}
              checked={selectedArtworks.includes(artwork._id)}
            />
            <label>{artwork.title}</label>
          </div>
        ))}
        <button type="submit">Create Gallery</button>
      </form>
    </>
  );
}
