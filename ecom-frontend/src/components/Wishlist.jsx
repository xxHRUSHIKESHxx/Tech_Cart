import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import '../styles/WishList.css'
import { MAIN_API } from '../apis/mainapi';

const Wishlist = () => {
  const wishlistItems = useSelector((state) => state.wishlist.items); // Access wishlist items from Redux store

  if (!wishlistItems || wishlistItems.length === 0) {
    return <div>Your wishlist is empty</div>;
  }

  return (
    <div className="wishlist-container">
      <h2>My Cart</h2>
      <div className="wishlist-grid">
        {wishlistItems.map((item) => (
          <div key={item.id} className="wishlist-product-card">
            <Link to={`/product/${item.id}`}>
              <img src={`${MAIN_API}${item.image}`} alt={item.name} className="wishlist-product-image" />
            </Link>

            <h3 className="wishlist-product-title">
              <Link to={`/product/${item.id}`}>{item.name}</Link>
            </h3>

            <p className="wishlist-product-price">${item.price}</p>

           
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
