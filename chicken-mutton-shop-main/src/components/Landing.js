import React from 'react';
import './Landing.css';
// Placeholder image - replace with your chicken image
import chickenImage from '../assets/chicken.jpg';

function Landing() {
  return (
    <div className="landing">
      <div className="welcome-section">
        <div className="welcome-text">
          <h1>Welcome To Abdul's Chicken</h1>
          <p>Avail exciting offers, only for you!</p>
        </div>
        <div className="showcase">
          <div className="showcase-image">
            <img src={chickenImage} alt="Chicken Showcase" />
          </div>
          <div className="promo-text">
            <h2>Chicken Curry Cut & more</h2>
            <p>Starting at <span>₹150</span></p>
            <button>Shop Now</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;