import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import '../styles/UserProfile.css';
import { MAIN_API } from '../apis/mainapi';

function UserProfile() {
  const { user, isLoggedIn } = useSelector((state) => state.auth);
  const [orders, setOrders] = useState([]); // State to store fetched orders
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState(null); // State for error handling
  const navigate = useNavigate();

  // Fetch orders when the component mounts
  useEffect(() => {
    if (isLoggedIn && user) {
      axios
        .get(`${MAIN_API}/api/orders/`, {
          headers: {
            Authorization: `${Cookies.get('authToken')}`, // Ensure proper token format
          },
        })
        .then((response) => {
          setOrders(response.data);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.response?.data?.message || 'Error fetching orders');
          setLoading(false);
        });
    }
  }, [isLoggedIn, user]);

  // If the user is not logged in, display a message
  if (!isLoggedIn || !user) {
    return <div className="user-profile-container">Please log in to view your profile.</div>;
  }

  
  console.log("user", user);
  console.log(`${user.profile_image}`);

  return (
    <div className="user-profile-container">
      <div className="profile-card">
        <h2 className="profile-greeting">Hi, {user.username}!</h2>
        
        {/* User Image */}
        {user.profile_image ? ( // Conditional rendering for user image
          <img
            src={`${user.profile_image}`} // Assuming user.image contains the image URL
            alt="User Avatar"
            className="profile-avatar"
          />
        ) : (
          <img
            src={'https://images.pexels.com/photos/7773731/pexels-photo-7773731.jpeg?auto=compress&cs=tinysrgb&w=400'} // Assuming user.image contains the image URL
            alt="User Avatar"
            className="profile-avatar"
          />)}

        <h2 className="profile-name">Name: {user.username}</h2>
        <p className="profile-email">Email: {user.email}</p>
        <button
          className="edit-button"
          onClick={() => navigate('/edit-user-profile')}
        >
          Edit Profile
        </button>
      </div>

      <div className="orders-section">
        <h2 className="orders-title">Your Orders</h2>
        {loading ? (
          <p>Loading orders...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          <table className="orders-table">
            <thead>
              <tr>
                <th>Order Amount</th>
                <th>Status</th>
                <th>Order Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>${order.total_amount}</td>
                  <td>{order.status}</td>
                  <td>{new Date(order.order_date).toLocaleDateString()}</td> {/* Format date */}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default UserProfile;
