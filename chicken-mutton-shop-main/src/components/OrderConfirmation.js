import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './OrderConfirmation.css';

const OrderConfirmation = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const orderId = state?.orderId || 'N/A';

  const handleContinueShopping = () => {
    navigate('/');
  };

  return (
    <div className="order-confirmation-page">
      <div className="confirmation-container">
        <div className="confirmation-icon">
          <svg
            className="checkmark"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 52 52"
          >
            <circle className="checkmark-circle" cx="26" cy="26" r="25" fill="none" />
            <path className="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
          </svg>
        </div>
        <h2>Order Placed Successfully!</h2>
        <p>Thank you for your order. Your order has been successfully placed.</p>
        <p><strong>Order ID:</strong> {orderId}</p>
        <p>We have sent a confirmation email to the owner. You will receive an update once the order is processed.</p>
        <button className="continue-shopping-btn" onClick={handleContinueShopping}>
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmation;