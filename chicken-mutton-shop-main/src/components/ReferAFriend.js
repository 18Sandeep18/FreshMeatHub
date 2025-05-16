import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLink, FaShareAlt, FaCopy } from 'react-icons/fa';
import './ReferAFriend.css';

const ReferAFriend = ({ isLoggedIn, setShowLogin }) => {
  const navigate = useNavigate();
  const [friendEmail, setFriendEmail] = useState('');
  const [referralLink, setReferralLink] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  // Generate a unique referral link
  useEffect(() => {
    if (!isLoggedIn) {
      setShowLogin(true);
      navigate('/');
      return;
    }

    // Generate a unique referral code (mock for now, should be user-specific from backend)
    const referralCode = `REF${Math.random().toString(36).substr(2, 8).toUpperCase()}`; // Example: REF123XYZ
    const generatedLink = `http://localhost:3000/?ref=${referralCode}`;
    setReferralLink(generatedLink);
  }, [isLoggedIn, setShowLogin, navigate]);

  // Handle email referral submission
  const handleEmailReferral = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (!friendEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(friendEmail)) {
      setError('Please enter a valid email address.');
      return;
    }

    try {
      const response = await fetch('https://freshmeathub.onrender.com/api/referrals/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ friendEmail, referralLink }),
      });
      const data = await response.json();
      if (data.success) {
        setMessage('Referral email sent successfully!');
        setFriendEmail('');
      } else {
        setError(data.error || 'Failed to send referral email.');
      }
    } catch (err) {
      setError('Failed to send referral email. Please try again.');
      console.error('Error sending referral email:', err.message);
    }
  };

  // Copy referral link to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // Share on social media
  const shareOnSocialMedia = (platform) => {
    const shareText = `Join me on Abdul's Chicken and get a ₹100 discount on your first order! ${referralLink}`;
    let shareUrl = '';

    switch (platform) {
      case 'whatsapp':
        shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}`;
        break;
      default:
        return;
    }

    window.open(shareUrl, '_blank');
  };

  if (!isLoggedIn) {
    return null; // Redirect handled in useEffect
  }

  return (
    <div className="refer-a-friend-page">
      <h2 className="refer-title">Refer a Friend</h2>
      <p className="refer-subtitle">
        Invite your friends to Abdul's Chicken and both of you get a ₹100 discount on your next order!
      </p>

      {/* Referral Link Section */}
      <div className="referral-link-section">
        <h3>Your Referral Link</h3>
        <div className="referral-link-box">
          <FaLink className="link-icon" />
          <input type="text" value={referralLink} readOnly className="referral-link-input" />
          <button onClick={copyToClipboard} className="copy-btn">
            {copied ? 'Copied!' : <FaCopy />}
          </button>
        </div>
      </div>

      {/* Email Referral Section */}
      <div className="email-referral-section">
        <h3>Invite via Email</h3>
        <form onSubmit={handleEmailReferral} className="email-referral-form">
          <div className="input-group">
            <FaEnvelope className="input-icon" />
            <input
              type="email"
              value={friendEmail}
              onChange={(e) => setFriendEmail(e.target.value)}
              placeholder="Enter your friend's email"
              className="email-input"
            />
          </div>
          <button type="submit" className="send-btn">
            Send Invitation
          </button>
        </form>
        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}
      </div>

      {/* Social Media Sharing Section */}
      <div className="social-share-section">
        <h3>Share on Social Media</h3>
        <div className="social-buttons">
          <button
            onClick={() => shareOnSocialMedia('whatsapp')}
            className="social-btn whatsapp"
          >
            <FaShareAlt /> WhatsApp
          </button>
          <button
            onClick={() => shareOnSocialMedia('twitter')}
            className="social-btn twitter"
          >
            <FaShareAlt /> Twitter
          </button>
          <button
            onClick={() => shareOnSocialMedia('facebook')}
            className="social-btn facebook"
          >
            <FaShareAlt /> Facebook
          </button>
        </div>
      </div>

      {/* Referral Benefits Section */}
      <div className="referral-benefits">
        <h3>How It Works</h3>
        <div className="benefits-list">
          <div className="benefit-item">
            <span className="benefit-icon">🎁</span>
            <p>Share your referral link with a friend.</p>
          </div>
          <div className="benefit-item">
            <span className="benefit-icon">📩</span>
            <p>Your friend signs up and places their first order using the link.</p>
          </div>
          <div className="benefit-item">
            <span className="benefit-icon">💰</span>
            <p>Both of you get a ₹100 discount on your next order!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferAFriend;
