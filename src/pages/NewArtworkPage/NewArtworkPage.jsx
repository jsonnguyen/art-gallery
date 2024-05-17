import React, { useState } from 'react';
import * as artworksAPI from '../../utilities/artwork-api'

export default function NewArtworkPage() {
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    artType: '',
    title: '',
    date: ''
  });

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const data = new FormData();
    data.append('image', file);
    data.append('artType', formData.artType);
    data.append('title', formData.title);
    data.append('date', formData.date);

    try {
      const response = await artworksAPI.createNewArtwork(data);
      console.log('File uploaded successfully', response);
    } catch (error) {
      console.error('Error uploading file', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Upload New Artwork</h1>
      <input type="text" name="artType" value={formData.artType} onChange={handleInputChange} placeholder="Art Type" required />
      <input type="text" name="title" value={formData.title} onChange={handleInputChange} placeholder="Title" required />
      <input type="date" name="date" value={formData.date} onChange={handleInputChange} required />
      <input type="file" onChange={handleFileChange} required />
      <button type="submit">Upload</button>
    </form>
  );
}