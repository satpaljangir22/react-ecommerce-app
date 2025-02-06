import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Payments.css";

function Payments() {
  const [cardNumber, setCardNumber] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { cart } = location.state || { cart: [] };

  const handleCardNumberChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setCardNumber(value);
    }
  };

  const handleProceed = () => {
    if (cardNumber.length === 16) {
      const orderNumber = `ORD-${Math.floor(Math.random() * 1000000)}`;
      navigate("/order-success", { state: { cart, orderNumber } });
    } else {
      alert("Please enter a valid 16-digit card number.");
    }
  };

  return (
    <div className="payments-container">
      <h2>Make Payment</h2>
      <div className="payment-form">
        <label htmlFor="cardNumber">Enter Debit/Credit Card Number:</label>
        <input
          type="text"
          id="cardNumber"
          name="cardNumber"
          value={cardNumber}
          onChange={handleCardNumberChange}
          maxLength="16"
          placeholder="Enter your 16-digit card number"
          required
        />
        <button className="proceed-button" onClick={handleProceed}>
          Proceed
        </button>
      </div>
    </div>
  );
}

export default Payments;
