// const multer = require("multer");
// const storage = multer.memoryStorage();
// const upload = multer({ storage });
// module.exports = upload;


const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("./config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "products", // folder name on Cloudinary
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
