const express = require('express');
const router = express.Router();
const artworkCtrl = require('../../controllers/api/artworks');
const upload = require('../../config/upload');
const ensuredLoggedIn = require('../../config/ensureLoggedIn')

router.get('/:id', artworkCtrl.show);
router.delete('/:id', ensuredLoggedIn, artworkCtrl.deleteArtwork);
router.post('/new', upload.single('image'), ensuredLoggedIn, artworkCtrl.newArtwork);
router.get('/', artworkCtrl.index);
router.post('/:id/comments', ensuredLoggedIn, artworkCtrl.createComment);

module.exports = router;