const Address = require("../models/Address");

const saveAddress = async (req, res) => {
  const { fullName, phoneNumber, addressLine1, addressLine2, city, state, postalCode, country } = req.body;

  try {
    let address = await Address.findOne({ userId: req.user._id });

    if (address) {
      // Update existing address
      address.fullName = fullName;
      address.phoneNumber = phoneNumber;
      address.addressLine1 = addressLine1;
      address.addressLine2 = addressLine2;
      address.city = city;
      address.state = state;
      address.postalCode = postalCode;
      address.country = country;
      await address.save();
    } else {
      // Create new address
      address = new Address({
        userId: req.user._id,
        fullName,
        phoneNumber,
        addressLine1,
        addressLine2,
        city,
        state,
        postalCode,
        country,
      });
      await address.save();
    }

    res.status(200).json(address);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAddress = async (req, res) => {
  try {
    const address = await Address.findOne({ userId: req.user._id });
    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }
    res.json(address);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { saveAddress, getAddress };
