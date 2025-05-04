const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
const path = require("path");

const checkoutRoutes = require('./routes/checkoutRoutes');
const addressRoutes = require("./routes/addressRoutes");
const searchRoutes = require("./routes/search");

dotenv.config();

// Models
const User = require("./models/User");
const Contact = require("./models/Contact");

// App initialization
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use("/api", require("./routes/productRoutes"));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use('/api', checkoutRoutes);
app.use('/api/search', require('./routes/search'));
app.use("/api/address", addressRoutes);
app.use("/api/search", searchRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("MongoDB connection error:", err));



// Registration Route
app.post('/api/auth/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log(`Registration attempt: User with email ${email} already exists.`);
      return res.status(400).json({ message: 'User already exists' });
    }
    const newUser = new User({ name, email, password });
    await newUser.save();
    console.log(`User registered successfully: ${email}`);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error("Error during registration:", err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login Route
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (password !== user.password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.json({ token, role: user.role });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Contact Form Submission Route
app.post('/api/auth/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const newMessage = new Contact({ name, email, message });
    await newMessage.save();

    console.log(`New Contact Form Submission: Name: ${name}, Email: ${email}, Message: ${message}`);
    return res.status(200).json({ success: true, message: 'Message received successfully!' });
  } catch (error) {
    console.error('Error in contact form submission:', error);
    return res.status(500).json({ success: false, message: 'Server error. Try again later.' });
  }
});


// Save Address Route
app.post('/api/checkout/address', async (req, res) => {
  try {
    const { userId, fullName, phoneNumber, addressLine1, addressLine2, city, state, postalCode, country } = req.body;

    if (!userId || !fullName || !phoneNumber || !addressLine1 || !city || !state || !postalCode || !country) {
      return res.status(400).json({ success: false, message: "All required fields must be filled" });
    }

    const newAddress = new Address({
      userId,
      fullName,
      phoneNumber,
      addressLine1,
      addressLine2,
      city,
      state,
      postalCode,
      country
    });

    await newAddress.save();

    console.log(`New address saved for user: ${userId}`);
    res.status(201).json({ success: true, message: "Address saved successfully" });
  } catch (error) {
    console.error("Error saving address:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});



// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
