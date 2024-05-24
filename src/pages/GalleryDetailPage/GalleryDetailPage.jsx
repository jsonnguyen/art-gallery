// src/pages/GalleryDetailPage/GalleryDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as galleriesAPI from '../../utilities/galleries-api';
import * as artworksAPI from '../../utilities/artwork-api';
import './GalleryDetailPage.css';
import VRGallery from '../../components/VRGallery/VRGallery';

export default function GalleryDetailPage() {
  const { id } = useParams();
  const [gallery, setGallery] = useState(null);
  const [artworks, setArtworks] = useState([]);
  const [selectedArtwork, setSelectedArtwork] = useState('');
  const [vrMode, setVrMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchGallery() {
      try {
        const fetchedGallery = await galleriesAPI.getGalleryById(id);
        setGallery(fetchedGallery);
        console.log('Fetched Gallery:', fetchedGallery); // Debug
      } catch (error) {
        console.error('Error fetching gallery:', error);
      }
    }
    fetchGallery();
  }, [id]);

  useEffect(() => {
    async function fetchArtworks() {
      try {
        const fetchedArtworks = await artworksAPI.getAllArtworks();
        setArtworks(fetchedArtworks);
        console.log('Fetched Artworks:', fetchedArtworks); // Debug
      } catch (error) {
        console.error('Error fetching artworks:', error);
      }
    }
    fetchArtworks();
  }, []);

  async function handleAddArtwork() {
    if (!selectedArtwork) return;

    try {
      await galleriesAPI.addArtworkToGallery(id, selectedArtwork);
      const updatedGallery = await galleriesAPI.getGalleryById(id);
      setGallery(updatedGallery);
      setSelectedArtwork(''); // Reset the selected artwork
    } catch (error) {
      console.error('Error adding artwork:', error);
    }
  }

  async function handleDeleteArtwork(artworkId) {
    try {
      const updatedGallery = { ...gallery, artworks: gallery.artworks.filter(a => a._id !== artworkId) };
      await galleriesAPI.create(updatedGallery); // Assuming create function can update if gallery exists
      setGallery(updatedGallery);
    } catch (error) {
      console.error('Error deleting artwork:', error);
    }
  }

  if (!gallery) return <h1>Loading...</h1>;

  return (
    <div className="gallery-detail">
      <h1>{gallery.name}</h1>
      <button onClick={() => setVrMode(!vrMode)} className="cta-button">{vrMode ? 'Exit VR' : 'View in VR'}</button>
      {vrMode ? (
        <div className="canvas-container">
          <VRGallery artworks={gallery.artworks} />
        </div>
      ) : (
        <>
          <div className="artworks-gallery">
            {gallery.artworks.map(artwork => (
              <div key={artwork._id} className="artwork-item">
                <img src={artwork.image.url} alt={artwork.title} className="artwork-image"/>
                <h2>{artwork.title}</h2>
                <p>{artwork.artType}</p>
                <p>{new Date(artwork.date).toLocaleDateString()}</p>
                <button onClick={() => handleDeleteArtwork(artwork._id)} className="cta-button delete-button">Delete Artwork</button>
              </div>
            ))}
          </div>
          <h2>Add Artwork to Gallery</h2>
          <select value={selectedArtwork} onChange={(e) => setSelectedArtwork(e.target.value)}>
            <option value="">Select an artwork</option>
            {artworks.map(artwork => (
              <option key={artwork._id} value={artwork._id}>{artwork.title}</option>
            ))}
          </select>
          <button onClick={handleAddArtwork} className="cta-button">Add Artwork</button>
        </>
      )}
    </div>
  );
}
