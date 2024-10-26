// src/components/StatusUpdateModal.js
import React from 'react';
import './StatusUpdateModal.css'; // Create a separate CSS file for the modal styling

const StatusUpdateModal = ({ isOpen, closeModal, onUpdateStatus, currentStatus }) => {
  const [selectedStatus, setSelectedStatus] = React.useState(currentStatus);

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const handleUpdate = () => {
    onUpdateStatus(selectedStatus);
    closeModal();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Update Order Status</h2>
        <select value={selectedStatus} onChange={handleStatusChange}>
          <option value="pending">Pending</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <div className="modal-actions">
          <button onClick={handleUpdate}>Update</button>
          <button onClick={closeModal}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default StatusUpdateModal;
