import ArtworkListItem from "../ArtworkListItem/ArtworkListItem";

export default function ArtworkList({ artworkItems }) {
    const artwork = artworkItems.map(art =>
        
        <ArtworkListItem 
        key={art._id}
        artworkItem={art}
        />
    )


    return (
        <main>
            {artwork}
        </main>
    );
}