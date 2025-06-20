import React from 'react';
import './Header.css';

const Header = () => (
  <header className="header">
    <h1>Good morning, James!</h1>
    <div className="header-icons">
      <span>📅</span>
      <span>🔔</span>
      <img src="https://via.placeholder.com/32" alt="Profile" className="avatar" />
    </div>
  </header>
);

export default Header;
