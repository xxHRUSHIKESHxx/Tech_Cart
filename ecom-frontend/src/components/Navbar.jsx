import { FaShoppingCart, FaUser, FaSignOutAlt } from 'react-icons/fa'; 
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice'; // Import your logout action
import '../styles/navbar.css'; // Make sure the correct CSS is imported
import { logout_user } from '../apis/authentications';
import logo from '../../src/assets/logo.jpg';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
 
  // Get the authentication state and user information from Redux
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const user = useSelector((state) => state.auth.user); // Assuming user details are stored in state.auth.user
 
  const cartItems = useSelector((state) => state.cart.items); // Accessing cart items from Redux store
 
  // Calculate the total number of items in the cart
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const is_loggedin = JSON.parse(localStorage.getItem('isLoggedIn'));
  console.log("is_loggedin", is_loggedin);

  const handleLogout = () => {
    logout_user();
    dispatch(logout()); // Dispatch the logout action
    navigate('/'); // Redirect to login page after logout
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/shop" className="navbar-logo">
          <img className='logo-image' src={logo} alt='logo'/>
        </Link>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/cart" className="navbar-link">
            <FaShoppingCart /> {/* Cart icon */}
            {itemCount > 0 && is_loggedin ? <span className="cart-count">({itemCount})</span> : null} {/* Display item count if greater than 0 */}
          </Link>
        </li>
        {isLoggedIn ? (
          <>
            <li>
              <Link to="/profile" className="navbar-link">
                <FaUser /> {/* User icon */}
              </Link>
            </li>
            <li>
              <button className="navbar-link logout" onClick={handleLogout}>
                <FaSignOutAlt className="logout-icon" /> {/* Logout icon */}
              </button>
            </li>
          </>
        ) : (
          <li>
            <Link to="/login" className="navbar-link"><b>Signup/Login</b></Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
