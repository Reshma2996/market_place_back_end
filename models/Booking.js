// models/Booking.js
const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  equipmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Equipment', required: true },
  rentalStartDate: { type: Date, required: true },
  rentalEndDate: { type: Date, required: true },
  userContact: { type: String, required: true },
});

module.exports = mongoose.model('Booking', BookingSchema);
