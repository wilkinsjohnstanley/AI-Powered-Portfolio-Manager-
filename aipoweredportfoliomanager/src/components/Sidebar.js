import React from 'react';
import './Sidebar.css'; // optional

const Sidebar = () => (
  <nav className="sidebar">
    <div className="logo">Applied Kinetics Software Solution</div>
    <ul className="nav-icons">
      <li className="active">🏠</li>
      <li>📊</li>
      <li>🏦</li>
      <li>💼</li>
      <li>✉️</li>
      <li>⚙️</li>
    </ul>
  </nav>
);

export default Sidebar;
