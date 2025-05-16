// src/components/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import { allProducts } from './ProductDetail';

const Home = ({ addToCart }) => {
  // Group products by category
  const chickenProducts = allProducts.filter((p) => p.id.startsWith('chicken'));
  const muttonProducts = allProducts.filter((p) => p.id.startsWith('mutton'));

  const handleAddToCart = (product) => {
    try {
      addToCart(product);
      alert(`${product.name} added to cart!`);
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add to cart. Please try again.');
    }
  };

  return (
    <div className="home">
      {/* Chicken Section */}
      <section className="category-section">
        <h2>Chicken</h2>
        <div className="product-grid">
          {chickenProducts.map((product) => (
            <div key={product.id} id={product.id} className="product-card">
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
                  onClick={() => handleAddToCart(product)}
                  aria-label={`Add ${product.name} to cart`}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Mutton Section */}
      <section className="category-section">
        <h2>Mutton</h2>
        <div className="product-grid">
          {muttonProducts.map((product) => (
            <div key={product.id} id={product.id} className="product-card">
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
                  onClick={() => handleAddToCart(product)}
                  aria-label={`Add ${product.name} to cart`}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;