// src/components/Chicken.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Chicken.css';
import chickenCurryImg from '../assets/ChickenCurryCuts1.jpg';
import bonelessMinceImg from '../assets/boneless-mince.jpg';
import specialityCutsImg from '../assets/chickenlarge-cuts.jpg';
import offalsImg from '../assets/offals.jpg';
import chickenBreastImg from '../assets/chicken-breast.jpg';
import premiumCutsImg from '../assets/chicken-keema-mince.jpg';

const Chicken = ({ addToCart }) => {
  const navigate = useNavigate();

  const subcategories = [
    { id: 'chicken-1', name: 'Chicken Curry Cuts', price: 150, originalPrice: 195, discount: '23% off', image: chickenCurryImg, weight: '500 g', pieces: '12-18 pieces', serves: 4 },
    { id: 'chicken-2', name: 'Chicken Boneless', price: 320, originalPrice: 400, discount: '20% off', image: bonelessMinceImg, weight: '500 g', pieces: 'N/A', serves: 4 },
    { id: 'chicken-3', name: 'Chicken Large Cuts', price: 250, originalPrice: 300, discount: '17% off', image: specialityCutsImg, weight: '500 g', pieces: '4-6 pieces', serves: 4 },
    { id: 'chicken-4', name: 'Chicken Offals', price: 180, originalPrice: 220, discount: '18% off', image: offalsImg, weight: '500 g', pieces: 'N/A', serves: 4 },
    { id: 'chicken-5', name: 'Chicken Breast', price: 220, originalPrice: 345, discount: '36% off', image: chickenBreastImg, weight: '500 g', pieces: '2-4 pieces', serves: 4 },
    { id: 'chicken-6', name: 'Chicken Keema', price: 280, originalPrice: 350, discount: '20% off', image: premiumCutsImg, weight: '500 g', pieces: 'N/A', serves: 4 },
    { id: 'chicken-7', name: 'Chicken Wings', price: 200, originalPrice: 250, discount: '20% off', image: chickenCurryImg, weight: '500 g', pieces: '8-10 pieces', serves: 4 },
    { id: 'chicken-8', name: 'Chicken Drumsticks', price: 230, originalPrice: 280, discount: '18% off', image: specialityCutsImg, weight: '500 g', pieces: '4-6 pieces', serves: 4 },
    { id: 'chicken-9', name: 'Chicken Liver', price: 160, originalPrice: 200, discount: '20% off', image: offalsImg, weight: '500 g', pieces: 'N/A', serves: 4 },
    { id: 'chicken-10', name: 'Chicken Neck Pieces', price: 240, originalPrice: 290, discount: '17% off', image: chickenBreastImg, weight: '500 g', pieces: '4-5 pieces', serves: 4 },
    { id: 'chicken-11', name: 'Chicken Gizzard', price: 260, originalPrice: 320, discount: '19% off', image: bonelessMinceImg, weight: '500 g', pieces: '6-8 pieces', serves: 4 },
  ];

  return (
    <section className="chicken-section">
      <h2>Chicken Category</h2>
      <p className="chicken-subtitle">Explore our delicious chicken options!</p>
      <div className="chicken-grid">
        {subcategories.map((item) => (
          <div key={item.id} className="chicken-card">
            <img
              src={item.image}
              alt={item.name}
              className="chicken-image"
              onClick={() => navigate(`/product/${item.id}`)}
              style={{ cursor: 'pointer' }}
            />
            <div className="chicken-details">
              <h3 className="chicken-name">{item.name}</h3>
              <p className="chicken-price">
                ₹{item.price} <s>₹{item.originalPrice}</s> ({item.discount})
              </p>
              <p className="chicken-meta">
                {item.weight} | {item.pieces} | Serves {item.serves}
              </p>
              <button
                className="chicken-add-plus"
                onClick={() => addToCart(item)}
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Chicken;