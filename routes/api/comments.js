const express = require('express');
const router = express.Router();
const commentCtrl = require('../../controllers/api/comments');
const ensuredLoggedIn = require('../../config/ensureLoggedIn');

router.delete('/:id', ensuredLoggedIn, commentCtrl.deleteComment);

module.exports = router;
