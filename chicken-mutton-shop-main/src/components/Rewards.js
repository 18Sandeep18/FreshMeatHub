import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Rewards.css';

const Rewards = ({ isLoggedIn, setShowLogin }) => {
  const navigate = useNavigate();
  const [rewards, setRewards] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isLoggedIn) {
      setShowLogin(true);
      navigate('/');
      return;
    }

    const fetchRewards = async () => {
      try {
        const response = await fetch('https://freshmeathub.onrender.com/api/rewards');
        const data = await response.json();
        if (data.success) {
          setRewards(data.rewards);
        } else {
          setError('Failed to load rewards.');
        }
      } catch (err) {
        setError('Failed to load rewards. Please try again.');
        console.error('Error fetching rewards:', err.message);
      }
    };

    fetchRewards();
  }, [isLoggedIn, setShowLogin, navigate]);

  const handleClaimReward = async (rewardId) => {
    try {
      // In a real app, make an API call to claim the reward
      const response = await fetch(`https://freshmeathub.onrender.com/api/rewards/claim/${rewardId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      if (data.success) {
        setRewards((prevRewards) =>
          prevRewards.map((reward) =>
            reward._id === rewardId ? { ...reward, claimed: true, discountCode: data.discountCode } : reward
          )
        );
      } else {
        setError('Failed to claim reward.');
      }
    } catch (err) {
      setError('Failed to claim reward. Please try again.');
      console.error('Error claiming reward:', err.message);
    }
  };

  if (!isLoggedIn) {
    return null; // Redirect handled in useEffect
  }

  return (
    <div className="rewards-page">
      <h2 className="rewards-title">My Rewards</h2>
      <p className="rewards-subtitle">
        Check the status of your referrals and claim your rewards!
      </p>

      {error && <p className="error-message">{error}</p>}

      {rewards.length === 0 ? (
        <div className="no-rewards">
          <p>You haven’t referred anyone yet.</p>
          <button
            onClick={() => navigate('/refer-a-friend')}
            className="refer-now-btn"
          >
            Refer a Friend Now
          </button>
        </div>
      ) : (
        <div className="rewards-list">
          {rewards.map((reward) => (
            <div key={reward._id} className="reward-card">
              <div className="reward-details">
                <h3>Referral to {reward.referredEmail}</h3>
                <p>
                  <strong>Referral Code:</strong> {reward.referralCode}
                </p>
                <p>
                  <strong>Status:</strong>{' '}
                  <span className={`status ${reward.status.toLowerCase()}`}>
                    {reward.status}
                  </span>
                </p>
                <p>
                  <strong>Reward:</strong> {reward.reward}
                </p>
                {reward.status === 'Completed' && reward.claimed && (
                  <p>
                    <strong>Discount Code:</strong> {reward.discountCode}
                  </p>
                )}
              </div>
              <div className="reward-actions">
                {reward.status === 'Completed' && !reward.claimed && (
                  <button
                    onClick={() => handleClaimReward(reward._id)}
                    className="claim-btn"
                  >
                    Claim Reward
                  </button>
                )}
                {reward.status === 'Completed' && reward.claimed && (
                  <p className="claimed-text">Reward Claimed!</p>
                )}
                {reward.status === 'Pending' && (
                  <p className="pending-text">
                    Waiting for your friend to place their first order.
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Rewards;
