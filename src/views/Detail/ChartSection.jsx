import { useMemo } from "react";
import { Line } from "react-chartjs-2";
import { useTranslation } from "react-i18next";
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement,
  LineElement, Title, Tooltip, Legend, Filler
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const ChartSection = ({ chartData, days, setDays, coinName }) => {
  const { t } = useTranslation();

  const options = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'rgba(18, 18, 18, 0.9)',
        titleColor: '#FFD700',
        bodyColor: '#fff',
        borderColor: 'rgba(255,255,255,0.1)',
        borderWidth: 1,
        padding: 12,
        displayColors: false,
      }
    },
    scales: {
      y: { 
        grid: { color: "rgba(255, 255, 255, 0.03)" }, 
        ticks: { color: "#666", font: { size: 11 } },
        position: 'right'
      },
      x: { 
        grid: { display: false }, 
        ticks: { display: false } 
      }
    },
  }), []);

  const timeButtons = [
    { label: "24S", value: 1 },
    { label: "7G", value: 7 },
    { label: "30G", value: 30 },
    { label: "1Y", value: 365 },
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
           <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
           Fiyat Analizi
        </h2>
        
        <div className="flex bg-black/40 p-1 rounded-xl border border-white/5">
          {timeButtons.map((btn) => (
            <button
              key={btn.value}
              onClick={() => setDays(btn.value)}
              className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all duration-300 ${
                days === btn.value 
                  ? "bg-yellow-400 text-black shadow-lg" 
                  : "text-gray-500 hover:text-white"
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>
      
      <div className="grow min-h-100 w-full relative">

         
        <div className="absolute inset-0 bg-yellow-400/5 blur-3xl pointer-events-none rounded-full transform scale-75"></div>
        {chartData ? (
          <Line data={chartData} options={options} />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">Veri yükleniyor...</div>
        )}
      </div>
    </div>
  );
};

export default ChartSection;