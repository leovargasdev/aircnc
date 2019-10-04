const mongoose = require('mongoose');

const SpotSchema = new mongoose.Schema({
    img: String,
    company: String,
    price: Number,
    techs: [],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Spot', SpotSchema);