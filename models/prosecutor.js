const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const prosecutorSchema = new Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    county: { type: String, required: true },
    info: { type: String, required: true },
    imgUrl: { type: String, required: true }
});

module.exports = mongoose.model('Prosecutors', prosecutorSchema);