const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const multer = require("multer");

// multer: stores images in /uploads locally
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "./uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage: storage });

router.post("/addProduct", upload.single("image"), async (req, res) => {
  try {
    const { name, price, description } = req.body;
    const imagePath = req.file ? req.file.path : "";

    // Count all products to generate a new ID like Pr001
    const count = await Product.countDocuments({});
    const productId = `Pr${String(count + 1).padStart(3, "0")}`; // Pr001, Pr002...

    const newProduct = new Product({
      productId,
      name,
      price,
      description,
      image: imagePath,
    });

    await newProduct.save();

    res.status(201).json({ message: "Product added successfully" });
  } catch (error) {
    console.error("Add product error:", error.message);
    res.status(500).json({ error: "Failed to add product" });
  }
});

// GET all products
router.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error("Fetching error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET single products
router.get("/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    console.error("Fetching error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// DELETE: Delete a product
router.delete('/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting product' });
  }
});

// PUT: Edit a product
router.put('/:id', async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedProduct);
  } catch (err) {
    res.status(500).json({ error: 'Error updating product' });
  }
});

// To Change Product Status (Active/Deactive)
router.put("/updateStatus/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const { status } = req.body; // "Active" or "Deactive"

    const updated = await Product.findByIdAndUpdate(
      productId,
      { status },
      { new: true }
    );
    res.status(200).json({ message: "Status updated", updated });
  } catch (err) {
    console.error("Status update error:", err);
    res.status(500).json({ error: "Error updating status" });
  }
});



module.exports = router;
