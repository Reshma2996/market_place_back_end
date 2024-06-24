// controllers/bookingController.js
const Booking = require('../models/Booking');
const Equipment = require('../models/Equipment');

// Get all bookings
exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate('equipmentId');
    res.json(bookings);
  } catch (error) {
    res.status(500).send('Server Error');
  }
};

// Create new booking
exports.createBooking = async (req, res) => {
  try {
    const equipment = await Equipment.findById(req.body.equipmentId);
    if (!equipment) return res.status(404).json({ msg: 'Equipment not found' });

    const newBooking = new Booking(req.body);
    const booking = await newBooking.save();
    res.json(booking);
  } catch (error) {
    res.status(500).send('Server Error');
  }
};
