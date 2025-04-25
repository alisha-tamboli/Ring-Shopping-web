const mongoose = require("mongoose");

  const productSchema = new mongoose.Schema(
    {
      productId: {
        type: String,
        unique: true,
        required: true,
      },
      name: String,
      price: Number,
      description: String,
      image: String,
      status: { type: String, default: "Active" },
    },
    { timestamps: true }
  );
  
  module.exports = mongoose.model("Product", productSchema);
  

module.exports = mongoose.model("Product", productSchema);
