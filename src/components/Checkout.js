import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Checkout.css";

function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { cart } = location.state || { cart: [] };

  const productQuantities = cart.reduce((acc, product) => {
    const existingProduct = acc.find((item) => item.id === product.id);
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      acc.push({ ...product, quantity: 1 });
    }
    return acc;
  }, []);

  const totalAmount = productQuantities.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );

  const handlePayment = () => {
    navigate("/payments");
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <div className="checkout-content">
        <div className="cart-items">
          {cart.map((product, index) => (
            <div key={index} className="cart-item">
              <img src={product.image} alt={product.name} />
              <div className="cart-item-details">
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p>${product.price.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="checkout-summary">
          <h3>Order Summary</h3>
          <div className="summary-items">
            {productQuantities.map((product) => (
              <div key={product.id} className="summary-item">
                <span>
                  {product.name} x {product.quantity}
                </span>
                <span>${(product.price * product.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="total-amount">
            <h3>Total Amount: ${totalAmount.toFixed(2)}</h3>
          </div>
          <button className="payment-button" onClick={handlePayment}>
            Make Payment
          </button>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
