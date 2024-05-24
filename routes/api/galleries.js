const express = require('express');
const router = express.Router();
const galleriesCtrl = require('../../controllers/api/galleries');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

// Routes
router.post('/', ensureLoggedIn, galleriesCtrl.newGallery);
router.get('/user', ensureLoggedIn, galleriesCtrl.getUserGalleries); // User's galleries
router.get('/all', galleriesCtrl.getAllGalleries); // All galleries
router.get('/:id', ensureLoggedIn, galleriesCtrl.getGalleryById);
router.delete('/:id', ensureLoggedIn, galleriesCtrl.deleteGallery);
router.post('/:id/artworks', ensureLoggedIn, galleriesCtrl.addArtworkToGallery);

module.exports = router;
