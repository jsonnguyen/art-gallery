const express = require('express');
const router = express.Router();
const artworkCtrl = require('../../controllers/api/artworks');
const upload = require('../../config/upload');

router.post('/new', upload.single('image'), artworkCtrl.newArtwork);

module.exports = router;