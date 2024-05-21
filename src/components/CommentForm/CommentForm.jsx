import { useState } from "react";
import * as artworksAPI from "../../utilities/artwork-api";

export default function CommentForm({ artworkId, refreshComments }) {
    const [content, setContent] = useState('');

    async function handleSubmit(event) {
        event.preventDefault();
        if (!content.trim()) return;  // Prevent empty comments

        try {
            const commentData = { content };
            await artworksAPI.addComment(artworkId, commentData);
            setContent('');
            refreshComments();  // Refresh the comments after a new one is added
        } catch (error) {
            console.error("Failed to add comment:", error);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Add a comment"
                required
            />
            <button type="submit">Submit</button>
        </form>
    );
}
