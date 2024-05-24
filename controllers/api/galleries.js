const Gallery = require('../../models/gallery');

module.exports = {
    newGallery,
    getUserGalleries,
    getAllGalleries,
    getGalleryById,
    deleteGallery,
    addArtworkToGallery
};

async function newGallery(req, res) {
    const user = req.user._id;
    const { name, artworks } = req.body;

    const gallery = new Gallery({
        user,
        name,
        artworks
    });

    try {
        await gallery.save();
        res.json(gallery);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}

async function getUserGalleries(req, res) {
    const user = req.user._id;

    try {
        const galleries = await Gallery.find({ user }).populate('artworks');
        res.json(galleries);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}

async function getAllGalleries(req, res) {
    try {
        const galleries = await Gallery.find({}).populate('user').populate('artworks');
        res.json(galleries);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}

async function getGalleryById(req, res) {
    try {
        const gallery = await Gallery.findById(req.params.id).populate('artworks').populate('user');
        res.json(gallery);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}

async function deleteGallery(req, res) {
    try {
        const gallery = await Gallery.findById(req.params.id);
        if (gallery.user.toString() !== req.user._id) {
            return res.status(403).json({ error: 'Unauthorized to delete this gallery' });
        }
        await gallery.remove();
        res.json(gallery);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}

async function addArtworkToGallery(req, res) {
    try {
        const gallery = await Gallery.findById(req.params.id);
        if (gallery.user.toString() !== req.user._id) {
            return res.status(403).json({ error: 'Unauthorized to add artwork to this gallery' });
        }
        gallery.artworks.push(req.body.artworkId);
        await gallery.save();
        res.json(gallery);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}
