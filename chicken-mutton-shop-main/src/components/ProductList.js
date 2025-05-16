import React from 'react';
import { Link } from 'react-router-dom';
import './ProductList.css';

function ProductList({ products, addToCart }) {
  return (
    <div className="product-list">
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <Link to={`/product/${product.id}`}>
            <img src={product.image} alt={product.name} className="product-image" />
          </Link>
          <div className="product-details">
            <h3>{product.name}</h3>
            <p className="product-price">
              ₹{product.price} <span className="discount">{product.discount}</span>
              <br />
              <s>MRP: ₹{product.originalPrice}</s>
            </p>
            <button
              className="add-to-cart-btn"
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductList;