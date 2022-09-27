const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    gender: { type: String, required: true },
    race: { type: String, required: true },
    birthplace: { type: String, required: true },
    birthdate: { type: String, required: true },
    height: { type: String, required: true },
    weight: { type: String, required: true },
    eyeColor: { type: String, required: true },
    hairColor: { type: String, required: true },
    wantedReason: { type: String, required: true },
    issuedBy: { type: String, required: true },
    orderId: { type: String, required: true },
    issueDate: { type: String, required: true },
    validUntil: { type: String, required: true },
    additional: { type: String, required: true },
    isDanger: { type: String, required: true },
    imgUrl: { type: String, required: false },
    status: { type: String, required: true }
});

module.exports = mongoose.model('Order', orderSchema);