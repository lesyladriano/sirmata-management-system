import React from "react";

const ConfirmationModal = ({ confirmation, onConfirm }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <p>{confirmation}</p>
        <button onClick={onConfirm}>Continue</button>
      </div>
    </div>
  );
};

export default ConfirmationModal;
