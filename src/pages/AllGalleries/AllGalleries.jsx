// src/pages/AllGalleries/AllGalleries.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link here
import * as galleriesAPI from '../../utilities/galleries-api';
import './AllGalleries.css';

export default function AllGalleries() {
  const [galleriesByUser, setGalleriesByUser] = useState({});

  useEffect(() => {
    async function fetchGalleries() {
      const fetchedGalleries = await galleriesAPI.getAllGalleries();
      const groupedByUser = fetchedGalleries.reduce((acc, gallery) => {
        const userId = gallery.user._id;
        if (!acc[userId]) {
          acc[userId] = {
            user: gallery.user,
            galleries: []
          };
        }
        acc[userId].galleries.push(gallery);
        return acc;
      }, {});
      setGalleriesByUser(groupedByUser);
    }
    fetchGalleries();
  }, []);

  return (
    <>
      <h1>All Galleries</h1>
      <div className="all-galleries">
        {Object.values(galleriesByUser).map(userGalleries => (
          <div key={userGalleries.user._id} className="user-section">
            <h2>{userGalleries.user.name}'s Galleries</h2>
            <div className="galleries-list">
              {userGalleries.galleries.map(gallery => (
                <div key={gallery._id} className="gallery-item">
                  <h3>{gallery.name}</h3>
                  <Link to={`/galleries/${gallery._id}`} className="cta-button">View Gallery</Link>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
