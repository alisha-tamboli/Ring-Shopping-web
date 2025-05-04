const express = require('express');
const router = express.Router();
const Address = require('../models/Address');
const { protect } = require('../middleware/authMiddleware'); // JWT middleware

// Save address
router.post('/address', protect, async (req, res) => {
  try {
    const newAddress = new Address({
      userId: req.user._id, // from JWT middleware
      fullName: req.body.fullName,
      phoneNumber: req.body.phoneNumber,
      addressLine1: req.body.addressLine1,
      addressLine2: req.body.addressLine2 || "",
      city: req.body.city,
      state: req.body.state,
      postalCode: req.body.postalCode,
      country: req.body.country || "India"
    });

    const saved = await newAddress.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get address
router.get('/address', protect, async (req, res) => {
  try {
    const address = await Address.find({ userId: req.user._id });
    res.json(address);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
