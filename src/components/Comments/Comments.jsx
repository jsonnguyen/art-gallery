import { useEffect, useState } from "react";
import * as artworksAPI from "../../utilities/artwork-api";
import CommentForm from "../../components/CommentForm/CommentForm";

export default function Comments({ artworkId }) {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        refreshComments();
    }, [artworkId]);

    async function refreshComments() {
        try {
            const artwork = await artworksAPI.getArtworkById(artworkId);
            setComments(artwork.comments || []);
        } catch (error) {
            console.error("Failed to refresh comments:", error);
        }
    }

    return (
        <div>
            <h2>Comments</h2>
            <CommentForm artworkId={artworkId} refreshComments={refreshComments} />
            {comments.map(comment => (
                <div key={comment._id}>
                    <p>{comment.content}</p>
                    <small>{new Date(comment.createdAt).toLocaleString()}</small>
                </div>
            ))}
        </div>
    );
}
