const Equipment = require('../models/Equipment');

// Get all equipment
const getEquipments = async (req, res) => {
  try {
    const equipments = await Equipment.find();
    res.json(equipments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get equipment by ID
const getEquipmentById = async (req, res) => {
  try {
    const equipment = await Equipment.findById(req.params.id);
    if (!equipment) {
      return res.status(404).json({ message: 'Equipment not found' });
    }
    res.json(equipment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new equipment
const createEquipment = async (req, res) => {
  try {
    const { name, description, specification, rentalRate, availabilityStartDate, availabilityEndDate } = req.body;

    if (!name || !description || !specification || !rentalRate || !availabilityStartDate || !availabilityEndDate) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newEquipment = new Equipment({
      name,
      description,
      specification,
      rentalRate,
      availabilityStartDate,
      availabilityEndDate,
    });

    await newEquipment.save();
    res.status(201).json(newEquipment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update equipment
const updateEquipment = async (req, res) => {
  try {
    const { name, description, specification, rentalRate, availabilityStartDate, availabilityEndDate} = req.body;

    const equipment = await Equipment.findByIdAndUpdate(
      req.params.id,
      { name, description, specification, rentalRate, availabilityStartDate, availabilityEndDate },
      { new: true }
    );

    if (!equipment) {
      return res.status(404).json({ message: 'Equipment not found' });
    }

    res.json(equipment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete equipment
const deleteEquipment = async (req, res) => {
  try {
    const equipment = await Equipment.findByIdAndDelete(req.params.id);

    if (!equipment) {
      return res.status(404).json({ message: 'Equipment not found' });
    }

    res.json({ message: 'Equipment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getEquipments,
  getEquipmentById,
  createEquipment,
  updateEquipment,
  deleteEquipment,
};
