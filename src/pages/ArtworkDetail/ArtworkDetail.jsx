import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as artworksAPI from '../../utilities/artwork-api';
import Comments from "../../components/Comments/Comments";
import './ArtworkDetail.css';

export default function ArtworkDetail({ user }) {
    const { id } = useParams();
    const [artwork, setArtwork] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function getArtwork() {
            try {
                const artwork = await artworksAPI.getArtworkById(id);
                setArtwork(artwork);
                console.log(artwork);
            } catch (error) {
                console.error("Failed to fetch artwork:", error);
            }
        }
        getArtwork();
    }, [id]);

    async function handleDelete() {
        try {
            await artworksAPI.deleteArtwork(id);
            navigate('/artworks');
        } catch (error) {
            console.error('Error deleting artwork:', error);
        }
    }

    if (!artwork) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{artwork.title}</h1>
            <img 
                src={artwork.image.url} 
                alt={artwork.title} 
                className="artwork-detail-image"
            />
            <p>{artwork.artType}</p>
            {artwork.user === user._id && (
                <button onClick={handleDelete}>Delete Artwork</button>
            )}
            <Comments artworkId={id} user={user} />
        </div>
    );
}
