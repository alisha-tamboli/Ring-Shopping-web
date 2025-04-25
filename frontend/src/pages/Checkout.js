import React, { useState } from "react";
import "./Checkout.css";

const Checkout = ({ setActivePage }) => {
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [deliveryDate, setDeliveryDate] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  const handlePlaceOrder = () => {
    if (!name.trim() || !address.trim()) {
      alert("Please fill in all fields before placing the order.");
      return;
    }
    
    if (paymentMethod === "cod") {
      // Calculate delivery date (7 days from today)
      const today = new Date();
      today.setDate(today.getDate() + 7);
      const formattedDate = today.toDateString();

      setOrderPlaced(true);
      setDeliveryDate(formattedDate);
    } else {
      // Redirect to Payment Options Page
      setActivePage("paymentOptions");
    }
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      
      {orderPlaced ? (
        <div className="order-confirmation">
          <span className="blue-tick">✔</span>
          <h3>Your order is confirmed!</h3>
          <p>Expected delivery date: <strong>{deliveryDate}</strong></p>
          <button onClick={() => setActivePage("home")}>Back to Home</button>
        </div>
      ) : (
        <form className="checkout-form">
          <label>Name:</label>
          <input type="text" placeholder="Enter your name" required value={name} onChange={(e) => setName(e.target.value)} />

          <label>Address:</label>
          <textarea placeholder="Enter your address" required value={address} onChange={(e) => setAddress(e.target.value)} />

          <label>Payment Method:</label>
          <div className="payment-options"> 
            <input
              type="radio"
              id="cod"
              name="payment"
              value="cod"
              checked={paymentMethod === "cod"}
              onChange={() => setPaymentMethod("cod")}
            />
            <label htmlFor="cod">Cash on Delivery</label>

            <input
              type="radio"
              id="online"
              name="payment"
              value="online"
              onChange={() => setPaymentMethod("online")}
            />
            <label htmlFor="online">Online Payment</label>
          </div>

          <button type="button" className="place-order-btn" onClick={handlePlaceOrder}>
            Place Order
          </button>
        </form>
      )}
    </div>
  );
};

export default Checkout;
