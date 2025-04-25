const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("MongoDB connection error:", err));


// Define the User schema (storing password as plain text - not secure)
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" }
});


// Define the Contact schema
const ContactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});


const User = mongoose.model('User', UserSchema);
const Contact = mongoose.model('Contact', ContactSchema);

app.use("/api", require("./routes/productRoutes"));


// Registration Route
app.post('/api/auth/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log(`Registration attempt: User with email ${email} already exists.`);
      return res.status(400).json({ message: 'User already exists' });
    }
    // Create a new user with plain text password
    const newUser = new User({ name, email, password });
    await newUser.save();
    console.log(`User registered successfully: ${email}`);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error(err);
    console.error("Error during registration:", err);
    res.status(500).json({ message: 'Server error' });
  }
});


//Login route
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    // **Direct password comparison (⚠ NOT SECURE, for testing only)**
    if (password !== user.password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    // Generate JWT token
    const token = jwt.sign({ id: user._id, role: user.role }, "your_secret_key", { expiresIn: "1h" });
    res.json({ token, role: user.role });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Contact Form Submission Route
app.post('/api/auth/contact', async (req, res) => {
  try {
    console.log("Received Contact Form Request: ", req.body); // Debugging
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }
    // Save message to database
    const newMessage = new Contact({ name, email, message });
    await newMessage.save();

    console.log(`New Contact Form Submission:
    Name: ${name}
    Email: ${email}
    Message: ${message}`);

    return res.status(200).json({ success: true, message: 'Message received successfully!' });
  } catch (error) {
    console.error('Error in contact form submission:', error);
    return res.status(500).json({ success: false, message: 'Server error. Try again later.' });
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
