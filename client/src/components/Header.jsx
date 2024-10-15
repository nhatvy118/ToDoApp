// src/components/Header.js
import React from 'react';
import setting_icon from '../assets/setting_icon.png';
import '../style/Header.css';

function Header() {
  return (
    <div className="header">
      <div className="header-content">
        <img src={setting_icon} alt="Settings" className="setting_icon" />
      </div>
    </div>
  );
}

export default Header;
