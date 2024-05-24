const Artwork = require('../../models/artwork');

module.exports = {
    newArtwork,
    index,
    show,
    createComment,
    deleteArtwork
};

async function index(req, res) {
    const userId = req.query.userId;
    const filter = userId ? { user: userId } : {};
    const artworks = await Artwork.find(filter).populate('user')
    res.json(artworks);
}

async function newArtwork(req, res) {
    const user = req.user._id;
    const { artType, title, date } = req.body;

    if (!req.file) {
        return res.status(400).json({ error: 'Image upload failed' });
    }

    const image = {
        url: req.file.location
    };

    const artwork = new Artwork({
        user,
        artType,
        title,
        date,
        image
    });

    try {
        await artwork.save();
        res.json(artwork);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}

async function show(req, res) {
    const artwork = await Artwork.findById(req.params.id).populate('comments.user');
    res.json(artwork);
}

async function createComment(req, res) {
    const artwork = await Artwork.findById(req.params.id);
    req.body.user = req.user._id;

    artwork.comments.push(req.body);
    try {
        await artwork.save();
        const updatedArtwork = await Artwork.findById(req.params.id).populate('comments.user');
        res.json(updatedArtwork);
    } catch (error) {
        console.log(error)
    }
}

async function deleteArtwork(req, res) {
    try {
        const artwork = await Artwork.findById(req.params.id);

        if (!artwork) {
            return res.status(404).json({ error: 'Artwork not found' });
        }

        if (artwork.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ error: 'Unauthorized' });
        }

        await Artwork.findByIdAndDelete(req.params.id);
        res.json({ message: 'Artwork deleted successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}
