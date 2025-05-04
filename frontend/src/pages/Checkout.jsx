import React, { useState, useEffect } from "react";
import "./Checkout.css";
import { useNavigate, useParams } from "react-router-dom";

const Checkout = () => {
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [productPrice, setProductPrice] = useState(5000); // Example price
  const { productId } = useParams();
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    name: "",
    street: "",
    district: "",
    state: "",
    country: "India",
    pincode: "",
    contactNumber: "",
  });

  // Fetch saved address
  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:5000/api/address", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();

        if (response.ok && data) {
          setAddress({
            name: data.fullName || "",
            street: data.addressLine1 || "",
            district: data.city || "",
            state: data.state || "",
            country: data.country || "India",
            pincode: data.postalCode || "",
            contactNumber: data.phoneNumber || "",
          });
        } else {
          console.warn("No saved address found.");
        }
      } catch (error) {
        console.error("Error fetching address:", error);
      }
    };

    fetchAddress();
  }, []);

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      console.log("Token being sent:", token);

      const response = await fetch("http://localhost:5000/api/address", {
        method: "POST", // POST is used for both create/update
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          fullName: address.name,
          phoneNumber: address.contactNumber,
          addressLine1: address.street,
          addressLine2: "",
          city: address.district,
          state: address.state,
          postalCode: address.pincode,
          country: "India",
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Address saved:", data);
        setShowAddressForm(false);
      } else {
        console.error("Error saving address:", data.message);
      }
    } catch (error) {
      console.error("Error saving address:", error);
    }
  };

  const handleContinue = () => {
    navigate("/paymentOptions");
  };

  const handleBack = () => {
    navigate("/products");
  };

  const gst = (productPrice * 0.18).toFixed(2);
  const platformFees = 100;
  const totalPayable = (
    parseFloat(productPrice) + parseFloat(gst) + platformFees
  ).toFixed(2);

  return (
    <div className="checkout-page">
      <div className="left-section">
        <h2>Delivery Address</h2>

        {!showAddressForm && address.name ? (
          <div className="saved-address-card">
            <h3>Saved Address</h3>
            <p><strong>{address.name}</strong></p>
            <p>{address.street}, {address.district}, {address.state} - {address.pincode}</p>
            <p>{address.country}</p>
            <p>Contact: {address.contactNumber}</p>
            <button onClick={() => setShowAddressForm(true)} className="edit-btn">Edit Address</button>
          </div>
        ) : (
          <form className="address-form" onSubmit={handleSubmit}>
            <input
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
              value={address.name}
              required
            />
            <input
              name="street"
              placeholder="Street No."
              onChange={handleChange}
              value={address.street}
              required
            />
            <input
              name="district"
              placeholder="District"
              onChange={handleChange}
              value={address.district}
              required
            />
            <input
              name="state"
              placeholder="State"
              onChange={handleChange}
              value={address.state}
              required
            />
            <input
              name="pincode"
              placeholder="Pincode"
              onChange={handleChange}
              value={address.pincode}
              required
            />
            <input
              name="contactNumber"
              placeholder="Contact Number"
              onChange={handleChange}
              value={address.contactNumber}
              required
            />
            <input value="India" disabled />
            <button type="submit" className="explore-btn">Save Address</button>
          </form>
        )}
      </div>

      <div className="right-section">
        <h2>Price Details</h2>
        <div className="price-card">
          <p>Product Price: ₹{productPrice}</p>
          <p>GST (18%): ₹{gst}</p>
          <p>Platform Fees: ₹{platformFees}</p>
          <hr />
          <h3>Total Payable: ₹{totalPayable}</h3>
        </div>

        <div className="btn-group">
          <button className="back-btn" onClick={handleBack}>Back</button>
          <button className="continue-btn" onClick={handleContinue}>Continue</button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
