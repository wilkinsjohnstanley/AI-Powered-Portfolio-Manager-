import React, { useEffect, useState, useCallback } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LinearScale, TimeScale, PointElement, LineElement, Tooltip, Legend, CategoryScale } from 'chart.js';
import { Chart as ReactChart } from 'react-chartjs-2';
import { CandlestickController, CandlestickElement } from 'chartjs-chart-financial';
import 'chartjs-adapter-date-fns';

// Register chart types
ChartJS.register(
  CandlestickController,
  CandlestickElement,
  LineElement,
  PointElement,
  LinearScale,
  TimeScale,
  CategoryScale,
  Tooltip,
  Legend
);

function Chart() {
  const [ticker, setTicker] = useState('SOXS');
  const [latest, setLatest] = useState(null);
  const [chartType, setChartType] = useState('line');
  const [period, setPeriod] = useState('1d');
  const [lineData, setLineData] = useState({ labels: [], data: [] });
  const [ohlcData, setOhlcData] = useState([]);
  const [error, setError] = useState(null);

  // Fetch stock data from Flask API
  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:8000/price/${ticker}?period=${period}`);
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Fetch error');

      setLatest(data.latest);
      setLineData({ labels: data.timestamps, data: data.prices });
      setOhlcData(data.ohlc);
      setError(null);
    } catch (err) {
      setError(err.message);
      setLineData({ labels: [], data: [] });
      setOhlcData([]);
    }
  }, [ticker, period]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Line chart setup
  const lineChartData = {
    labels: lineData.labels,
    datasets: [
      {
        label: `${ticker} Price`,
        data: lineData.data,
        borderColor: '#00ff99',
        backgroundColor: '#00ff9944',
        tension: 0.2,
        pointRadius: 0,
      },
    ],
  };

  // Candlestick chart setup
  const candleChartData = {
    datasets: [
      {
        label: `${ticker} OHLC`,
        data: ohlcData,
        color: {
          up: '#00ff99',
          down: '#ff4d4d',
          unchanged: '#999999',
        },
      },
    ],
  };

  // Common chart config
  const commonOptions = {
    responsive: true,
    plugins: {
      legend: { labels: { color: '#fff' } },
    },
    scales: {
      x: {
        type: 'time',
        time: {
          unit: period === '1d' || period === '5d' ? 'hour' : 'day',
        },
        ticks: { color: '#ccc' },
      },
      y: {
        ticks: { color: '#ccc' },
      },
    },
  };

  return (
    <div className='chart'>
      <div className='chart-header'>
        <input
          type='text'
          placeholder='Search Ticker...'
          value={ticker}
          onChange={(e) => setTicker(e.target.value.toUpperCase())}
          onKeyDown={(e) => e.key === 'Enter' && fetchData()}
        />
        {latest && <span>${latest.toFixed(2)}</span>}
      </div>

      <div className='chart-controls'>
        <select value={chartType} onChange={(e) => setChartType(e.target.value)}>
          <option value='line'>Line</option>
          <option value='candlestick'>Candlestick</option>
        </select>

        <select value={period} onChange={(e) => setPeriod(e.target.value)}>
          <option value='1d'>1D</option>
          <option value='5d'>5D</option>
          <option value='1mo'>1M</option>
          <option value='6mo'>6M</option>
          <option value='1y'>1Y</option>
          <option value='5y'>5Y</option>
          <option value='max'>All</option>
        </select>
      </div>

      <div className='chart-body'>
        {error ? (
          <div className='chart-placeholder'>❌ {error}</div>
        ) : chartType === 'line' ? (
          <Line data={lineChartData} options={commonOptions} />
        ) : (
          <ReactChart type='candlestick' data={candleChartData} options={commonOptions} />
        )}
      </div>
    </div>
  );
}

export default Chart;
