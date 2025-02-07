import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import "./Payments.css";

const stripePromise = loadStripe(
  "pk_test_51Qprp7ISID8BNbLefY3PqH5PGH6J8DmYKRie60MCxdAPP01Jhso9FCRDxm8nXCRRqMTvrIKuBxua1XzAhTCfx78i00VansgD4w"
); // Replace with your Stripe publishable key

function Payments() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cart } = location.state || { cart: [] };
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const stripe = useStripe();
  const elements = useElements();

  const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);

  useEffect(() => {
    if (cart.length === 0) {
      navigate("/cart");
    }
  }, [cart, navigate]);

  const handlePayment = async () => {
    try {
      setLoading(true);
      setError(null);

      // Create PaymentIntent on the server
      const response = await fetch(
        "http://localhost:5001/api/create-payment-intent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ amount: totalAmount }),
        }
      );

      if (!response.ok) {
        throw new Error("Payment failed");
      }

      const { clientSecret } = await response.json();

      // Confirm the payment
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardNumberElement),
          },
        }
      );

      if (error) {
        throw new Error(error.message);
      }

      if (paymentIntent.status === "succeeded") {
        const orderNumber = `ORD-${Date.now()}`;
        navigate("/order-success", {
          state: {
            cart,
            orderNumber,
            userId: localStorage.getItem("userId"), // Make sure you're storing userId in localStorage after login
          },
        });
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="payments-container">
      <h2>Make Payment</h2>
      <div className="payment-details">
        <h3>Order Summary</h3>
        <p>Total Amount: ${totalAmount.toFixed(2)}</p>
      </div>
      <div className="payment-form">
        {error && <div className="error-message">{error}</div>}
        <div className="stripe-element">
          <label>Card Number</label>
          <CardNumberElement />
        </div>
        <div className="stripe-element">
          <label>Expiry Date</label>
          <CardExpiryElement />
        </div>
        <div className="stripe-element">
          <label>CVC</label>
          <CardCvcElement />
        </div>
        <button
          className="proceed-button"
          onClick={handlePayment}
          disabled={loading || !stripe || !elements}
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>
      </div>
    </div>
  );
}

function PaymentsWrapper() {
  return (
    <Elements stripe={stripePromise}>
      <Payments />
    </Elements>
  );
}

export default PaymentsWrapper;
