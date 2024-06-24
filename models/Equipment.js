const mongoose = require('mongoose');

const EquipmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  specification: {
    type: String,
    required: true,
  },
  rentalRate: {
    type: Number,
    required: true,
  },
  availabilityStartDate: {
    type: Date,
    required: true,
  },
  availabilityEndDate: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model('Equipment', EquipmentSchema);
