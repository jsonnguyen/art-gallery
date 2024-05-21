const Artwork = require('../../models/artwork');

module.exports = {
    newArtwork,
    index,
    show
};

async function index(req, res) {
    const artworks = await Artwork.find({}).populate('user')
    res.json(artworks);
}

async function newArtwork(req, res) {
    console.log('req.file:', req.file); 
    console.log('req.body:', req.body); 

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