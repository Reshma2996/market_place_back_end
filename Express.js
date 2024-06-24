const express = require('express');
const router = express.Router();
const Equipment = require('../models/Equipment'); // Import your Equipment model

// POST endpoint to add new equipment
router.post('/equipments', async (req, res) => {
    try {
        const { name, description,specifications,rentalRate, availabilityStartDate,availabilityEndDate} = req.body; //  equipment details
    
        // Create new equipment instance
        const newEquipment = new Equipment({
          name,
          description,
          specifications,
          rentalRate,
          availabilityStartDate,
          availabilityEndDate
        });
    // Save equipment to MongoDB
    const savedEquipment = await newEquipment.save();

    res.status(201).json(savedEquipment); // Respond with saved equipment object
  } catch (err) {
    console.error('Failed to save equipment:', err);
    res.status(500).json({ error: 'Failed to save equipment' });
  }
});

module.exports = router;
