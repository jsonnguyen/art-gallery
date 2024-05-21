import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as artworksAPI from '../../utilities/artwork-api';

export default function ArtworkDetail() {
    const { id } = useParams();
    const [artwork, setArtwork] = useState(null);

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

    if (!artwork) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{artwork.title}</h1>
            <img src={artwork.image.url} alt={artwork.title} />
            <p>{artwork.artType}</p>
        </div>
    );
}
