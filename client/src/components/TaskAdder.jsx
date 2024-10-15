// src/components/TaskAdder.js
import React from 'react';
import plus_icon from '../assets/plus.png';
import '../style/TaskAdder.css';
import { useState } from 'react';

const TaskAdder = ({ onClick }) => {
  return (
    <div className="task-adder">
      <button className="add-task-btn" onClick={onClick}>
        <img src={plus_icon} alt="Add Task" className="plus-icon" />   
      </button>
    </div>
  );
};

export default TaskAdder;

