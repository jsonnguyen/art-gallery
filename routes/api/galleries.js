const express = require('express');
const router = express.Router();
const galleriesCtrl = require('../../controllers/api/galleries');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

// Routes
router.post('/', ensureLoggedIn, galleriesCtrl.newGallery);
router.get('/', ensureLoggedIn, galleriesCtrl.getGalleries);
router.get('/:id', ensureLoggedIn, galleriesCtrl.getGalleryById);
router.delete('/:id', ensureLoggedIn, galleriesCtrl.deleteGallery);
router.post('/:id/artworks', ensureLoggedIn, galleriesCtrl.addArtworkToGallery); // Add this route

module.exports = router;
