// Notification.js
import React, { useState, useEffect } from 'react';

const Notification = ({ message, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, 5000); 

    return () => clearTimeout(timeout);
  }, [onClose]);

  const handleClose = () => {
    setIsVisible(false);
    onClose();
  };

  return (
    <>
      {isVisible && (
        <div className="notification">
          <p>{message}</p>
          <button className="close-btn" onClick={handleClose}>
            Close
          </button>
        </div>
      )}
    </>
  );
};

export default Notification;
