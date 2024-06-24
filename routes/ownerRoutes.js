const express = require('express');
const { registerOwner, authOwner } = require('../controllers/ownerController');
const router = express.Router();

router.post('/register', registerOwner);
router.post('/login', authOwner);

module.exports = router;



