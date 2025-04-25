import React from "react";
import { useNavigate } from "react-router-dom";
import "./PaymentOptions.css";

const PaymentOptions = () => {
  const navigate = useNavigate();

  return (
    <div className="payment-options-container">
      <h2>Choose a Payment Method</h2>

      <div className="qr-section">
        <div className="qr-item">
          <h3>Google Pay</h3>
          <img src="/qr-gpay.png" alt="GPay QR Code" />
        </div>
        <div className="qr-item">
          <h3>PhonePe</h3>
          <img src="/qr-phonepe.png" alt="PhonePe QR Code" />
        </div>
      </div>

      <p>Or use this payment link:</p>
      <a href="https://yourpaymenturl.com" target="_blank" rel="noopener noreferrer">
        Pay Now
      </a>

      <button onClick={() => navigate("/checkout")}>Go Back</button>
    </div>
  );
};

export default PaymentOptions;
