//App.js
import React from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Chart from './components/Chart';
import Positions from './components/Positions';
import RecentOrders from './components/RecentOrders';
import './styles.css';
import { CandlestickController, CandlestickElement } from 'chartjs-chart-financial';
import { Chart as ChartJS } from 'chart.js';
import {Route, Routes, Link} from 'react-router-dom';

ChartJS.register(CandlestickController, CandlestickElement);

function App (){
  return (
    <div className='app'>
      <Header/>

      <div className="main">
        <Sidebar/>

        <div id='chart'>
          <Chart/>
        </div>

        <div className='right-panel'>
          <div id='positions'><Positions/></div>
          <div id='orders'><RecentOrders/></div>
          
          
        </div>

      </div>
    </div>
  );
}
export default App;