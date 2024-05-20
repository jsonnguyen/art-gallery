import { useEffect, useState } from 'react';
import * as galleriesAPI from '../../utilities/galleries-api';

export default function Galleries() {
    const [galleries, setGalleries] = useState([]);

    useEffect(() => {
        async function fetchGalleries() {
            const galleries = await galleriesAPI.getAll();
            setGalleries(galleries);
        }
        fetchGalleries();
    }, []);

    return (
        <div>
            <h1>My Galleries</h1>
            {galleries.length ? (
                <ul>
                    {galleries.map(gallery => (
                        <li key={gallery._id}>
                            <h2>{gallery.name}</h2>
                            <ul>
                                {gallery.artworks.map(artwork => (
                                    <li key={artwork._id}>{artwork.title}</li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No galleries yet</p>
            )}
        </div>
    );
}