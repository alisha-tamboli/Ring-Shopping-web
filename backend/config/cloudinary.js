const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");

dotenv.config();

cloudinary.config({
    cloud_name: 'dqjhvsolm',
    api_key: '439632259418983',
    api_secret: 'B8luilNWLOhgKUiAQTOdCWD_osU'
});

// After multer
const result = await cloudinary.uploader.upload(req.file.path);
const newProduct = new Product({
  name,
  price,
  description,
  image: result.secure_url,  // Store only the URL
});
module.exports = cloudinary;
