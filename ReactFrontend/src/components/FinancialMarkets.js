import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from 'chart.js';
import 'chartjs-adapter-date-fns';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

const FinancialDashboard = () => {
  const [marketData, setMarketData] = useState([
    {
      name: 'S&P 500',
      value: 6229.98,
      change: -49.37,
      changePercent: -0.79,
      color: '#ef4444',
      data: generateMockData(30, 6280, 'down')
    },
    {
      name: 'Dow 30',
      value: 44406.36,
      change: -422.17,
      changePercent: -0.94,
      color: '#ef4444',
      data: generateMockData(30, 44800, 'down')
    },
    {
      name: 'Nasdaq',
      value: 20412.52,
      change: -188.59,
      changePercent: -0.92,
      color: '#ef4444',
      data: generateMockData(30, 20600, 'down')
    },
    {
      name: 'Russell 2000',
      value: 2214.23,
      change: -34.81,
      changePercent: -1.55,
      color: '#ef4444',
      data: generateMockData(30, 2250, 'down')
    },
    {
      name: 'VIX',
      value: 17.79,
      change: 0.31,
      changePercent: 1.77,
      color: '#10b981',
      data: generateMockData(30, 17.5, 'up')
    },
    {
      name: 'Gold',
      value: 3346.40,
      change: 3.50,
      changePercent: 0.10,
      color: '#10b981',
      data: generateMockData(30, 3340, 'up')
    }
  ]);

  function generateMockData(points, baseValue, trend) {
    const data = [];
    let currentValue = baseValue;
    const now = new Date();
    
    for (let i = points - 1; i >= 0; i--) {
      const timestamp = new Date(now.getTime() - i * 15 * 60 * 1000); // 15-minute intervals
      const volatility = baseValue * 0.002; // 0.2% volatility
      const trendFactor = trend === 'up' ? 0.0005 : -0.0005;
      
      currentValue += (Math.random() - 0.5) * volatility + trendFactor * baseValue;
      data.push({
        x: timestamp,
        y: currentValue
      });
    }
    
    return data;
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        enabled: false
      }
    },
    scales: {
      x: {
        display: false,
        type: 'time',
        time: {
          unit: 'minute'
        }
      },
      y: {
        display: false
      }
    },
    elements: {
      point: {
        radius: 0
      },
      line: {
        borderWidth: 1.5,
        tension: 0.1
      }
    },
    interaction: {
      intersect: false
    }
  };

  const createChartData = (data, color) => ({
    datasets: [{
      data: data,
      borderColor: color,
      backgroundColor: 'transparent',
      fill: false
    }]
  });

  const formatNumber = (num) => {
    return num.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  const formatChange = (change, percent) => {
    const sign = change >= 0 ? '+' : '';
    return `${sign}${change.toFixed(2)} (${sign}${percent.toFixed(2)}%)`;
  };

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMarketData(prevData => 
        prevData.map(item => {
          const volatility = item.value * 0.001; // 0.1% volatility
          const randomChange = (Math.random() - 0.5) * volatility;
          const newValue = Math.max(0, item.value + randomChange);
          const changeFromBase = newValue - (item.value - item.change);
          const changePercent = (changeFromBase / (item.value - item.change)) * 100;
          
          // Update chart data
          const newData = [...item.data];
          newData.shift(); // Remove first point
          newData.push({
            x: new Date(),
            y: newValue
          });
          
          return {
            ...item,
            value: newValue,
            change: changeFromBase,
            changePercent: changePercent,
            color: changeFromBase >= 0 ? '#10b981' : '#ef4444',
            data: newData
          };
        })
      );
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
   <div className="bg-gray-900 text-white p-6 min-h-screen">
  {/* Grid now has 3 rows, 2 columns */}
  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-6xl mx-auto">
    {marketData.map((item, index) => (
      <div key={index} className="bg-black rounded-lg p-4 relative overflow-hidden">
        <div className="mb-3">
          <h3 className="text-blue-400 text-base font-medium mb-2">{item.name}</h3>
          <div className="text-xl font-bold text-white mb-2">
            {formatNumber(item.value)}
          </div>
          <div className={`text-sm font-medium ${item.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {formatChange(item.change, item.changePercent)}
          </div>
        </div>

        <div className="h-16 w-full mt-3">
          <Line 
            data={createChartData(item.data, item.color)}
            options={chartOptions}
          />
        </div>

        {/* Dotted background grid */}
        <div className="absolute inset-0 pointer-events-none opacity-30">
          <div className="w-full h-full" style={{
            backgroundImage: `radial-gradient(circle, #374151 0.5px, transparent 0.5px)`,
            backgroundSize: '12px 12px',
            backgroundPosition: '0 0'
          }}></div>
        </div>

        {/* Subtle border */}
        <div className="absolute inset-0 border border-gray-700 rounded-lg pointer-events-none"></div>
      </div>
    ))}
  </div>

  <div className="mt-8 text-center text-gray-400 text-sm">
    <p>Real-time market data simulation • Updates every 3 seconds</p>
    <p className="mt-2">Connect to your yfinance API for live data</p>
  </div>
</div>

  );
};

export default FinancialDashboard;