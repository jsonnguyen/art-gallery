const Artwork = require('../../models/artwork');

module.exports = {
    newArtwork,
    index,
    show,
    createComment
};

async function index(req, res) {
    const artworks = await Artwork.find({}).populate('user')
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
    console.log(res)
    const artwork = await Artwork.findById(req.params.id);
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