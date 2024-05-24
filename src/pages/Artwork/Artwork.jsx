import { useEffect, useState } from 'react';
import * as artworksAPI from '../../utilities/artwork-api';
import ArtworkList from '../../components/ArtworkList/ArtworkList';

export default function Artwork({ user }) {
    const [artworks, setArtworks] = useState([]);

    useEffect(function() {
        async function getArtworks() {
            const artworks = await artworksAPI.getAllArtworks(user._id);
            setArtworks(artworks);
        }
        getArtworks();
    }, [user]);

    return (
        <>
            <h1>My Artworks</h1>
            <ArtworkList artworkItems={artworks} />
        </>
    );
}
