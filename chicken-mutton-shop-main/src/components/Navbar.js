// src/components/Navbar.js
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';
import logo from '../assets/logo.png';
import { FaLayerGroup, FaUser, FaShoppingCart, FaHome, FaTimes } from 'react-icons/fa';
import chickenImg from '../assets/chicken.png'; // Default image
import muttonImg from '../assets/mutton.png'; // Default image
import debounce from 'lodash/debounce';
import { allProducts } from './ProductDetail';

// Placeholder arrays for multiple images (replace with actual imports)
const chickenImages = [
  chickenImg, // Replace with chickenImg1
  chickenImg, // Replace with chickenImg2
  chickenImg, // Replace with chickenImg3
];
const muttonImages = [
  muttonImg, // Replace with muttonImg1
  muttonImg, // Replace with muttonImg2
  muttonImg, // Replace with muttonImg3
];

function Navbar({ isLoggedIn, onLogout, setShowLogin, cartItems, onSearch }) {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [chickenImageIndex, setChickenImageIndex] = useState(0);
  const [muttonImageIndex, setMuttonImageIndex] = useState(0);
  const [isChickenHovered, setIsChickenHovered] = useState(false);
  const [isMuttonHovered, setIsMuttonHovered] = useState(false);
  const categoriesRef = useRef(null);
  const profileRef = useRef(null);
  const cartRef = useRef(null);
  const navigate = useNavigate();

  // Handle automatic image swiping for Chicken
  useEffect(() => {
    let interval;
    if (isChickenHovered) {
      interval = setInterval(() => {
        setChickenImageIndex((prevIndex) => (prevIndex + 1) % chickenImages.length);
      }, 2000); // Change image every 2 seconds
    }
    return () => clearInterval(interval);
  }, [isChickenHovered]);

  // Handle automatic image swiping for Mutton
  useEffect(() => {
    let interval;
    if (isMuttonHovered) {
      interval = setInterval(() => {
        setMuttonImageIndex((prevIndex) => (prevIndex + 1) % muttonImages.length);
      }, 2000); // Change image every 2 seconds
    }
    return () => clearInterval(interval);
  }, [isMuttonHovered]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (categoriesRef.current && !categoriesRef.current.contains(event.target)) {
        setIsCategoriesOpen(false);
        setActiveCategoryIndex(null);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setIsCartOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const categories = [
    {
      name: 'Chicken',
      images: chickenImages,
      subcategories: allProducts
        .filter((product) => product.id.startsWith('chicken'))
        .map((product) => ({
          name: product.name,
          id: product.id,
        })),
    },
    {
      name: 'Mutton',
      images: muttonImages,
      subcategories: allProducts
        .filter((product) => product.id.startsWith('mutton'))
        .map((product) => ({
          name: product.name,
          id: product.id,
        })),
    },
  ];

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const debouncedSearch = debounce((query) => {
    onSearch(query);
  }, 300);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    debouncedSearch(query);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    onSearch('');
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const handleSubcategoryClick = (subcategoryId) => {
    const element = document.getElementById(subcategoryId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      navigate('/');
      setTimeout(() => {
        const retryElement = document.getElementById(subcategoryId);
        if (retryElement) {
          retryElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
    setIsCategoriesOpen(false);
    setActiveCategoryIndex(null);
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <img src={logo} alt="Chicken & Mutton Shop" width="100" />
      </div>
      <div className="product-search">
        <form onSubmit={handleSearchSubmit}>
          <div className="search-input-wrapper">
            <input
              type="text"
              placeholder="Search for any delicious product"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            {searchQuery && (
              <FaTimes className="clear-search-icon" onClick={handleClearSearch} />
            )}
          </div>
          <button type="submit">Search</button>
        </form>
      </div>
      <div className="nav-links">
        <a
          href="/"
          className="home-link"
          onClick={(e) => {
            e.preventDefault();
            navigate('/');
          }}
        >
          <FaHome className="nav-icon" /> Home
        </a>
        <a
          href="#categories"
          className="categories-link"
          onClick={(e) => {
            e.preventDefault();
            setIsCategoriesOpen(!isCategoriesOpen);
          }}
        >
          <FaLayerGroup className="nav-icon" /> Categories
        </a>
        {isCategoriesOpen && (
          <div className="categories-dropdown" ref={categoriesRef}>
            <div className="categories-content">
              {categories.map((category, index) => (
                <div key={index} className="category-item">
                  <div
                    className="category-header"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveCategoryIndex(activeCategoryIndex === index ? null : index);
                    }}
                  >
                    <img
                      src={
                        category.name === 'Chicken'
                          ? chickenImages[chickenImageIndex]
                          : muttonImages[muttonImageIndex]
                      }
                      alt={category.name}
                      className="category-image"
                      onMouseEnter={() =>
                        category.name === 'Chicken'
                          ? setIsChickenHovered(true)
                          : setIsMuttonHovered(true)
                      }
                      onMouseLeave={() =>
                        category.name === 'Chicken'
                          ? setIsChickenHovered(false)
                          : setIsMuttonHovered(false)
                      }
                    />
                    <span>{category.name}</span>
                  </div>
                  {activeCategoryIndex === index && (
                    <div className={`subcategories ${activeCategoryIndex === index ? 'subcategories-open' : ''}`}>
                      {category.subcategories.map((subcategory, subIndex) => (
                        <a
                          key={subIndex}
                          href={`#${subcategory.id}`}
                          onClick={(e) => {
                            e.preventDefault();
                            handleSubcategoryClick(subcategory.id);
                          }}
                        >
                          {subcategory.name}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
        {!isLoggedIn ? (
          <a
            href="#login"
            onClick={(e) => {
              e.preventDefault();
              setShowLogin(true);
            }}
          >
            <FaUser className="nav-icon" /> Login
          </a>
        ) : (
          <>
            <a
              href="#profile"
              className="profile-link"
              onClick={(e) => {
                e.preventDefault();
                setIsProfileOpen(!isProfileOpen);
              }}
            >
              <FaUser className="nav-icon" /> Profile
            </a>
            {isProfileOpen && (
              <div className="dropdown-menu" ref={profileRef}>
                <a href="#account">Account</a>
                <a
                  href="/rewards"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/rewards');
                    setIsProfileOpen(false);
                  }}
                >
                  My Rewards
                </a>
                <a
                  href="/my-orders"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/my-orders');
                    setIsProfileOpen(false);
                  }}
                >
                  My Orders
                </a>
                <a
                  href="/refer-a-friend"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/refer-a-friend');
                    setIsProfileOpen(false);
                  }}
                >
                  Refer a Friend
                </a>
                <a
                  href="#logout"
                  onClick={(e) => {
                    e.preventDefault();
                    onLogout();
                  }}
                >
                  Logout
                </a>
              </div>
            )}
          </>
        )}
        <a
          href="/cart"
          className="cart"
          onClick={(e) => {
            e.preventDefault();
            setIsCartOpen(!isCartOpen);
          }}
        >
          <FaShoppingCart className="cart-icon" />
          <span className="cart-label">Cart</span>
          {itemCount > 0 && <span className="cart-count">{itemCount}</span>}
          {itemCount > 0 && <span className="cart-price">₹{totalPrice}</span>}
          {isCartOpen && (
            <div className="cart-dropdown" ref={cartRef}>
              <div className="cart-header">
                <span className="cleaver-icon">🗡️</span>
                <h3>Your Butcher's Cart</h3>
              </div>
              {itemCount === 0 ? (
                <p className="cart-empty">Your cart is empty. Start adding some delicious items!</p>
              ) : (
                <>
                  <p className="cart-summary">
                    You have {itemCount} {itemCount === 1 ? 'item' : 'items'} in your cart. Total: ₹
                    {totalPrice}
                  </p>
                  <div className="cart-items-preview">
                    {cartItems.slice(0, 3).map((item) => (
                      <div key={item.id} className="cart-item-preview">
                        <img src={item.image} alt={item.name} className="cart-item-preview-image" />
                        <div className="cart-item-preview-details">
                          <span>{item.name}</span>
                          <span>₹{item.price} x {item.quantity}</span>
                        </div>
                      </div>
                    ))}
                    {cartItems.length > 3 && (
                      <p className="more-items">...and {cartItems.length - 3} more item(s)</p>
                    )}
                  </div>
                  <button
                    className="view-cart-btn"
                    onClick={() => {
                      setIsCartOpen(false);
                      navigate('/cart');
                    }}
                  >
                    View Full Cart
                  </button>
                </>
              )}
            </div>
          )}
        </a>
      </div>
    </nav>
  );
}

export default Navbar;