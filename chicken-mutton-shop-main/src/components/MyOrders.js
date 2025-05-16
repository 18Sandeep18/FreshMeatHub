import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './MyOrders.css';

const MyOrders = ({ isLoggedIn, setShowLogin }) => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch orders when the component mounts
  useEffect(() => {
    if (!isLoggedIn) {
      setShowLogin(true);
      navigate('/');
      return;
    }

    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://freshmeathub.onrender.com/api/orders/all');
        const data = await response.json();
        if (data.success) {
          // Sort orders by createdAt in descending order (newest first)
          const sortedOrders = data.orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setOrders(sortedOrders);
        } else {
          setError(data.error || 'Failed to fetch orders.');
        }
      } catch (err) {
        setError('Failed to fetch orders. Please try again.');
        console.error('Error fetching orders:', err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [isLoggedIn, setShowLogin, navigate]);

  // Calculate estimated delivery time for accepted orders that are not yet delivered
  const calculateDeliveryTime = (order) => {
    if (order.status === 'Delivered') {
      return { message: `Delivered on ${new Date(order.deliveredAt).toLocaleString()}`, isDelivered: true };
    }

    if (order.status !== 'Accepted') {
      return { message: null, isDelivered: false };
    }

    const orderTime = new Date(order.createdAt);
    const deliveryEstimateMinutes = 45; // Estimated delivery time: 45 minutes
    const deliveryTime = new Date(orderTime.getTime() + deliveryEstimateMinutes * 60 * 1000);
    const now = new Date();

    if (now > deliveryTime) {
      return { message: 'Estimated delivery time passed', isDelivered: false };
    }

    // Calculate remaining time
    const timeDiff = deliveryTime - now; // Difference in milliseconds
    const minutesRemaining = Math.ceil(timeDiff / (1000 * 60)); // Convert to minutes
    return { message: `Est. Delivery: ${minutesRemaining} min remaining`, isDelivered: false };
  };

  // Format order date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short',
    });
  };

  if (!isLoggedIn) {
    return null; // Redirect handled in useEffect
  }

  return (
    <div className="my-orders-page">
      <h2 className="my-orders-title">My Orders</h2>
      {loading ? (
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading your orders...</p>
        </div>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : orders.length === 0 ? (
        <div className="no-orders">
          <p>You haven't placed any orders yet.</p>
          <button className="shop-now-btn" onClick={() => navigate('/')}>
            Shop Now
          </button>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => {
            const deliveryInfo = calculateDeliveryTime(order);
            return (
              <div key={order._id} className="order-card">
                <div className="order-header">
                  <div className="order-id">
                    <span>Order ID:</span> {order._id.slice(-6)}
                  </div>
                  <div className={`order-status ${order.status.toLowerCase()}`}>
                    {order.status}
                  </div>
                </div>
                <div className="order-details">
                  <p>
                    <strong>Placed On:</strong> {formatDate(order.createdAt)}
                  </p>
                  <p>
                    <strong>Items:</strong>{' '}
                    {order.cartItems.map((item) => `${item.name} (x${item.quantity})`).join(', ')}
                  </p>
                  <p>
                    <strong>Total:</strong> ₹{order.totalPrice}
                  </p>
                  <p>
                    <strong>Delivery Address:</strong> {order.deliveryAddress}
                  </p>
                  {(order.status === 'Accepted' || order.status === 'Delivered') && (
                    <p>
                      <strong>Delivery Status:</strong>{' '}
                      <span className={deliveryInfo.isDelivered ? 'delivered' : ''}>
                        {deliveryInfo.message}
                      </span>
                    </p>
                  )}
                </div>
                {/* Status timeline */}
                <div className="order-timeline">
                  <div className={`timeline-step ${order.status !== 'Rejected' ? 'completed' : ''}`}>
                    <span className="step-icon">✔</span>
                    <span className="step-label">Order Placed</span>
                  </div>
                  <div
                    className={`timeline-step ${
                      order.status === 'Accepted' || order.status === 'Rejected' || order.status === 'Delivered' ? 'completed' : ''
                    }`}
                  >
                    <span className="step-icon">
                      {order.status === 'Rejected' ? '✖' : '✔'}
                    </span>
                    <span className="step-label">
                      {order.status === 'Rejected' ? 'Rejected' : 'Accepted'}
                    </span>
                  </div>
                  {(order.status === 'Accepted' || order.status === 'Delivered') && (
                    <div className={`timeline-step ${order.status === 'Delivered' ? 'completed' : ''}`}>
                      <span className="step-icon">🚚</span>
                      <span className="step-label">Delivered</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
