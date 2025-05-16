import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Bestsellers.css';
import bonelessChickenImg from '../assets/boneless-chicken.jpg';
import chickenBreastImg from '../assets/chicken-breast.jpg';
import sheepBonelessImg from '../assets/sheep-boneless.jpg';
import goatKeemaImg from '../assets/goat-keema.jpg';
import goatLegsImg from '../assets/goat-legs.jpg';

const Bestsellers = ({ addToCart }) => {
  const navigate = useNavigate();

  const bestsellers = [
    {
      id: 'bestsellers-1',
      name: 'Boneless Chicken',
      price: 350,
      originalPrice: 450,
      discount: '22% off',
      image: bonelessChickenImg,
      weight: '500 g',
      pieces: '12-18 pieces',
      serves: 4,
    },
    {
      id: 'bestsellers-2',
      name: 'Chicken Breast',
      price: 320,
      originalPrice: 400,
      discount: '20% off',
      image: chickenBreastImg,
      weight: '500 g',
      pieces: '2-4 pieces',
      serves: 4,
    },
    {
      id: 'bestsellers-3',
      name: 'Sheep Boneless Cut',
      price: 400,
      originalPrice: 500,
      discount: '20% off',
      image: sheepBonelessImg,
      weight: '500 g',
      pieces: '10-12 pieces',
      serves: 4,
    },
    {
      id: 'bestsellers-4',
      name: 'Goat Keema',
      price: 380,
      originalPrice: 480,
      discount: '21% off',
      image: goatKeemaImg,
      weight: '500 g',
      pieces: 'N/A',
      serves: 4,
    },
    {
      id: 'bestsellers-5',
      name: 'Goat Legs Set',
      price: 450,
      originalPrice: 550,
      discount: '18% off',
      image: goatLegsImg,
      weight: '500 g',
      pieces: '2 pieces',
      serves: 4,
    },
  ];

  return (
    <section className="bestsellers-section">
      <h2>Bestsellers</h2>
      <p className="bestsellers-subtitle">Most popular products near you!</p>
      <div className="bestsellers-grid">
        {bestsellers.map((item) => (
          <div key={item.id} className="bestsellers-card">
            <img
              src={item.image}
              alt={item.name}
              className="bestsellers-image"
              onClick={() => navigate(`/product/${item.id}`)}
              style={{ cursor: 'pointer' }}
            />
            <div className="bestsellers-details">
              <h3 className="bestsellers-name">{item.name}</h3>
              <p className="bestsellers-price">
                ₹{item.price} <s>₹{item.originalPrice}</s> ({item.discount})
              </p>
              <p className="bestsellers-meta">
                {item.weight} | {item.pieces} | Serves {item.serves}
              </p>
              <button
                className="bestsellers-add-plus"
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

export default Bestsellers;