const Artwork = require('../../models/artwork');

module.exports = {
    deleteComment
};

async function deleteComment(req, res) {
    try {
        const artwork = await Artwork.findOne({ 'comments._id': req.params.id, 'comments.user': req.user._id });
        if (!artwork) {
            return res.status(404).json({ error: 'Comment not found or not authorized' });
        }
        artwork.comments.id(req.params.id).remove();
        await artwork.save();
        res.json(artwork);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
