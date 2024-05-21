import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as artworksAPI from "../../utilities/artwork-api";
import CommentForm from "../../components/CommentForm/CommentForm";

export default function ArtworkDetail() {
    const { id } = useParams();
    const [artwork, setArtwork] = useState(null);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        async function getArtwork() {
            try {
                const artwork = await artworksAPI.getArtworkById(id);
                setArtwork(artwork);
                setComments(artwork.comments || []);
            } catch (error) {
                console.error("Failed to fetch artwork:", error);
            }
        }
        getArtwork();
    }, [id]);

    async function refreshComments() {
        try {
            const artwork = await artworksAPI.getArtworkById(id);
            setComments(artwork.comments || []);
        } catch (error) {
            console.error("Failed to refresh comments:", error);
        }
    }

    if (!artwork) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{artwork.title}</h1>
            <img src={artwork.image.url} alt={artwork.title} />
            <p>{artwork.artType}</p>
            <CommentForm artworkId={id} refreshComments={refreshComments} />
            <div>
                <h2>Comments</h2>
                {comments.map(comment => (
                    <div key={comment._id}>
                        <p>{comment.content}</p>
                        <small>{new Date(comment.createdAt).toLocaleString()}</small>
                    </div>
                ))}
            </div>
        </div>
    );
}
