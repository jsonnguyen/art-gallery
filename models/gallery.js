//models/gallery.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gallerySchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    artworks: [{
        type: Schema.Types.ObjectId,
        ref: 'Artwork'
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('Gallery', gallerySchema);
