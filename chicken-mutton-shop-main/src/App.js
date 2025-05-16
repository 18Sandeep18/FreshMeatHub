import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
// Removed GoogleOAuthProvider import
import Navbar from './components/Navbar';
import Landing from './components/Landing';
import Login from './components/Login';
import Bestsellers from './components/Bestsellers';
import Chicken from './components/Chicken';
import Mutton from './components/Mutton';
import ProductDetail from './components/ProductDetail';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import OwnerDashboard from './components/OwnerDashboard';
import OrderConfirmation from './components/OrderConfirmation';
import MyOrders from './components/MyOrders';
import ReferAFriend from './components/ReferAFriend';
import Rewards from './components/Rewards';

import './App.css';

const MainContent = ({
  isLoggedIn,
  setIsLoggedIn,
  showLogin,
  setShowLogin,
  cartItems,
  setCartItems,
  addToCart,
  handleLoginSuccess,
  handleLogout,
  onClose,
  allProducts,
  searchQuery,
  setSearchQuery,
  filteredProducts,
  setFilteredProducts,
  removeFromCart,
  updateCartItemQuantity,
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Handle hash-based navigation
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase().trim();
      console.log('Hash change detected, hash:', hash, 'isLoggedIn:', isLoggedIn);
      if (hash === '#chicken') {
        document.getElementById('chicken-section')?.scrollIntoView({ behavior: 'smooth' });
      } else if (hash === '#mutton') {
        document.getElementById('mutton-section')?.scrollIntoView({ behavior: 'smooth' });
      } else if (hash === '#refer') {
        navigate('/refer-a-friend');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Initial check
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    // Check for referral link query parameter
    const queryParams = new URLSearchParams(location.search);
    const refCode = queryParams.get('ref');
    if (refCode && !isLoggedIn) {
      console.log('Referral code detected:', refCode, 'Showing login popup');
      setShowLogin(true);
    }
  }, [location, isLoggedIn, setShowLogin]);

  const bestsellers = allProducts.filter((product) => product.category === 'Bestsellers');
  const chickenProducts = allProducts.filter((product) => product.category === 'Chicken');
  const muttonProducts = allProducts.filter((product) => product.category === 'Mutton');

  const handleClearSearch = () => {
    setSearchQuery('');
    setFilteredProducts([]);
  };

  return (
    <div className="App">
      <Navbar
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
        setShowLogin={setShowLogin}
        cartItems={cartItems}
        onSearch={setSearchQuery}
      />
      {showLogin && !isLoggedIn && (
        <Login onClose={onClose} onLoginSuccess={() => handleLoginSuccess(navigate)} />
      )}
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Landing />
              {searchQuery ? (
                <div className="search-results">
                  <div className="search-results-header">
                    <h2>Search Results for "{searchQuery}"</h2>
                    <button onClick={handleClearSearch} className="clear-search-btn">
                      Clear Search
                    </button>
                  </div>
                  {filteredProducts.length > 0 ? (
                    <ProductList products={filteredProducts} addToCart={addToCart} />
                  ) : (
                    <p>No products found for "{searchQuery}".</p>
                  )}
                </div>
              ) : (
                <>
                  <Bestsellers products={bestsellers} addToCart={addToCart} />
                  <div id="chicken-section">
                    <Chicken products={chickenProducts} addToCart={addToCart} />
                  </div>
                  <div id="mutton-section">
                    <Mutton products={muttonProducts} addToCart={addToCart} />
                  </div>
                </>
              )}
              {!isLoggedIn && (
                <button
                  onClick={() => {
                    console.log('Open Login clicked, setting showLogin to true');
                    if (typeof setShowLogin === 'function') {
                      setShowLogin(true);
                      window.location.hash = 'login';
                    } else {
                      console.error('setShowLogin is not a function on click:', typeof setShowLogin);
                    }
                  }}
                  style={{ padding: '10px 20px', backgroundColor: 'red', color: 'white', border: 'none' }}
                >
                  Open Login
                </button>
              )}
            </>
          }
        />
        <Route
          path="/product/:id"
          element={<ProductDetail addToCart={addToCart} allProducts={allProducts} />}
        />
        <Route
          path="/cart"
          element={
            <Cart
              cartItems={cartItems}
              removeFromCart={removeFromCart}
              updateCartItemQuantity={updateCartItemQuantity}
              isLoggedIn={isLoggedIn}
              setShowLogin={setShowLogin}
            />
          }
        />
        <Route
          path="/checkout"
          element={<Checkout cartItems={cartItems} setCartItems={setCartItems} />}
        />
        <Route path="/owner-dashboard" element={<OwnerDashboard />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
        <Route
          path="/my-orders"
          element={<MyOrders isLoggedIn={isLoggedIn} setShowLogin={setShowLogin} />}
        />
        <Route
          path="/refer-a-friend"
          element={<ReferAFriend isLoggedIn={isLoggedIn} setShowLogin={setShowLogin} />}
        />
        <Route
          path="/rewards"
          element={<Rewards isLoggedIn={isLoggedIn} setShowLogin={setShowLogin} />}
        />
      </Routes>
    </div>
  );
};

// Main App Component
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const savedLoginState = localStorage.getItem('isLoggedIn');
    return savedLoginState ? JSON.parse(savedLoginState) : false;
  });
  const [showLogin, setShowLogin] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

  useEffect(() => {
    fetch('/products.json')
      .then((response) => response.json())
      .then((data) => {
        setAllProducts(data);
      })
      .catch((error) => console.error('Error loading products:', error));

    const savedCart = localStorage.getItem('cartItems');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    if (searchQuery) {
      const filtered = allProducts.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]);
    }
  }, [searchQuery, allProducts]);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  const updateCartItemQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === productId ? { ...item, quantity } : item
        )
      );
    }
  };

  // Updated: no credentialResponse, just navigate
  const handleLoginSuccess = (navigate) => {
    setIsLoggedIn(true);
    setShowLogin(false);
    // After login, redirect to rewards page if accessed via referral link
    const queryParams = new URLSearchParams(window.location.search);
    const refCode = queryParams.get('ref');
    if (refCode) {
      navigate('/rewards');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
    console.log('Logged out');
  };

  const onClose = () => {
    setShowLogin(false);
    window.location.hash = '';
  };

  return (
    // Removed GoogleOAuthProvider
    <Router>
      <MainContent
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        showLogin={showLogin}
        setShowLogin={setShowLogin}
        cartItems={cartItems}
        setCartItems={setCartItems}
        addToCart={addToCart}
        handleLoginSuccess={handleLoginSuccess}
        handleLogout={handleLogout}
        onClose={onClose}
        allProducts={allProducts}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filteredProducts={filteredProducts}
        setFilteredProducts={setFilteredProducts}
        removeFromCart={removeFromCart}
        updateCartItemQuantity={updateCartItemQuantity}
      />
    </Router>
  );
}

export default App;