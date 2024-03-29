const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newsSchema = new Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: String, required: true },
    imgUrl: { type: String, required: true }
});

module.exports = mongoose.model('News', newsSchema);