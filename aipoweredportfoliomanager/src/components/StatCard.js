import React from 'react';
import './StatCard.css';

const StatCard = ({ icon, amount, label }) => (
  <div className="card">
    <div className="card-icon">{icon}</div>
    <p className="amount">{amount}</p>
    <p className="label">{label}</p>
  </div>
);

export default StatCard;
