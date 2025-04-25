const express = require('express');
const Product = require('../models/Product');
const verifyAdmin = require('../middleware/auth');

const router = express.Router();

router.post('/add-product', verifyAdmin, async (req, res) => {
  const { name, description, price, image } = req.body;
  try {
    const newProduct = new Product({ name, description, price, image });
    await newProduct.save();
    res.status(201).json({ message: 'Product added successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
