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
}, {
    toJSON:{
        virtuals: true,
    },
});

SpotSchema.virtual('img_url').get(function() {
    return `http://localhost:3333/files/${this.img}`;
});

module.exports = mongoose.model('Spot', SpotSchema);