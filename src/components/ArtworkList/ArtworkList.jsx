import './ArtworkList.css';
import ArtworkListItem from "../ArtworkListItem/ArtworkListItem";

export default function ArtworkList({ artworkItems }) {
    return (
        <div className="artwork-container">
            {artworkItems.map(art => (
                <ArtworkListItem key={art._id} artworkItem={art} />
            ))}
        </div>
    );
}
