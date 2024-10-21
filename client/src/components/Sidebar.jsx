// src/components/Sidebar.js
import React from 'react';
import logo from '../assets/Icon.png';
import '../style/Sidebar.css';
import bin_icon from '../assets/bin_icon.png';
import tick_icon from '../assets/tick_icon.png';
import star_icon from '../assets/star_icon.png';



function Sidebar({onSelect,selectedStatus}) {
  const handleMenuClick = (status) => {
      onSelect(status);
  };
  return (
    <div className="Sidebar">
      <h2 className="logo">
        <img src={logo} alt="Logo" className="logo-image" /> 
        TO-DO
      </h2>
      <ul className="menu">
        <li 
          className={`menu-item ${selectedStatus === 'pending' ? 'active' : ''}`}
          onClick={() => handleMenuClick('pending')}
        >
          <img src={tick_icon} alt="Logo" className="logo-image" /> 
          Tasks
        </li>
        <li 
          className={`menu-item ${selectedStatus === 'important' ? 'active' : ''}`}
          onClick={() => handleMenuClick('important')}
        >
          <img src={star_icon} alt="Logo" className="logo-image" /> 
          Important
        </li>
        <li 
          className={`menu-item ${selectedStatus === 'done' ? 'active' : ''}`}
          onClick={() => handleMenuClick('done')}
        >
          <img src={bin_icon} alt="Logo" className="logo-image" /> 
          Completed
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
