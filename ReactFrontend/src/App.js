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
import Homepage from './components/Homepage';
import AboutMe from './components/AboutMe';
ChartJS.register(CandlestickController, CandlestickElement);

function App (){
  return (
    <div className='app'>

      <nav className='nav'>
        <Link to="/home" className='nav-item'>Home Page</Link>
        <Link to="/about-me" className='nav-item'>About Me</Link>
      </nav>

      <Routes>
      <Route path='/home' element={<Homepage/>}/>
      <Route path='/about-me' element={<AboutMe/>}/>
      </Routes>

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