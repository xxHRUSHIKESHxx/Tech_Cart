import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/payment.css';
import Cookies from 'js-cookie';
import axios from 'axios';

const MultiProdPayment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems } = location.state || {}; // Destructure cartItems from state (an array of products)
  
  console.log('cartItems: ', cartItems);
  
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [billingAddress, setBillingAddress] = useState('123 Default St, Sample City');
  const [transactionId, setTransactionId] = useState('txn_' + Date.now());
  const [error, setError] = useState('');
  const [quantities, setQuantities] = useState(cartItems.map(item => ({ productId: item.product, quantity: 1 }))); // Quantities for each product
  const [totalAmount, setTotalAmount] = useState(0);
  const user_data = JSON.parse(localStorage.getItem('user'));

  // Calculate total amount based on product quantities
  useEffect(() => {
    const total = cartItems.reduce((acc, product) => {
      const quantityObj = quantities.find(q => q.productId === product.product);
      const quantity = quantityObj ? quantityObj.quantity : 1;
      return acc + product.price_at_addition * quantity;
    }, 0);
    setTotalAmount(total);
  }, [quantities, cartItems]);

  // Handle quantity change
  const handleQuantityChange = (productId, newQuantity) => {
    setQuantities(prevQuantities =>
      prevQuantities.map(item =>
        item.productId === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };


  // Helper function to create a delay
  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const handleConfirmPurchase = async () => {
    if (!deliveryAddress) {
      setError('Please enter a valid delivery address.');
      return;
    }

    try {
      // Step 1: Create a payment using Axios
      const paymentResponse = await axios.post(
        'http://127.0.0.1:8000/api/create-payment',
        {
          user_id: user_data.id,
          amount: totalAmount,
          payment_method: paymentMethod,
          transaction_id: transactionId,
          payment_status: "completed"
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': Cookies.get('authToken'),
          },
        }
      );

      const paymentData = paymentResponse.data;
      if (paymentData.payment_status === 'completed') {
        await delay(1000); // 1 second delay

        // Step 2: Place the order after successful payment
        const orderItems = cartItems.map(product => {
          const quantityObj = quantities.find(q => q.productId === product.product);
          return {
            product_id: product.product, // Use product.product as the actual product ID
            quantity: quantityObj ? quantityObj.quantity : 1,
          };
        });

        const orderResponse = await axios.post(
          'http://127.0.0.1:8000/api/place-order/',
          {
            shipping_address: deliveryAddress,
            billing_address: billingAddress,
            order_items: orderItems, // Order items with product IDs and quantities
            payment_id: paymentData.payment_id,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': Cookies.get('authToken'),
            },
          }
        );

        if (orderResponse.status === 201) {
          const orderData = orderResponse.data;
          // Navigate to thank you page
          navigate('/thank-you', {
            state: { order: orderData },
          });
        } else {
          setError(orderResponse.data.error || 'Failed to place the order.');
        }
      } else {
        setError(paymentData.error || 'Failed to process payment.');
      }
    } catch (error) {
      setError('An error occurred during payment processing.');
      console.error('Error:', error);
    }
  };

  return (
    <div className="payment-container">
      <h2 className="payment-title">Payment Page</h2>
      {error && <p className="error-message">{error}</p>}

      {/* Payment Method */}
      <div className="customer-details">
        <div className="form-group">
          <label htmlFor="payment-method">Payment Method:</label>
          <select
            id="payment-method"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="payment-method-select"
          >
            <option value="credit_card">Credit Card</option>
            <option value="UPI">UPI</option>
            <option value="bank_transfer">Bank Transfer</option>
          </select>
        </div>

        {/* Delivery Address */}
        <div className="form-group">
          <label htmlFor="delivery-address">Delivery Address:</label>
          <input
            id="delivery-address"
            type="text"
            placeholder="Enter Delivery Address"
            value={deliveryAddress}
            onChange={(e) => setDeliveryAddress(e.target.value)}
            required
          />
        </div>

        {/* Transaction ID (non-editable) */}
        <div className="form-group">
          <label htmlFor="transaction-id">Transaction ID:</label>
          <input
            id="transaction-id"
            type="text"
            value={transactionId}
            disabled
          />
        </div>
      </div>

      {/* Product Details for Multiple Products */}
      <div className="product-item">
        <h3>Product Details</h3>
        {cartItems.map((product) => (
          <div key={product.product} className="product-details">
            <span>{product.product_name}</span>
            <span>Price: ₹{Number(product.price_at_addition).toFixed(2)}</span>
            
            <div className="form-group">
              <label htmlFor={`quantity-${product.product}`}>Quantity:</label>
              <input
                id={`quantity-${product.product}`}
                type="number"
                min="1"
                value={quantities.find(q => q.productId === product.product)?.quantity || 1}
                onChange={(e) => handleQuantityChange(product.product, parseInt(e.target.value, 10))}
                className="quantity-input"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Total Amount */}
      <div className="total-amount">
        <h3>Total Amount: ₹{totalAmount.toFixed(2)}</h3>
      </div>

      {/* Buy Now Button */}
      <button onClick={handleConfirmPurchase} className="buy-now-button">
        Buy Now
      </button>
    </div>
  );
};

export default MultiProdPayment;