// DialogAddTask.jsx
import React from 'react';
import '../style/DialogAddTask.css';

function DialogAddTask({ onClose }) {
  return (
    <div className="dialog-container">
      <h2 className="dialog-title">Create Todo</h2>
      <input
        type="text"
        placeholder="Task name"
        className="dialog-input"
      />
      <textarea
        placeholder="Add description"
        className="dialog-textarea"
      />
      <button className="dialog-button">Create</button>
      <button className="dialog-close-button" onClick={onClose}>
        Close
      </button>
    </div>
  );
}

export default DialogAddTask;