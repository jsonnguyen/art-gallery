import { useState } from "react";
import * as artworksAPI from "../../utilities/artwork-api";
import "./CommentForm.css"; // Import CSS file for styling

export default function CommentForm({ artworkId, refreshComments }) {
    const [content, setContent] = useState("");

    async function handleSubmit(event) {
        event.preventDefault();
        if (!content.trim()) return;

        try {
            const commentData = { content };
            await artworksAPI.addComment(artworkId, commentData);
            setContent("");
            refreshComments();
        } catch (error) {
            console.error("Failed to add comment:", error);
        }
    }

    return (
        <div className="comment-form-container"> {/* Container element */}
            <form onSubmit={handleSubmit} className="comment-form">
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Add a comment"
                    required
                    className="comment-textarea"
                />
                <button type="submit" className="comment-submit-button">Submit</button>
            </form>
        </div>
    );
}
