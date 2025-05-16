// src/components/Mutton.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Mutton.css';
import muttonCurryImg from '../assets/mutton-curry.jpg';
import bonelessMinceImg from '../assets/boneless-mince.jpg';
import largeCutsImg from '../assets/mutton-large-cuts.jpg';
import offalsImg from '../assets/offals.jpg';
import keemaImg from '../assets/mutton-keema.jpg';
import goatLegsImg from '../assets/goat-legs.jpg';

const Mutton = ({ addToCart }) => {
  const navigate = useNavigate();

  const subcategories = [
    { id: 'mutton-1', name: 'Mutton Curry Cuts', price: 450, originalPrice: 550, discount: '18% off', image: muttonCurryImg, weight: '500 g', pieces: '10-12 pieces', serves: 4 },
    { id: 'mutton-2', name: 'Mutton Boneless', price: 500, originalPrice: 620, discount: '19% off', image: bonelessMinceImg, weight: '500 g', pieces: 'N/A', serves: 4 },
    { id: 'mutton-3', name: 'Mutton Large Cuts', price: 480, originalPrice: 580, discount: '17% off', image: largeCutsImg, weight: '500 g', pieces: '4-6 pieces', serves: 4 },
    { id: 'mutton-4', name: 'Mutton Offals', price: 300, originalPrice: 360, discount: '17% off', image: offalsImg, weight: '500 g', pieces: 'N/A', serves: 4 },
    { id: 'mutton-5', name: 'Mutton Keema', price: 520, originalPrice: 650, discount: '20% off', image: keemaImg, weight: '500 g', pieces: 'N/A', serves: 4 },
    { id: 'mutton-6', name: 'Mutton Legs', price: 600, originalPrice: 720, discount: '17% off', image: goatLegsImg, weight: '500 g', pieces: '2 pieces', serves: 4 },
    { id: 'mutton-7', name: 'Mutton Spleen', price: 280, originalPrice: 340, discount: '18% off', image: offalsImg, weight: '500 g', pieces: 'N/A', serves: 4 },
    { id: 'mutton-8', name: 'Mutton Shoulder Cuts', price: 470, originalPrice: 570, discount: '18% off', image: largeCutsImg, weight: '500 g', pieces: '8-10 pieces', serves: 4 },
    { id: 'mutton-9', name: 'Mutton Liver', price: 320, originalPrice: 400, discount: '20% off', image: offalsImg, weight: '500 g', pieces: 'N/A', serves: 4 },
    { id: 'mutton-10', name: 'Mutton Bones', price: 200, originalPrice: 250, discount: '20% off', image: bonelessMinceImg, weight: '500 g', pieces: 'N/A', serves: 4 },
    { id: 'mutton-11', name: 'Mutton Lungs', price: 260, originalPrice: 320, discount: '19% off', image: offalsImg, weight: '500 g', pieces: 'N/A', serves: 4 },
    { id: 'mutton-12', name: 'Mutton Intestine', price: 290, originalPrice: 350, discount: '17% off', image: muttonCurryImg, weight: '500 g', pieces: 'N/A', serves: 4 },
    { id: 'mutton-13', name: 'Mutton Brain', price: 280, originalPrice: 340, discount: '18% off', image: offalsImg, weight: '500 g', pieces: 'N/A', serves: 4 },
    { id: 'mutton-14', name: 'Mutton Head', price: 350, originalPrice: 420, discount: '17% off', image: goatLegsImg, weight: '500 g', pieces: '1 piece', serves: 4 },
    { id: 'mutton-15', name: 'Mutton Tongue', price: 310, originalPrice: 380, discount: '18% off', image: offalsImg, weight: '500 g', pieces: 'N/A', serves: 4 },
  ];

  return (
    <section className="mutton-section">
      <h2>Mutton Category</h2>
      <p className="mutton-subtitle">Explore our delicious mutton options!</p>
      <div className="mutton-grid">
        {subcategories.map((item) => (
          <div key={item.id} className="mutton-card">
            <img
              src={item.image}
              alt={item.name}
              className="mutton-image"
              onClick={() => navigate(`/product/${item.id}`)}
              style={{ cursor: 'pointer' }}
            />
            <div className="mutton-details">
              <h3 className="mutton-name">{item.name}</h3>
              <p className="mutton-price">
                ₹{item.price} <s>₹{item.originalPrice}</s> ({item.discount})
              </p>
              <p className="mutton-meta">
                {item.weight} | {item.pieces} | Serves {item.serves}
              </p>
              <button
                className="mutton-add-plus"
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

export default Mutton;