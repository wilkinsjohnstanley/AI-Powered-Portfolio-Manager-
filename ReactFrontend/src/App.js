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
import NewsFeed from './components/NewsFeed';
import CommentSection from './components/CommentSection';
import Footer from './components/Footer';
import FinancialMarkets from './components/FinancialMarkets';
ChartJS.register(CandlestickController, CandlestickElement);

function App (){
  return (
    <div className='app'>
      <Header/>

      <div className="main">
        <Sidebar/>

        <div id='chart'>
          <Chart/> 
          <NewsFeed stockSymbol='GOOG'/>
          <CommentSection/>
       </div>

        <div className='right-panel'>
          {/* <div id='positions'><Positions/></div>
          <div id='orders'><RecentOrders/></div>
          <div id='financial-markets'>
            <FinancialMarkets/>
           </div>
           */}
           
          
        </div>

      </div>
      <Footer/>
    </div>
  );
}
export default App;