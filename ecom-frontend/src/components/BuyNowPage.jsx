import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/BuyNowPage.css';
import { MAIN_API } from '../apis/mainapi'
const BuyNowPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { product } = location.state || {}; // Destructure product from state

  console.log("product data from buynow page", product)
  if (!product) {
    return <p style={{ backgroundColor: 'red' }}>No product found.</p>;
  }

  const handleConfirmPurchase = () => {
    // Redirect to payment page, passing product details
    navigate('/payment', { state: { product } });
  };

  return (
    <div className="buy-now-container">
      <div className="buy-now-content">
        <h2 className="buy-now-title">Buy Now</h2>
        <div className="buy-now-details">
          <img src={`${MAIN_API}${product.image}`} alt={product.name} className="buy-now-image" />
          <div className="buy-now-info">
            <h3 className="buy-now-product-name">{product.name}</h3>
            <p className="buy-now-price">Price: ${product.price}</p>
          </div>
        </div>
        <button onClick={handleConfirmPurchase} className="buy-now-button">
          Proceed to Payment
        </button>
      </div>
    </div>
  );
};

export default BuyNowPage;
