import React from 'react';
import './registrationPopup.css'; // Create a separate CSS file for this component

const RegistrationPopup = ({ message, onClose }) => {
  return (
    <div className="popup-overlay">
      <div className={message.eventtype == true ? "popup-box-success" : "popup-box-failure"}>
        <h3>{message.title}</h3>
        <p>{message.content}</p>
        <button className={message.eventtype == true ? "popup-button-success" : "popup-button-failure"} onClick={onClose}>
          {message.buttonText || 'Close'}
        </button>
      </div>
    </div>
  );
};

export default RegistrationPopup;
