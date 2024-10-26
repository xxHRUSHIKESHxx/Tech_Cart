// FeedbackPage.js
import React, { useEffect, useState } from 'react';
import './FeedbackPage.css'; // Optional: Externalize the styles if needed

const FeedbackPage = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const response = await fetch('http://localhost:5000/feedbacks');
      const data = await response.json();
      setFeedbacks(data);
    } catch (error) {
      console.error('Error fetching feedback:', error);
    }
  };

  return (
    <div className="feedback-page">
      <h1>User Feedbacks</h1>
      <div className="feedback-container">
        {feedbacks.length > 0 ? (
          feedbacks.map(feedback => (
            <div key={feedback._id} className="feedback-item">
              <h3>User: {feedback.user.username} ({feedback.user.email})</h3>
              <p className="rating">Rating: {feedback.rating}/5</p>
              <p>Review: {feedback.review}</p>
            </div>
          ))
        ) : (
          <p className="no-feedback">No feedback available.</p>
        )}
      </div>
    </div>
  );
};

export default FeedbackPage;
