import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './AcceptabilityDetails.css';  // Import the CSS file for styles

const AcceptabilityDetails = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const acceptabilityData = location.state?.acceptabilityData;

    if (!acceptabilityData) {
        return <p>No details available</p>;
    }

    return (
        <div className="acceptability-details-container">
            <h2>Order Acceptability Details</h2>
            <h3 className='heading'>Product Breakdown</h3>
            {/* Product Breakdown in a row-wise format */}
            <div className="product-list">

                {acceptabilityData.products.map((product, index) => (
                    <div key={index} className="product-card">
                        <div className="product-info">
                            <h4>{product.name}</h4>
                            <p><strong>Requested Quantity:</strong> {product.requested_quantity}</p>
                            <p><strong>Available Quantity:</strong> {product.available_quantity}</p>
                            <p><strong>Price at Order:</strong> ${product.price_at_order}</p>
                            <p><strong>Total Price at Order:</strong> ${product.total_price_at_order}</p>
                            <p><strong>Current Price:</strong> ${product.current_price}</p>
                            <p><strong>Total Current Price:</strong> ${product.total_current_price}</p>
                            <p><strong>Acceptable:</strong> {product.is_acceptable ? 'Yes' : 'No'}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Acceptability Status and Total Order Details below */}
            <div className="order-details">
                <div className={`acceptability-status ${acceptabilityData.overall_is_acceptable ? 'acceptable' : 'not-acceptable'}`}>
                    {acceptabilityData.overall_is_acceptable ? (
                        <p className="acceptable-status"><span>✔️</span> Order is Acceptable</p>
                    ) : (
                        <p className="not-acceptable-status"><span>❌</span> Order is Not Acceptable</p>
                    )}
                </div>

                <div className="order-summary">
                    <p><strong>Total Order Amount:</strong> ${acceptabilityData.total_order_amount.toFixed(2)}</p>
                    <p><strong>Total Current Amount:</strong> ${acceptabilityData.total_current_amount.toFixed(2)}</p>
                </div>
            </div>

            <button className="back-button" onClick={() => navigate(-1)}>Go Back</button>
        </div>
    );
};

export default AcceptabilityDetails;
