import './ArtworkListItem.css'

export default function ArtworkListItem({ artworkItem }) {
    return(
        <div className="artwork-container">
            <div className='artwork'>
                <img src={artworkItem.image.url} alt="artwork" />
                <div className='artwork-card-details'>
                    <h2>{artworkItem.title}</h2>
                    <p>{artworkItem.user.name}</p>
                    <p>{artworkItem.artType}</p>
                    <p>{artworkItem.date}</p>
                </div>
            </div>
        </div>
    );
}