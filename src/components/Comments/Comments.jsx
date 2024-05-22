import { useEffect, useState, useCallback } from "react";
import * as artworksAPI from "../../utilities/artwork-api";
import * as commentsAPI from "../../utilities/comments-api";
import CommentForm from "../../components/CommentForm/CommentForm";

export default function Comments({ artworkId, user }) {
    const [comments, setComments] = useState([]);

    const refreshComments = useCallback(async () => {
        try {
            const artwork = await artworksAPI.getArtworkById(artworkId);
            setComments(artwork.comments || []);
        } catch (error) {
            console.error("Failed to refresh comments:", error);
        }
    }, [artworkId]);

    const handleDeleteComment = async (commentId) => {
        try {
            await commentsAPI.deleteComment(commentId);
            refreshComments();
        } catch (error) {
            console.error("Failed to delete comment:", error);
        }
    };

    useEffect(() => {
        refreshComments();
    }, [refreshComments]);

    return (
        <div>
            <h2>Comments</h2>
            <CommentForm artworkId={artworkId} refreshComments={refreshComments} />
            {comments.map(comment => (
                <div key={comment._id}>
                    <p>{comment.content}</p>
                    <small>By: {comment.user.name} at {new Date(comment.createdAt).toLocaleString()}</small>
                    {user && comment.user._id === user._id && (
                        <button onClick={() => handleDeleteComment(comment._id)}>Delete</button>
                    )}
                </div>
            ))}
        </div>
    );
}
