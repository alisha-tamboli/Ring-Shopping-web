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
      description: {type: String, index: true },
      keywords: {type: [String], default: [], index: true },
      image: String,
      status: { type: String, default: "Active" },
    },
    { timestamps: true }
  );
  
  // Create text index for search
    productSchema.index({
      name: 'text',
      description: 'text',
      keywords: 'text'
    }, {
      weights: {
        name: 3,        // Name matches are most important
        description: 1,
        keywords: 2     // Keyword matches are medium importance
      }
    });


module.exports =  mongoose.models.Product || mongoose.model("Product", productSchema);

