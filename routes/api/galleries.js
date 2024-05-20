const express = require('express');
const router = express.Router();
const galleriesCtrl = require('../../controllers/api/galleries');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

router.post('/', ensureLoggedIn, galleriesCtrl.newGallery);
router.get('/', ensureLoggedIn, galleriesCtrl.getGalleries);

module.exports = router;
