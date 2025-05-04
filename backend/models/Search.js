const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

router.get('/', async (req, res) => {
  const query = req.query.query;
  if (!query) return res.status(400).json({ message: "Missing search query" });

  try {
    const results = await Product.find({ $text: { $search: query } });
    res.json(results);
  } catch (err) {
    console.error("Search error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
