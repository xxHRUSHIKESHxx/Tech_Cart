import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Cart.css';
import { fetchCartItemsThunk, deleteCartItemThunk } from '../redux/CartSlice';
 
const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);
 
  useEffect(() => {
    dispatch(fetchCartItemsThunk()); // Fetch cart items when the component mounts
  }, [dispatch]);
 
  const handleDelete = async (productId) => {
    await dispatch(deleteCartItemThunk(productId)); // Wait for the deletion to complete
    dispatch(fetchCartItemsThunk()); // Fetch the updated cart items after deletion
  };
 
  if (!cartItems || cartItems.length === 0) {
    return <div>Your cart is empty</div>;
  }
 
  const handleBuyAll = () => {
    navigate('/multi-prod-payment', { state: { cartItems } });
  };
 
  return (
<div className="cart-container">
<h2>Your Cart</h2>
<div className="cart-grid">
        {cartItems.map((item) => (
<div key={item.id} className="cart-product-card">
<Link to={`/product/${item.id}`}>
<img src={`${item.product_image}`} alt={item.name} className="cart-product-image" />
</Link>
<div className="cart-product-info">
<h3 className="cart-product-title">
<Link to={`/product/${item.id}`}>{item.product_name}</Link>
</h3>
<p className="cart-product-price">₹{item.price_at_addition}</p>
<button className="remove-button" onClick={() => handleDelete(item.product)}>
                Remove
</button>
</div>
</div>
        ))}
</div>
 
      <div className="buy-all-container">
<button className="buy-all-button" onClick={handleBuyAll}>
          Buy All
</button>
</div>
</div>
  );
};
 
export default Cart;