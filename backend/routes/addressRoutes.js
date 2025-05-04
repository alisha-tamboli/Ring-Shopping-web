const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { saveAddress, getAddress } = require("../controllers/addressController");

router.post("/", protect, saveAddress); // POST /api/address
router.get("/", protect, getAddress);   // GET /api/address
router.post("/", protect, saveAddress);


module.exports = router;
