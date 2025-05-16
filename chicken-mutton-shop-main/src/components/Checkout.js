import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Checkout.css';

const Checkout = ({ cartItems, setCartItems }) => {
  const navigate = useNavigate();
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [altMobileNumber, setAltMobileNumber] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState(''); // Add state for server errors

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const validateMobileNumber = (number) => {
    const mobileRegex = /^[0-9]{10}$/;
    return mobileRegex.test(number);
  };

  const handlePlaceOrder = async () => {
    const newErrors = {};
    if (!deliveryAddress.trim()) {
      newErrors.deliveryAddress = 'Delivery address is required';
    }
    if (!mobileNumber.trim()) {
      newErrors.mobileNumber = 'Mobile number is required';
    } else if (!validateMobileNumber(mobileNumber)) {
      newErrors.mobileNumber = 'Please enter a valid 10-digit mobile number';
    }
    if (altMobileNumber.trim() && !validateMobileNumber(altMobileNumber)) {
      newErrors.altMobileNumber = 'Please enter a valid 10-digit alternative mobile number';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    setServerError(''); // Clear any previous server errors

    // Clean the cartItems to include only required fields
    const cleanedCartItems = cartItems.map(item => ({
      id: item.id,
      name: item.name,
      price: Number(item.price),
      quantity: Number(item.quantity),
      image: item.image,
      category: item.category,
    }));

    const orderData = {
      cartItems: cleanedCartItems,
      deliveryAddress: deliveryAddress.trim(),
      mobileNumber: mobileNumber.trim(),
      altMobileNumber: altMobileNumber.trim() || '',
      paymentMethod: 'cod',
      totalPrice: Number(totalPrice),
    };
    console.log('Order data being sent to backend:', JSON.stringify(orderData, null, 2));

    try {
      const response = await fetch('http://localhost:5001/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });

      const responseData = await response.json();
      console.log('Response from backend:', responseData);

      if (!response.ok) {
        throw new Error(responseData.error || `HTTP error! Status: ${response.status}`);
      }

      if (responseData.success) {
        // Clear the cart
        setCartItems([]);
        localStorage.removeItem('cartItems');
        // Redirect to order confirmation page with order details
        navigate('/order-confirmation', {
          state: {
            orderId: responseData.orderId,
            orderDetails: {
              cartItems: cleanedCartItems,
              deliveryAddress: deliveryAddress.trim(),
              mobileNumber: mobileNumber.trim(),
              altMobileNumber: altMobileNumber.trim() || '',
              totalPrice: Number(totalPrice),
            },
          },
        });
      } else {
        setServerError(responseData.error || 'Failed to place order. Please try again.');
      }
    } catch (error) {
      console.error('Error placing order:', error.message);
      setServerError(error.message || 'Failed to place order. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="checkout-page">
        <h2 className="checkout-title">Checkout</h2>
        <p className="empty-cart-message">
          Your cart is empty. <a href="/">Continue shopping</a>.
        </p>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <h2 className="checkout-title">Checkout</h2>
      {serverError && <p className="server-error-message">{serverError}</p>}
      <div className="checkout-container">
        <div className="order-summary">
          <h3 className="section-title">Order Summary ({itemCount} {itemCount === 1 ? 'item' : 'items'})</h3>
          <div className="order-items">
            {cartItems.map((item) => (
              <div key={item.id} className="checkout-item">
                <img src={item.image} alt={item.name} className="checkout-item-image" />
                <div className="checkout-item-details">
                  <h4>{item.name}</h4>
                  <p>₹{item.price} x {item.quantity}</p>
                </div>
                <div className="checkout-item-total">
                  ₹{item.price * item.quantity}
                </div>
              </div>
            ))}
          </div>
          <div className="order-total">
            <p className="payment-method-info">Payment Method: Cash on Delivery</p>
            <h3>Total: ₹{totalPrice}</h3>
          </div>
        </div>
        <div className="delivery-details">
          <h3 className="section-title">Delivery Details</h3>
          <div className="form-group">
            <label htmlFor="deliveryAddress">Delivery Address</label>
            <textarea
              id="deliveryAddress"
              placeholder="Enter your delivery address"
              value={deliveryAddress}
              onChange={(e) => {
                setDeliveryAddress(e.target.value);
                setErrors((prev) => ({ ...prev, deliveryAddress: '' }));
              }}
              required
            />
            {errors.deliveryAddress && <p className="error-message">{errors.deliveryAddress}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="mobileNumber">Mobile Number</label>
            <input
              id="mobileNumber"
              type="text"
              placeholder="Enter your mobile number (e.g., 9515824686)"
              value={mobileNumber}
              onChange={(e) => {
                setMobileNumber(e.target.value);
                setErrors((prev) => ({ ...prev, mobileNumber: '' }));
              }}
              maxLength={10}
            />
            {errors.mobileNumber && <p className="error-message">{errors.mobileNumber}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="altMobileNumber">Alternative Mobile Number (Optional)</label>
            <input
              id="altMobileNumber"
              type="text"
              placeholder="Enter alternative mobile number"
              value={altMobileNumber}
              onChange={(e) => {
                setAltMobileNumber(e.target.value);
                setErrors((prev) => ({ ...prev, altMobileNumber: '' }));
              }}
              maxLength={10}
            />
            {errors.altMobileNumber && <p className="error-message">{errors.altMobileNumber}</p>}
          </div>
          <div className="form-group">
            <p className="payment-method-info">Payment Method: Cash on Delivery</p>
          </div>
          <button
            className="place-order-btn"
            onClick={handlePlaceOrder}
            disabled={!deliveryAddress || !mobileNumber || isLoading}
          >
            {isLoading ? 'Processing...' : 'Place Order'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;