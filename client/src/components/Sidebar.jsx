// src/components/Sidebar.js
import React from 'react';
import logo from '../assets/Icon.png';
import '../style/Sidebar.css';
import bin_icon from '../assets/bin_icon.png';
import tick_icon from '../assets/tick_icon.png';
import star_icon from '../assets/star_icon.png';



function Sidebar() {
  return (
    <div className="Sidebar">
      <h2 className="logo">
        <img src={logo} alt="Logo" className="logo-image" /> 
        TO-DO
      </h2>
      <ul className="menu">
        <li className="menu-item">
          <img src={tick_icon} alt="Logo" className="logo-image" /> 
          Tasks
        </li>
        <li className="menu-item">
          <img src={star_icon} alt="Logo" className="logo-image" /> 
          Important
        </li>
        <li className="menu-item">
          <img src={bin_icon} alt="Logo" className="logo-image" /> 
          Completed
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
