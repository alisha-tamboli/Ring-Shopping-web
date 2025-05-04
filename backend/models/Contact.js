const mongoose = require('mongoose');

// Define the Contact schema
const ContactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

// Export the Contact model
const Contact = mongoose.model('Contact', ContactSchema);
module.exports = Contact;
