import React from 'react';
import './StatusCard.css';

const StatusCard = () => (
  <div className="status-card">
    <p>Formation status</p>
    <div className="progress-bar">
      <div className="progress" style={{ width: '60%' }}></div>
    </div>
    <small>Estimated processing 4–5 business days</small>
    <button>View status</button>
  </div>
);

export default StatusCard;
