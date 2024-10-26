import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import '../styles/EditUserProfile.css'; // Ensure this file exists

// Anupam changed: Import for toast notifications
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify'; 

const EditUserProfile = () => {
  const { user, isLoggedIn } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    username: '',
    profile_image: null, // For file input
    password_hash: '', // Optional: used for hashing in the backend
  });
  const navigate = useNavigate();

  // Fetch user details on component mount
  useEffect(() => {
    if (isLoggedIn && user) {
      setFormData({
        username: user.username || '',
        profile_image: null,
        password_hash: '',
      });
    } else {
      navigate('/login'); // Redirect to login if not logged in
    }
  }, [isLoggedIn, user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'profile_image') {
      setFormData({ ...formData, [name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, profile_image, password_hash } = formData;

    const formDataToSend = new FormData();
    formDataToSend.append('username', username);
    if (profile_image) {
      formDataToSend.append('profile_image', profile_image);
    }
    
    if (password_hash) {
      formDataToSend.append('password_hash', password_hash);
    }

    try {
      const response = await axios.put('http://localhost:8000/api/updateprofile/', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `${Cookies.get('authToken')}`, // Ensure correct token format
        },
      });
      toast.success('Profile updated successfully!', { // Anupam changed: Success toast
        autoClose: 2000,
      });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error updating profile'); // Anupam changed: Error toast
    }
  };

  return (
    <div className="edit-user-profile-container">
      <ToastContainer /> {/* Anupam changed: Added ToastContainer for toast notifications */}
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="profile_image">Profile Image</label>
          <input
            type="file"
            id="profile_image"
            name="profile_image"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password_hash">Password (optional)</label>
          <input
            type="password"
            id="password_hash"
            name="password_hash"
            value={formData.password_hash}
            onChange={handleChange}
            placeholder="Leave blank to keep current password"
          />
        </div>
        <button type="submit" className="submit-button">Update Profile</button>
      </form>
    </div>
  );
};

export default EditUserProfile;
