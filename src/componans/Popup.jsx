import React from 'react';

const Popup = ({ message, onClose }) => {
    if (!message) return null;

    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <p>{message}</p>
                <button onClick={onClose}>حسناً</button>
            </div>
        </div>
    );
};

export default Popup;
