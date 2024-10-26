import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';  // Replace useHistory with useNavigate
import { checkOrderAcceptabilityAPI } from '../../../apis/orderapis';
import './AcceptabilityCheckModal.css'; 

const AcceptabilityCheckModal = ({ isOpen, closeModal, products }) => {
  const [loading, setLoading] = useState(false);
  const [acceptabilityData, setAcceptabilityData] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();  // Replace useHistory with useNavigate

  useEffect(() => {
    if (isOpen && products.length > 0) {
      checkAcceptability();
    }
  }, [isOpen, products]);

  const checkAcceptability = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await checkOrderAcceptabilityAPI({ products });
      setAcceptabilityData(response);
    } catch (err) {
      setError('Failed to check order acceptability.');
    }
    setLoading(false);
  };

  const handleCheckDetails = () => {
    navigate('/admin/acceptability-details', { state: { acceptabilityData } });  // Pass acceptabilityData to the next page
  };

  if (!isOpen) return null;

  return (
    <div className="acceptability-modal">
      <div className="modal-content">
        <h3>Order Acceptability</h3>

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : (
          <>
            {acceptabilityData ? (
              <>
                <div className="acceptability-status">
                  {acceptabilityData.overall_is_acceptable ? (
                    <p className="acceptable"><span>✔️</span> Order can be accepted</p>
                  ) : (
                    <p className="not-acceptable"><span>❌</span> Order cannot be accepted</p>
                  )}
                </div>
                <div className="order-amounts">
                  <p><strong>Total Order Amount:</strong> ${acceptabilityData.total_order_amount.toFixed(2)}</p>
                  <p><strong>Total Current Amount:</strong> ${acceptabilityData.total_current_amount.toFixed(2)}</p>
                </div>
                <button className="check-details-btn" onClick={handleCheckDetails}>Check Details</button>
              </>
            ) : (
              <p>No data available.</p>
            )}
          </>
        )}

        <button className="close-btn" onClick={closeModal}>Close</button>
      </div>
    </div>
  );
};

export default AcceptabilityCheckModal;
