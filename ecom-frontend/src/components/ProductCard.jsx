import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { addCartItemThunk, deleteCartItemThunk , fetchCartItemsThunk } from '../redux/CartSlice'; // Import your thunks
import '../styles/ProductCard.css';
import { MAIN_API } from '../apis/mainapi';

const ProductCard = ({ product, hideWishlistIcon = false }) => {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.items);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [colouredHeart , setColouredHeart] = useState(false);

  useEffect(() => {
    const isInWishlist = wishlist.some((item) => item.product === product.id);
    setIsWishlisted(isInWishlist);
    console.log('isInWishlist ' , isInWishlist)
  }, [wishlist, product.id, dispatch]);

  const toggleWishlist = () => {
    setColouredHeart(!colouredHeart);
    if (isWishlisted) {
      console.log('trying to remove from wishlist', isWishlisted)

      dispatch(deleteCartItemThunk(product.id)); // Call the thunk to remove the item from cart
    } else {
      dispatch(addCartItemThunk({ productId: product.id, quantity: 1 })); // Call the thunk to add the item to cart
      console.log('trying to add from wishlist', isWishlisted)

    }
    setTimeout(() => {
      dispatch(fetchCartItemsThunk()); // Refetch the cart items from the backend to update the Redux state
    }, 1000); // 1000 milliseconds = 1 second
  };

  return (
    <div className="product-card">
      {/* Conditionally render the wishlist icon based on hideWishlistIcon */}
      {!hideWishlistIcon && (
        <div className="wishlist-icon" onClick={toggleWishlist}>
          <FontAwesomeIcon icon={isWishlisted || colouredHeart ? solidHeart : regularHeart} className="heart-icon" />
        </div>
      )}
      <Link to={`/product/${product.id}`}>
        <img src={`${MAIN_API}${product.image}`} alt={product.name} className="product-image" />
      </Link>
      <h3 className="product-title">
        <Link to={`/product/${product.id}`}>{product.name}</Link>
      </h3>
      <p className="product-price">
        ${Number(product.price).toFixed(2) || '0.00'}
      </p>
    </div>
  );
};

export default ProductCard;
