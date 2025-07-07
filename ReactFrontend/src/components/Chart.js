import React, { useEffect, useState, useCallback } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LinearScale, TimeScale, PointElement, LineElement, Tooltip, Legend, CategoryScale } from 'chart.js';
import { Chart as ReactChart } from 'react-chartjs-2';
import { CandlestickController, CandlestickElement } from 'chartjs-chart-financial';
import 'chartjs-adapter-date-fns';
import crosshairPlugin from 'chartjs-plugin-crosshair';
// ChartJS.register(crosshairPlugin);

// Register chart types with error handling
try {
  ChartJS.register(
    crosshairPlugin,
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
  console.log('Chart.js plugins registered successfully');
} catch (error) {
  console.error('Error registering Chart.js plugins:', error);
}

function Chart() {
  const [ticker, setTicker] = useState('GOOG');
  const [latest, setLatest] = useState(null);
  const [chartType, setChartType] = useState('line');
  const [period, setPeriod] = useState('1d');
  const [lineData, setLineData] = useState({ labels: [], data: [] });
  const [ohlcData, setOhlcData] = useState([]);
  const [error, setError] = useState(null);
  const [debugInfo, setDebugInfo] = useState('');

  // Fetch stock data from Flask API
  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:8000/price/${ticker}?period=${period}`);
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Fetch error');

      setLatest(data.latest);
      setLineData({ labels: data.timestamps, data: data.prices });

      // Debug: Log the raw OHLC data
      console.log('Raw OHLC data from server:', data.ohlc);

      // Format OHLC data with extensive debugging
      const formattedOhlc = data.ohlc.map((item, index) => {
        const formatted = {
          x: new Date(item.x).getTime(),
          o: parseFloat(item.o),
          h: parseFloat(item.h),
          l: parseFloat(item.l),
          c: parseFloat(item.c),
        };
        
        // Debug first few items
        if (index < 3) {
          console.log(`OHLC item ${index}:`, {
            original: item,
            formatted: formatted,
            dateCheck: new Date(item.x),
            isValidDate: !isNaN(new Date(item.x))
          });
        }
        
        return formatted;
      });

      setOhlcData(formattedOhlc);
      setDebugInfo(`Loaded ${formattedOhlc.length} OHLC data points`);
      setError(null);
      
      // Log formatted data
      console.log('Formatted OHLC data:', formattedOhlc.slice(0, 5));
      
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err.message);
      setLineData({ labels: [], data: [] });
      setOhlcData([]);
      setDebugInfo('');
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

  // Simplified candlestick chart setup
  // const candleChartData = {
  //   datasets: [
  //     {
  //       label: `${ticker} OHLC`,
  //       data: ohlcData,
  //       // Simplified color setup
  //       borderColor: '#00ff99',
  //       backgroundColor: '#00ff9933',
  //       borderWidth: 1,
  //     },
  //   ],
  // };
const candleChartData = {
  datasets: [
    {
      label: `${ticker} OHLC`,
      data: ohlcData,
      borderColor: ohlcData.map(d => (d.c > d.o ? '#26a69a' : '#ef5350')), // teal / red
      backgroundColor: ohlcData.map(d => (d.c > d.o ? '#26a69a' : '#ef5350')),
      borderWidth: 1,
    },
  ],
};

  // Test data as fallback
  const testCandleData = {
    datasets: [
      {
        label: 'Test Candles',
        data: [
          { x: Date.now() - 4 * 60 * 60 * 1000, o: 100, h: 110, l: 90, c: 105 },
          { x: Date.now() - 3 * 60 * 60 * 1000, o: 105, h: 115, l: 100, c: 108 },
          { x: Date.now() - 2 * 60 * 60 * 1000, o: 108, h: 118, l: 103, c: 112 },
          { x: Date.now() - 1 * 60 * 60 * 1000, o: 112, h: 120, l: 108, c: 115 },
        ],
        borderColor: '#00ff99',
        backgroundColor: '#00ff9933',
      },
    ],
  };

  // Enhanced chart options
  const candlestickOptions = {
    responsive: true,
    plugins: {
      legend: { 
        labels: { color: '#fff' },
        display: true 
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        callbacks: {
          label: function(context) {
            const data = context.parsed;
            if (data && typeof data === 'object' && data.o !== undefined) {
              return [
                `Open: $${data.o.toFixed(2)}`,
                `High: $${data.h.toFixed(2)}`,
                `Low: $${data.l.toFixed(2)}`,
                `Close: $${data.c.toFixed(2)}`
              ];
            }
            return `Value: $${data}`;
          }
        }
      }
    },
    scales: {
      x: {
        type: 'time',
        time: {
          unit: period === '1d' || period === '5d' ? 'hour' : 'day',
        },
        ticks: { color: '#ccc' },
        title: {
          display: true,
          text: 'Time',
          color: '#ccc'
        }
      },
      y: {
        ticks: { color: '#ccc' },
        title: {
          display: true,
          text: 'Price ($)',
          color: '#ccc'
        }
      },
    },
  };

  // Common chart config for line charts
const commonOptions = {
  responsive: true,
  backgroundColor: '#000',
  plugins: {
    legend: { display: false },
    tooltip: {
      mode: 'index',
      intersect: false,
      backgroundColor: '#111',
      titleColor: '#fff',
      bodyColor: '#ddd',
      borderColor: '#333',
      borderWidth: 1,
    },
    crosshair: {
  line: {
    color: '#888',
    width: 1,
  },
  sync: {
    enabled: false,
  },
  zoom: {
    enabled: false,
  },
},

  },
  scales: {
    x: {
      type: 'time',
      time: {
        unit: period === '1d' || period === '5d' ? 'hour' : 'day',
      },
      ticks: { color: '#888', font: { size: 10 } },
      grid: {
        color: 'rgba(255, 255, 255, 0.05)',
        borderColor: '#333',
      },
    },
    y: {
      ticks: { color: '#888', font: { size: 10 } },
      grid: {
        color: 'rgba(255, 255, 255, 0.05)',
        borderColor: '#333',
      },
    },
  },
  layout: {
    padding: {
      left: 8,
      right: 8,
      top: 8,
      bottom: 8,
    },
  },
};


  // Check if candlestick controller is available
  const isCandlestickAvailable = ChartJS.registry.getController('candlestick') !== undefined;

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
          <option value='candlestick' disabled={!isCandlestickAvailable}>
            Candlestick {!isCandlestickAvailable ? '(Not Available)' : ''}
          </option>
          {/* <option value='test-candlestick'>Test Candlestick</option> */}
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

      {/* Debug info
      <div style={{ color: '#ccc', fontSize: '12px', marginBottom: '10px' }}>
        {debugInfo && <div>Debug: {debugInfo}</div>}
        <div>Candlestick Available: {isCandlestickAvailable ? 'Yes' : 'No'}</div>
        <div>OHLC Data Points: {ohlcData.length}</div>
      </div> */}

      <div className='chart-body'>
        {error ? (
          <div className='chart-placeholder'>❌ {error}</div>
        ) : chartType === 'line' ? (
          <Line data={lineChartData} options={commonOptions} />
        ) : chartType === 'test-candlestick' ? (
          <ReactChart 
            type='candlestick' 
            data={testCandleData} 
            options={candlestickOptions}
          />
        ) : chartType === 'candlestick' && isCandlestickAvailable ? (
          <ReactChart 
            type='candlestick' 
            data={candleChartData} 
            options={candlestickOptions}
          />
        ) : (
          <div className='chart-placeholder'>
            Chart type not available. Try selecting "Test Candlestick" to verify the chart library is working.
          </div>
        )}
      </div>
    </div>
  );
}

export default Chart;