import { useEffect, useState } from 'react'
import * as artworksAPI from '../../utilities/artwork-api'
import ArtworkList from '../../components/ArtworkList/ArtworkList';

export default function Artwork () {
    const [artworks, setArtworks] =useState([])

    useEffect(function() {
        async function getArtworks() {
            const artworks = await artworksAPI.getAllArtworks();
            setArtworks(artworks);
        }
        getArtworks();
    }, []);

    return (
        <>
        <h1>Artworks</h1>
        <ArtworkList artworkItems={artworks} />

        </>
    )
}