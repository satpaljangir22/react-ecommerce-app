import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import "./OrderSuccess.css";

function OrderSuccess() {
  const location = useLocation();
  const { cart, orderNumber, userId } = location.state || {
    cart: [],
    orderNumber: "",
    userId: null,
  };

  useEffect(() => {
    const saveOrder = async () => {
      try {
        const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);

        const response = await fetch("http://localhost:5001/api/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
            products: cart,
            totalAmount,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to save order");
        }
      } catch (error) {
        console.error("Error saving order:", error);
      }
    };

    if (cart.length > 0 && userId) {
      saveOrder();
    }
  }, [cart, userId]);

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
      <div className="continue-shopping">
        <Link to="/home">Continue Shopping</Link>
      </div>
    </div>
  );
}

export default OrderSuccess;
