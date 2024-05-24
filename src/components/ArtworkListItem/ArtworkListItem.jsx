import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from '../Modal/Modal';
import './ArtworkListItem.css';

export default function ArtworkListItem({ artworkItem }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const formattedDate = new Date(artworkItem.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });

    return (
        <>
            <div className="artwork" onClick={() => setIsModalOpen(true)}>
                <img src={artworkItem.image.url} alt="artwork" />
                <div className='artwork-card-details'>
                    <h2>Title: {artworkItem.title}</h2>
                    <p>Artist: {artworkItem.user.name}</p>
                    <p>Art Type: {artworkItem.artType}</p>
                    <p>Date: {formattedDate}</p>
                </div>
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <h1>{artworkItem.title}</h1>
                <img src={artworkItem.image.url} alt={artworkItem.title} style={{ maxWidth: '100%' }} />
                <p>Artist: {artworkItem.user.name}</p>
                <p>Art Type: {artworkItem.artType}</p>
                <p>Date: {formattedDate}</p>
                <p>Description: {artworkItem.description}</p>
            </Modal>
        </>
    );
}
