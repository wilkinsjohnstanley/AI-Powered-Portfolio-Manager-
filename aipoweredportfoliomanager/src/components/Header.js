import React from 'react'

const Header = () => {
  return (
    <header className='header'>
      <div className="market-status">Stock and options marketts will be closed on July 4</div>
      <div className='logo'>📈 Stock Picker</div>
      <div className="header-actions">
        <button>🔔</button>
        <button>👤</button>
      </div>
    </header>
  );
}

export default Header
