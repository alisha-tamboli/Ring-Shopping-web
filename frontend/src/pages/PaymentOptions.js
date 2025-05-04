import React, { useState, useEffect } from 'react';
import "./PaymentOptions.css";

const PaymentOptions = () => {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [deliveryDate, setDeliveryDate] = useState('');

  const price = 7999; // Example product price
  const productName = "Elegant Diamond Ring";

  useEffect(() => {
    const date = new Date();
    date.setDate(date.getDate() + 4);
    const formatted = date.toDateString();
    setDeliveryDate(formatted);
  }, []);

  const handlePayment = () => {
    if (paymentMethod) {
      setOrderPlaced(true);
    } else {
      alert("Please select a payment method.");
    }
  };

  return (
    <div className="payment-container">
  <h2 className="payment-title">Checkout</h2>

  <div className="product-info">
    <h3 className="product-name">{productName}</h3>
    <p className="product-price">Price: ₹{price}</p>
  </div>

  <div className="payment-methods">
    <label className="payment-method-label">Choose Payment Method:</label>
    <label>
      <input type="radio" name="payment" value="cod" onChange={(e) => setPaymentMethod(e.target.value)} />
      Cash on Delivery
    </label>
    <label>
      <input type="radio" name="payment" value="upi" onChange={(e) => setPaymentMethod(e.target.value)} />
      UPI Payment
    </label>
    <label>
      <input type="radio" name="payment" value="card" onChange={(e) => setPaymentMethod(e.target.value)} />
      Credit/Debit Card
    </label>
  </div>

  <button className="confirm-button" onClick={handlePayment}>
    Confirm Order
  </button>

  {orderPlaced && (
    <div className="order-confirmation">
      <div className="tick">✅</div>
      <p>Order Confirmed!</p>
      <p>Estimated Delivery: <strong>{deliveryDate}</strong></p>
    </div>
  )}
</div>

  );
};

export default PaymentOptions;

