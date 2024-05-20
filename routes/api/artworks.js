const express = require('express');
const router = express.Router();
const artworkCtrl = require('../../controllers/api/artworks');
const upload = require('../../config/upload');
const ensuredLoggedIn = require('../../config/ensureLoggedIn')

router.post('/new', upload.single('image'), ensuredLoggedIn, artworkCtrl.newArtwork);
router.get('/', artworkCtrl.index);

module.exports = router;