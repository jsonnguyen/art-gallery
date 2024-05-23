import './ArtworkListItem.css'
import { Link } from 'react-router-dom';

export default function ArtworkListItem({ artworkItem }) {
    const formattedDate = new Date(artworkItem.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });
    return (
        <Link to={artworkItem._id} className="artwork-link">
            <div className='artwork'>
                <img src={artworkItem.image.url} alt="artwork" />
                <div className='artwork-card-details'>
                    <h2>Title: {artworkItem.title}</h2>
                    <p>Artist: {artworkItem.user.name}</p>
                    <p>Art Type: {artworkItem.artType}</p>
                    <p>Date: {formattedDate}</p>
                </div>
            </div>
        </Link>
    );
}
