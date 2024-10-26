import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addCartItemThunk, deleteCartItemThunk , fetchCartItemsThunk } from '../redux/CartSlice'; // Import the thunks
import axios from 'axios';
import '../styles/ProductDetail.css';
import { MAIN_API } from '../apis/mainapi';

const ProductDetail = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart.items); // Get cart items from Redux
  const [product, setProduct] = useState(null);
  const [isInCart, setIsInCart] = useState(false); // State to track if the product is in the cart
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await axios.get(`${MAIN_API}/api/products/${productId}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Failed to fetch product:', error);
      } finally {
        setLoading(false);
      }
    };

    getProduct();
  }, [productId]);

  useEffect(() => {
    if (product) {
      const inCart = cart.some((item) => item.product === product.id);
      setIsInCart(inCart);
    }
  }, [cart, product]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  const discount = product.stock > 50 ? (product.price * 0.1) : null;
  const finalPrice = discount ? (product.price - discount) : product.price;

  
  
  const toggleCart = async () => {
    if (isInCart) {
      await dispatch(deleteCartItemThunk(product.id)); // Remove from cart
    } else {
      await dispatch(addCartItemThunk({ productId: product.id, quantity: 1 })); // Add to cart
    }
  
    // Wait 1 second before refetching the cart to ensure the action has completed
    setTimeout(() => {
      dispatch(fetchCartItemsThunk()); // Refetch the cart items from the backend to update the Redux state
    }, 1000); // 1000 milliseconds = 1 second
  };

  const handleBuyNow = () => {
    navigate(`/buy-now/${product.id}`, { state: { product: product } });
  };

  return (
    <div className="product-detail-page">
      <img src={`${MAIN_API}${product.image}`} alt={product.name} className="product-detail-image" />

      <div className="product-detail-info">
        <h1 className="product-detail-title">{product.name}</h1>
        <p className="product-detail-category">Category: {product.category}</p>
        <p className="product-detail-description">{product.description}</p>

        {discount ? (
          <p className="product-detail-price">Price: ₹{finalPrice}</p>
        ) : (
          <p className="product-detail-price">Price: ₹{finalPrice}</p>
        )}

        <p className={`product-detail-stock ${product.stock < 10 ? 'stock-low' : 'stock-normal'}`}>
          Stock: {product.stock} {product.stock < 30 && '(Hurry Up! Only Few products left)'}
        </p>

        <div className="product-detail-buttons">
          {/* Add/Remove from Cart Button */}
          <button onClick={toggleCart} className="product-detail-button cart-btn">
            {isInCart ? 'Remove from Cart' : 'Add to Cart'}
          </button>

          {/* Buy Now Button */}
          <button className="product-detail-button buy-now-btn" onClick={handleBuyNow}>
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
