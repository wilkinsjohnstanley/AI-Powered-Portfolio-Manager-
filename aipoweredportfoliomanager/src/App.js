//App.js
import React from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Chart from './components/Chart';
import Positions from './components/Positions';
import RecentOrders from './components/RecentOrders';
import './styles.css';

function App (){
  return (
    <div className='app'>
      <Header/>
      <div className="main">
        <Sidebar/>
        <Chart/>
        <div className='right-panel'>
          <Positions/>
          <RecentOrders/>
        </div>
      </div>
    </div>
  );
}
export default App;