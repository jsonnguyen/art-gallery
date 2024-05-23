const Gallery = require('../../models/gallery');

module.exports = {
    newGallery,
    getGalleries,
    getGalleryById
};

async function newGallery(req, res) {
    const user = req.user._id;
    const { name } = req.body;

    const gallery = new Gallery({
        user,
        name
    });

    try {
        await gallery.save();
        res.json(gallery);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}

async function getGalleries(req, res) {
    const user = req.user._id;

    try {
        const galleries = await Gallery.find({ user }).populate('artworks');
        res.json(galleries);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}

async function getGalleryById(req, res) {
    try {
        const gallery = await Gallery.findById(req.params.id).populate('artworks');
        res.json(gallery);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}