// routes/userRoutes.js
const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Save address (User should be logged in to save)
router.put('/updateAddress', async (req, res) => {
  try {
    const user = await User.findById(req.user.id); // Get user ID from JWT token
    if (user) {
      user.address = req.body.address; // Save the new address
      await user.save();
      res.json(user.address);
    } else {
      res.status(404).send("User not found");
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Fetch user's saved address (For showing on checkout page)
router.get('/getAddress', async (req, res) => {
  try {
    const user = await User.findById(req.user.id); // Get user ID from JWT token
    if (user) {
      res.json(user.address); // Send saved address
    } else {
      res.status(404).send("User not found");
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
