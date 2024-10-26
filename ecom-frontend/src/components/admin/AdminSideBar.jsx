import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/AdminSidebar.css';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/authSlice.js';
import { logout_user } from '../../apis/authentications.js';

const AdminSideBar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLinkClick = (linkName) => {
    setActiveLink(linkName);
  };

  const handleLogout = () => {
    logout_user();
    dispatch(logout());
    navigate('/');
  };

  const openFeedbackPage = () => {
    navigate('/admin/feedbacks');
  };

  return (
    <aside className={`admin-sidebar ${isSidebarOpen ? 'open' : ''}`}>
      <button className="burger-menu" onClick={toggleSidebar}>
        &#9776;
      </button>
      <h2 className="admin-logo">Admin Panel</h2>
      <ul className="admin-nav">
        <li>
          <Link
            to="/admin/dashboard"
            onClick={() => handleLinkClick('dashboard')}
            className={activeLink === 'dashboard' ? 'active' : ''}
          >
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            to="/admin/products"
            onClick={() => handleLinkClick('products')}
            className={activeLink === 'products' ? 'active' : ''}
          >
            Product Management
          </Link>
        </li>
        <li>
          <Link
            to="/admin/orders"
            onClick={() => handleLinkClick('orders')}
            className={activeLink === 'orders' ? 'active' : ''}
          >
            Order Management
          </Link>
        </li>
        <li>
          <button className="open-feedback-btn" onClick={openFeedbackPage}>
            Open Feedback Page
          </button>
        </li>
      </ul>
      <button className="profile-btn" onClick={handleLogout}>
        Logout
      </button>
    </aside>
  );
};

export default AdminSideBar;
