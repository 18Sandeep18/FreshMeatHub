import React from 'react';
import './Profile.css';

function Profile({ mobileNumber, onLogout }) {
  const orders = [
    { id: 1, item: 'Chicken Curry Cut - Small Pieces', quantity: 2, weight: '500g', price: '₹150', date: '2025-03-18' },
    { id: 2, item: 'Mutton Boneless', quantity: 1, weight: '450g', price: '₹345', date: '2025-03-17' },
  ];

  return (
    <div className="profile-container">
      <h2>Your Profile</h2>
      <div className="profile-info">
        <p><strong>Mobile Number:</strong> {mobileNumber}</p>
      </div>
      <h3>Your Orders</h3>
      {orders.length > 0 ? (
        <div className="orders-grid">
          {orders.map((order) => (
            <div key={order.id} className="order-card">
              <div className="order-details">
                <h4>{order.item}</h4>
                <p>Quantity: {order.quantity}</p>
                <p>Weight: {order.weight}</p>
                <p>Price: {order.price}</p>
                <p>Date: {order.date}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No orders yet.</p>
      )}
      <button onClick={onLogout} className="logout-btn">
        Logout
      </button>
    </div>
  );
}

export default Profile;