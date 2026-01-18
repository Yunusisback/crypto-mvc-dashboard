import { useMemo } from 'react';
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend);

// Rastgele veri oluşturma fonksiyonu
const generateChartData = (period) => {
  let count = 50;
  let startPrice = 64000;
  let volatility = 300;
  let labels = [];
  
  switch(period) {
    case '1D': count = 96; volatility = 150; for(let i=0; i<count; i++) labels.push(`${Math.floor(i/4)}:${(i%4)*15}`.replace(':0', ':00')); break;
    case '1W': count = 84; volatility = 400; for(let i=0; i<count; i++) labels.push(i % 12 === 0 ? `Gün ${Math.floor(i/12)+1}` : ''); break;
    case '1M': count = 90; volatility = 800; for(let i=0; i<count; i++) labels.push(i % 15 === 0 ? `${Math.floor(i/3)+1}. Gün` : ''); break;
    case '1Y': count = 120; volatility = 1200; for(let i=0; i<count; i++) labels.push(i % 10 === 0 ? `Ay ${Math.floor(i/10)+1}` : ''); break;
    case 'ALL': count = 150; volatility = 2000; startPrice = 15000; for(let i=0; i<count; i++) labels.push(''); break;
    default: count = 50;
  }

  let data = [startPrice];
  for (let i = 1; i < count; i++) {
    const change = (Math.random() - 0.48) * volatility;
    let newPrice = data[i - 1] + change;
    data.push(Math.round(newPrice));
  }
  return { labels, data };
};

// Bakiye Grafiği Bileşeni
const BalanceChart = ({ period = '1W' }) => {
  const currentData = useMemo(() => generateChartData(period), [period]);

  const data = useMemo(() => ({
    labels: currentData.labels,
    datasets: [
      {
        fill: true,
        label: 'Değer',
        data: currentData.data,
        borderColor: '#FACC15', 
        borderWidth: 2,
        tension: 0.3, 
        pointRadius: 0,
        pointHitRadius: 20, 
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 300);
          gradient.addColorStop(0, 'rgba(250, 204, 21, 0.2)');
          gradient.addColorStop(1, 'rgba(250, 204, 21, 0)');
          return gradient;
        },
        pointHoverRadius: 6,
        pointHoverBackgroundColor: '#FACC15',
        pointHoverBorderColor: '#000',
        pointHoverBorderWidth: 2,
      },
    ],
  }), [currentData]);

  const options = {
    responsive: true,
    maintainAspectRatio: false, 
    plugins: {
      legend: { display: false },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: 'rgba(20, 20, 20, 0.95)',
        titleColor: '#9CA3AF',
        bodyColor: '#FACC15',
        borderColor: 'rgba(255,255,255,0.1)',
        borderWidth: 1,
        padding: 12,
        displayColors: false,
        titleFont: { size: 12 },
        bodyFont: { size: 16, weight: 'bold', family: 'monospace' },
        callbacks: {
          label: (context) => `$${context.raw.toLocaleString()}`,
          title: () => ''
        }
      },
    },
    scales: {
      x: { display: false },
      y: {
        position: 'right',
        grid: { 
          color: 'rgba(255, 255, 255, 0.05)', 
          drawBorder: false,
        },
        ticks: { 
          color: '#525252', 
          font: { size: 10, weight: '600', family: 'monospace' }, 
          maxTicksLimit: 5,
          callback: (value) => `$${value/1000}k` 
        },
        border: { display: false }
      }
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false
    },
    animation: { duration: 800, easing: 'easeOutQuart' }
  };

  return (
    
    <div className="relative h-full w-full select-none">
      <Line data={data} options={options} />
    </div>
  );
};

export default BalanceChart;