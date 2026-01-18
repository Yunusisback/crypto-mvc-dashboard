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
        backgroundColor: 'rgba(10, 10, 10, 0.95)',
        titleColor: '#FFD700',
        bodyColor: '#fff',
        borderColor: 'rgba(255,255,255,0.1)',
        borderWidth: 1,
        padding: 14,
        cornerRadius: 12,
        displayColors: false,
        titleFont: { size: 14, weight: 'bold', family: 'Inter' },
        bodyFont: { family: 'monospace', size: 13 }
      }
    },
    scales: {
      y: { 
        grid: { color: "rgba(255, 255, 255, 0.02)" }, 
        ticks: { color: "#555", font: { size: 10, family: 'monospace', weight: 'bold' } },
        position: 'right',
        border: { display: false }
      },
      x: { 
        grid: { display: false }, 
        ticks: { display: false },
        border: { display: false }
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
    <div className="glass-panel rounded-4xl p-6 md:p-8 border border-white/5 relative overflow-hidden flex flex-col h-full shadow-2xl select-none">
      
       {/* Dekoratif Arka Plan Işığı */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-400/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/2"></div>

      {/* Header Kısmı */}
      <div className="flex flex-row justify-between items-center mb-8 relative z-10">
        <div>
           <h2 className="text-xl font-bold text-white flex items-center gap-3">
             <span className="relative flex h-3 w-3">
               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
               <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 shadow-[0_0_10px_#10B981]"></span>
             </span>
             Fiyat Performansı
           </h2>
           <p className="text-xs font-medium text-gray-500 mt-1 pl-6">
             {coinName} için son {days === 1 ? '24 Saatlik' : days + ' Günlük'} grafik verileri
           </p>
        </div>
        
        {/* Süre Butonları */}
        <div className="flex bg-bg-dark p-1.5 rounded-xl border border-white/10 shadow-inner">
          {timeButtons.map((btn) => (
            <button
              key={btn.value}
              onClick={() => setDays(btn.value)}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all duration-300 ${
                days === btn.value 
                  ? "bg-white/10 text-yellow-400 shadow-lg border border-white/5 shadow-yellow-400/10" 
                  : "text-gray-500 hover:text-white hover:bg-white/5"
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>
      
      {/* Grafik Alanı */}
      <div className="w-full h-96 md:h-112.5 relative z-10">
        {chartData ? (
          <Line data={chartData} options={options} />
        ) : (
          <div className="flex items-center justify-center h-full">
              <div className="flex flex-col items-center gap-4">
                 <div className="relative w-12 h-12">
                    <div className="absolute inset-0 border-4 border-white/5 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-t-yellow-400 rounded-full animate-spin"></div>
                 </div>
                 <span className="text-gray-500 text-sm font-medium tracking-wide animate-pulse">Grafik Verisi Çekiliyor...</span>
              </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChartSection;