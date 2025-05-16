import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './OwnerDashboard.css';

const OwnerDashboard = () => {
  const [pendingOrders, setPendingOrders] = useState([]);
  const [allOrders, setAllOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(null); // 'accept', 'reject', 'delivered', or null
  const [activeTab, setActiveTab] = useState('pending'); // 'pending' or 'all'

  // Fetch pending orders when the component mounts
  useEffect(() => {
    const fetchPendingOrders = async () => {
      try {
        const response = await fetch('https://freshmeathub.onrender.com/api/orders/pending');
        const data = await response.json();
        if (data.success) {
          setPendingOrders(data.orders);
          setLoading(false);
        } else {
          setError('Failed to fetch pending orders');
          setLoading(false);
        }
      } catch (err) {
        setError('Error fetching pending orders: ' + err.message);
        setLoading(false);
      }
    };

    fetchPendingOrders();
  }, []);

  // Fetch all orders when the "All Orders" tab is selected
  useEffect(() => {
    if (activeTab === 'all') {
      const fetchAllOrders = async () => {
        try {
          setLoading(true);
          const response = await fetch('https://freshmeathub.onrender.com/api/orders/all');
          const data = await response.json();
          if (data.success) {
            setAllOrders(data.orders);
            setLoading(false);
          } else {
            setError('Failed to fetch all orders');
            setLoading(false);
          }
        } catch (err) {
          setError('Error fetching all orders: ' + err.message);
          setLoading(false);
        }
      };

      fetchAllOrders();
    }
  }, [activeTab]);

  // Function to accept an order
  const acceptOrder = async (orderId) => {
    try {
      const response = await fetch(`https://freshmeathub.onrender.com/api/orders/${orderId}/accept`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (data.success) {
        setShowConfirmation('accept');
        setPendingOrders(pendingOrders.filter(order => order._id !== orderId));
        setTimeout(() => {
          setShowConfirmation(null);
        }, 2000);
      } else {
        alert('Failed to accept order: ' + data.error);
      }
    } catch (error) {
      console.error('Error accepting order:', error);
      alert('Failed to accept order: ' + error.message);
    }
  };

  // Function to reject an order
  const rejectOrder = async (orderId) => {
    try {
      const response = await fetch(`https://freshmeathub.onrender.com/api/orders/${orderId}/reject`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (data.success) {
        setShowConfirmation('reject');
        setPendingOrders(pendingOrders.filter(order => order._id !== orderId));
        setTimeout(() => {
          setShowConfirmation(null);
        }, 2000);
      } else {
        alert('Failed to reject order: ' + data.error);
      }
    } catch (error) {
      console.error('Error rejecting order:', error);
      alert('Failed to reject order: ' + error.message);
    }
  };

  // Function to mark an order as delivered
  const markAsDelivered = async (orderId) => {
    try {
      const response = await fetch(`https://freshmeathub.onrender.com/api/orders/${orderId}/deliver`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (data.success) {
        setShowConfirmation('delivered');
        // Update allOrders to reflect the new status
        setAllOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId ? { ...order, status: 'Delivered', deliveredAt: new Date() } : order
          )
        );
        setTimeout(() => {
          setShowConfirmation(null);
        }, 2000);
      } else {
        alert('Failed to mark order as delivered: ' + data.error);
      }
    } catch (error) {
      console.error('Error marking order as delivered:', error);
      alert('Failed to mark order as delivered: ' + error.message);
    }
  };

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="loading">Loading orders...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-container">
        <div className="error">{error}</div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <div className="sidebar-header">
          <h2>Owner Dashboard</h2>
        </div>
        <nav className="sidebar-nav">
          <button
            className={`nav-item ${activeTab === 'pending' ? 'active' : ''}`}
            onClick={() => setActiveTab('pending')}
          >
            Pending Orders
          </button>
          <button
            className={`nav-item ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            All Orders
          </button>
          <Link to="/" className="nav-item">Back to Home</Link>
        </nav>
      </div>

      <div className="main-content">
        {showConfirmation && (
          <div className="confirmation-modal">
            <div
              className={
                showConfirmation === 'accept'
                  ? 'tick-animation'
                  : showConfirmation === 'delivered'
                  ? 'tick-animation'
                  : 'reject-animation'
              }
            >
              <svg
                className={
                  showConfirmation === 'accept' || showConfirmation === 'delivered'
                    ? 'checkmark'
                    : 'rejectmark'
                }
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 52 52"
              >
                <circle
                  className={
                    showConfirmation === 'accept' || showConfirmation === 'delivered'
                      ? 'checkmark-circle'
                      : 'rejectmark-circle'
                  }
                  cx="26"
                  cy="26"
                  r="25"
                  fill="none"
                />
                {showConfirmation === 'accept' || showConfirmation === 'delivered' ? (
                  <path className="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                ) : (
                  <path className="rejectmark-x" fill="none" d="M16 16 36 36 M36 16 16 36" />
                )}
              </svg>
            </div>
            <p>
              {showConfirmation === 'accept'
                ? 'Order Accepted Successfully!'
                : showConfirmation === 'delivered'
                ? 'Order Marked as Delivered!'
                : 'Order Rejected!'}
            </p>
          </div>
        )}

        <div className="content-header">
          <h1>{activeTab === 'pending' ? 'Pending Orders' : 'All Orders'}</h1>
        </div>

        <div className="orders-grid">
          {activeTab === 'pending' ? (
            pendingOrders.length === 0 ? (
              <p className="no-orders">No pending orders.</p>
            ) : (
              pendingOrders.map(order => (
                <div key={order._id} className="order-card">
                  <div className="order-header">
                    <h3>Order ID: {order._id}</h3>
                  </div>
                  <div className="order-details">
                    <p><strong>Items:</strong></p>
                    <ul>
                      {order.cartItems.map(item => (
                        <li key={item.id}>
                          {item.name} (Qty: {item.quantity}) - ₹{item.price * item.quantity}
                        </li>
                      ))}
                    </ul>
                    <p><strong>Total:</strong> ₹{order.totalPrice}</p>
                    <p><strong>Delivery Address:</strong> {order.deliveryAddress}</p>
                    <p><strong>Mobile:</strong> {order.mobileNumber}</p>
                    <p><strong>Alt Mobile:</strong> {order.altMobileNumber || 'N/A'}</p>
                  </div>
                  <div className="order-actions">
                    <button onClick={() => acceptOrder(order._id)} className="accept-button">
                      Accept Order
                    </button>
                    <button onClick={() => rejectOrder(order._id)} className="reject-button">
                      Reject Order
                    </button>
                  </div>
                </div>
              ))
            )
          ) : (
            allOrders.length === 0 ? (
              <p className="no-orders">No orders found.</p>
            ) : (
              allOrders.map(order => (
                <div key={order._id} className="order-card">
                  <div className="order-header">
                    <h3>Order ID: {order._id}</h3>
                    <span className={`status-badge status-${order.status.toLowerCase()}`}>
                      {order.status}
                    </span>
                  </div>
                  <div className="order-details">
                    <p><strong>Items:</strong></p>
                    <ul>
                      {order.cartItems.map(item => (
                        <li key={item.id}>
                          {item.name} (Qty: {item.quantity}) - ₹{item.price * item.quantity}
                        </li>
                      ))}
                    </ul>
                    <p><strong>Total:</strong> ₹{order.totalPrice}</p>
                    <p><strong>Delivery Address:</strong> {order.deliveryAddress}</p>
                    <p><strong>Mobile:</strong> {order.mobileNumber}</p>
                    <p><strong>Alt Mobile:</strong> {order.altMobileNumber || 'N/A'}</p>
                    <p><strong>Created At:</strong> {new Date(order.createdAt).toLocaleString()}</p>
                    {order.status === 'Delivered' && order.deliveredAt && (
                      <p><strong>Delivered At:</strong> {new Date(order.deliveredAt).toLocaleString()}</p>
                    )}
                  </div>
                  {order.status === 'Accepted' && (
                    <div className="order-actions">
                      <button onClick={() => markAsDelivered(order._id)} className="deliver-button">
                        Mark as Delivered
                      </button>
                    </div>
                  )}
                </div>
              ))
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default OwnerDashboard;
