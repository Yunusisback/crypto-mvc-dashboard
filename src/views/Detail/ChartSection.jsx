import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement,
  LineElement, Title, Tooltip, Legend, Filler
} from 'chart.js';


ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const ChartSection = ({ chartData, days, setDays, coinName }) => {

  const isValidData = chartData && chartData.datasets && Array.isArray(chartData.datasets);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: { grid: { color: "rgba(255, 255, 255, 0.05)" }, ticks: { color: "#888" } },
      x: { grid: { display: false }, ticks: { color: "#888" } }
    },
    plugins: { 
      legend: { display: false },
      tooltip: {
        backgroundColor: '#1a1a1a',
        titleColor: '#ffd700',
        bodyColor: '#fff',
        borderColor: '#333',
        borderWidth: 1
      }
    }
  };

  const timeButtons = [
    { label: "24 Saat", value: 1 },
    { label: "7 Gün", value: 7 },
    { label: "30 Gün", value: 30 },
    { label: "1 Yıl", value: 365 }
  ];

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h2 style={{ color: "#fff", margin: 0, fontSize: '1.4rem' }}>{coinName} Analizi</h2>
        <div style={{ display: "flex", gap: "8px" }}>
          {timeButtons.map((btn) => (
            <button
              key={btn.value}
              onClick={() => setDays(btn.value)}
              style={{
                padding: "8px 16px",
                borderRadius: "10px",
                border: "1px solid #333",
                background: days === btn.value ? "#ffd700" : "#222",
                color: days === btn.value ? "#000" : "#fff",
                cursor: "pointer",
                fontWeight: "700",
                transition: "all 0.2s ease"
              }}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>
      
      <div style={{ flexGrow: 1, minHeight: "450px", background: '#0f0f0f', borderRadius: '12px', padding: '15px' }}>
        {isValidData ? (
          <Line data={chartData} options={options} />
        ) : (
          <div style={{ color: '#888', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            Grafik verileri hazırlanıyor...
          </div>
        )}
      </div>
    </div>
  );
};

export default ChartSection;