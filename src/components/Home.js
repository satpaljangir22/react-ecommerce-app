import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Product from "./Product";
import "./Home.css";

const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 99.99,
    image: "https://picsum.photos/200/150?random=1",
    description: "High-quality wireless headphones with noise cancellation.",
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 199.99,
    image: "https://picsum.photos/200/150?random=2",
    description: "Stylish smart watch with fitness tracking features.",
  },
  {
    id: 3,
    name: "Bluetooth Speaker",
    price: 49.99,
    image: "https://picsum.photos/200/150?random=3",
    description: "Portable Bluetooth speaker with excellent sound quality.",
  },
  {
    id: 4,
    name: "Laptop Stand",
    price: 29.99,
    image: "https://picsum.photos/200/150?random=4",
    description: "Ergonomic laptop stand for better posture and comfort.",
  },
  {
    id: 5,
    name: "Wireless Mouse",
    price: 25.99,
    image: "https://picsum.photos/200/150?random=5",
    description: "Smooth and responsive wireless mouse with ergonomic design.",
  },
  {
    id: 6,
    name: "Mechanical Keyboard",
    price: 89.99,
    image: "https://picsum.photos/200/150?random=6",
    description: "Durable mechanical keyboard with customizable RGB lighting.",
  },
  {
    id: 7,
    name: "USB-C Hub",
    price: 39.99,
    image: "https://picsum.photos/200/150?random=7",
    description: "Versatile USB-C hub with multiple ports for connectivity.",
  },
  {
    id: 8,
    name: "External Hard Drive",
    price: 79.99,
    image: "https://picsum.photos/200/150?random=8",
    description: "High-capacity external hard drive for secure data storage.",
  },
  {
    id: 9,
    name: "4K Monitor",
    price: 299.99,
    image: "https://picsum.photos/200/150?random=9",
    description: "Ultra HD 4K monitor with stunning picture quality.",
  },
  {
    id: 10,
    name: "Gaming Chair",
    price: 199.99,
    image: "https://picsum.photos/200/150?random=10",
    description: "Comfortable gaming chair with adjustable features.",
  },
];

function Home() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (product) => {
    setCart(cart.filter((item, index) => index !== cart.lastIndexOf(product)));
  };

  const handleCheckout = () => {
    navigate("/checkout", { state: { cart } });
  };

  const getProductCount = (productId) => {
    return cart.filter((product) => product.id === productId).length;
  };

  return (
    <div className="home-container">
      <div className="cart-container">
        <div className="cart">
          <img
            src="https://img.icons8.com/ios-filled/50/000000/shopping-cart.png"
            alt="Cart"
          />
          <span>{cart.length}</span>
        </div>
        <button
          className="checkout-button"
          disabled={cart.length === 0}
          onClick={handleCheckout}
        >
          Checkout
        </button>
      </div>
      <div className="products">
        {products.map((product) => (
          <Product
            key={product.id}
            product={product}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
            count={getProductCount(product.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
