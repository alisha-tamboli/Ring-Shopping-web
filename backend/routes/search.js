const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

// Search endpoint
router.get('/', async (req, res) => {
  try {
    const { query } = req.query;
    
    if (!query) {
      return res.status(400).json({ message: 'Search query is required' });
    }

    const results = await Product.find(
      { 
        $text: { $search: query },
        status: 'Active' // Only search active products
      },
      { score: { $meta: 'textScore' } } // Include relevance score
    ).sort({ score: { $meta: 'textScore' } }); // Sort by relevance

    res.json(results);
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;