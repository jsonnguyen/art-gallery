const Artwork = require('../../models/artwork');

module.exports = {
    newArtwork,
    index
};

async function index(req, res) {
    const user = req.user;
    const artworks = await Artwork.find({})
    res.json(artworks)
}

async function newArtwork(req, res) {
    console.log('req.file:', req.file); // Add this line
    console.log('req.body:', req.body); // Add this line

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