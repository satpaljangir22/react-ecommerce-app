import React from "react";
import { useLocation } from "react-router-dom";
import "./OrderSuccess.css";

function OrderSuccess() {
  const location = useLocation();
  const { cart, orderNumber } = location.state || { cart: [], orderNumber: "" };

  return (
    <div className="order-success-container">
      <h2>Order Success</h2>
      <p>Your order has been placed successfully!</p>
      <p>Order Number: {orderNumber}</p>
      <div className="order-details">
        {cart.map((product, index) => (
          <div key={index} className="order-item">
            <img src={product.image} alt={product.name} />
            <div className="order-item-details">
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>${product.price.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrderSuccess;
