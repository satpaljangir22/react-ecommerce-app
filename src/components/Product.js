import React from "react";

function Product({ product, addToCart, removeFromCart, count }) {
  return (
    <div className="product">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p>${product.price}</p>
      <div className="product-buttons">
        <button
          className="product-button"
          onClick={() => removeFromCart(product)}
        >
          -
        </button>
        <span className="product-count">{count}</span>
        <button className="product-button" onClick={() => addToCart(product)}>
          +
        </button>
      </div>
    </div>
  );
}

export default Product;
