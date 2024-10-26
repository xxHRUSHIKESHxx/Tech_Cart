import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/payment.css';
import Cookies from 'js-cookie';
import axios from 'axios';

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { product } = location.state || {}; // Destructure product from state
  const [paymentMethod, setPaymentMethod] = useState('credit_card'); // Default payment method
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [billingAddress, setBillingAddress] = useState('123 Default St, Sample City'); // Default billing address
  const [transactionId, setTransactionId] = useState('txn_' + Date.now()); // Auto-generated transaction ID
  const [error, setError] = useState('');
  const [quantity, setQuantity] = useState(1); // Single quantity input
  const [totalAmount, setTotalAmount] = useState(0);
  const user_data = JSON.parse(localStorage.getItem('user'));
  // Update total amount when quantity changes
  useEffect(() => {
    if (product) {
      setTotalAmount(product.price * quantity);
    }
  }, [quantity, product]);

  // Helper function to create a delay
  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  console.log(user_data.id)
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
          user_id: user_data.id, // Replace with actual user ID
          amount: totalAmount, // Total amount calculated based on quantity
          payment_method: paymentMethod, // Selected payment method
          transaction_id: transactionId, // Auto-generated transaction ID
          payment_status: "completed"
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': Cookies.get('authToken'), // JWT token if needed
          },
        }
      );

      const paymentData = paymentResponse.data;
      if (paymentData.payment_status === 'completed') {
        await delay(1000); // 1 second delay

        // Step 2: Place the order after successful payment
        const orderResponse = await axios.post(
          'http://127.0.0.1:8000/api/place-order/',
          {
            shipping_address: deliveryAddress,
            billing_address: billingAddress, // Default or edited billing address
            order_items: [
              {
                product_id: product.id,
                quantity: quantity,
              },
            ],
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
            onChange={(e) => setTransactionId(e.target.value)}
            disabled
          />
        </div>
      </div>

      {/* Product Details */}
      <div className="product-item">
        <h3>Product Details</h3>
        <span>{product.name}</span>
        <span>Price: ${Number(product.price).toFixed(2)}</span>

        <div className="form-group">
          <label htmlFor="quantity">Quantity:</label>
          <input
            id="quantity"
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
            className="quantity-input"
          />
        </div>
      </div>

      {/* Total Amount */}
      <div className="total-amount">
        <h3>Total Amount: ${totalAmount.toFixed(2)}</h3>
      </div>

      {/* Buy Now Button */}
      <button onClick={handleConfirmPurchase} className="buy-now-button">
        Buy Now
      </button>
    </div>

  );
};

export default Payment;
