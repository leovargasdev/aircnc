const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    reason: String,
    date: {
        type: Date,
        min: new Date(),
    },
    approved: Boolean,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    spot: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Spot'
    }
});

module.exports = mongoose.model('Booking', BookingSchema);