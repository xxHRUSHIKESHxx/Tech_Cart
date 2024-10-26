// src/components/FeedbackPage.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import '../styles/feedback.css'; // Ensure feedback.css has appropriate styling

const emojiMap = {
  1: '😢', // Crying emoji for 1 star
  2: '☹️', // Sad emoji for 2 stars
  3: '😐', // Neutral emoji for 3 stars
  4: '😊', // Happy emoji for 4 stars
  5: '😍', // Heart eyes emoji for 5 stars
};

const FeedbackPage = () => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [review, setReview] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Get user details from Redux state
  const user = useSelector((state) => state.auth.user);

  // Function to submit feedback
  const submitFeedback = async () => {
    if (rating === 0 || review.trim() === '') {
      setError('Please provide a rating and a review.');
      return;
    }

    const payload = {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        is_admin: user.is_admin || false,
      },
      rating,
      review,
    };

    try {
      const response = await axios.post('http://localhost:5000/submit_feedback', payload);
      setMessage(response.data.message);
      setRating(0);
      setReview('');
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to submit feedback.');
      setMessage('');
    }
  };

  return (
    <div className="feedback-page">
      <h1>Share Your Feedback</h1>
      <div className="emoji-display">
        {emojiMap[hoverRating] || '⭐'} {/* Display the emoji based on hover rating */}
      </div>
      <div className="star-rating">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`star ${hoverRating >= star ? 'hover' : ''} ${rating >= star ? 'selected' : ''}`}
            onMouseEnter={() => setHoverRating(star)}
            onMouseLeave={() => setHoverRating(0)}
            onClick={() => setRating(star)}
            role="button"
            aria-label={`${star} star rating`}
          >
            ★
          </span>
        ))}
      </div>
      <textarea
        rows="5"
        placeholder="Your feedback here..."
        value={review}
        onChange={(e) => setReview(e.target.value)}
        className="feedback-textarea"
        aria-label="Feedback text area"
      ></textarea>
      <button className="btn-submit" onClick={submitFeedback}>
        Submit
      </button>
      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default FeedbackPage;
