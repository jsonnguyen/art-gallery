import { useState } from "react";
import * as artworksAPI from "../../utilities/artwork-api";

export default function CommentForm({ artworkId, refreshComments }) {
    const [content, setContent] = useState('');

    async function handleSubmit(event) {
        event.preventDefault();
        if (!content.trim()) return;

        try {
            const commentData = { content };
            await artworksAPI.addComment(artworkId, commentData);
            setContent('');
            refreshComments(); 
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
