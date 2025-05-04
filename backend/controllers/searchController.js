const Product = require("../models/Product");

const searchProducts = async (req, res) => {
  const { query } = req.query;
  if (!query) {
    return res.status(400).json({ message: "Query is required" });
  }

  try {
    const results = await Product.find({
      $text: { $search: query }
    }, {
      score: { $meta: "textScore" }
    }).sort({ score: { $meta: "textScore" } });

    res.json(results);
  } catch (err) {
    console.error("Search Error:", err);
    res.status(500).json({ message: "Server error during search" });
  }
};

module.exports = { searchProducts };
