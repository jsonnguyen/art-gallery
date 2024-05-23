import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as artworksAPI from '../../utilities/artwork-api'

export default function NewArtworkPage() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    artType: '',
    title: '',
    date: ''
  });

  function handleFileChange(e) {
    setFile(e.target.files[0]);
  };

  function handleInputChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    
    const data = new FormData();
    data.append('image', file);
    data.append('artType', formData.artType);
    data.append('title', formData.title);
    data.append('date', formData.date);

    try {
      const response = await artworksAPI.createNewArtwork(data);
      console.log('File uploaded successfully', response._id);
      navigate(`/artworks/${response._id}`)
    } catch (error) {
      console.error('Error uploading file', error);
    }
  };

  return (
    <>
      <h1>Upload New Artwork</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="artType" value={formData.artType} onChange={handleInputChange} placeholder="Art Type" required />
        <input type="text" name="title" value={formData.title} onChange={handleInputChange} placeholder="Title" required />
        <input type="date" name="date" value={formData.date} onChange={handleInputChange} required />
        <input type="file" onChange={handleFileChange} required />
        <button type="submit">Upload</button>
      </form>
    </>
  );
}