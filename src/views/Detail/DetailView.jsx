import "./DetailView.css";
import ChartSection from "./ChartSection";
import CoinInfo from "./CoinInfo";
import StatsGrid from "./StatsGrid";
import { useGlobal } from "../../context/GlobalContext";
import LoadingSpinner from "../components/LoadingSpinner";



const DetailView = ({ coinData, chartData, days, setDays }) => {
  const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useGlobal();

  if (!coinData) return <LoadingSpinner message="Coin detayları yükleniyor..." />;

  const inWatchlist = isInWatchlist(coinData.id);

  const handleWatchlistToggle = () => {
    if (inWatchlist) {
      removeFromWatchlist(coinData.id);
    } else {
      addToWatchlist(coinData.id);
    }
  };

  return (
    <div className="detail-container">
     
      <div className="detail-header-actions">
        <button 
          className={`watchlist-toggle-btn ${inWatchlist ? 'active' : ''}`}
          onClick={handleWatchlistToggle}
        >
          <span className="watchlist-icon">{inWatchlist ? '⭐' : '☆'}</span>
          {inWatchlist ? 'İzleme Listesinde' : 'İzleme Listesine Ekle'}
        </button>
      </div>

      <div className="detail-grid">
     
        <div className="detail-sidebar">
          <CoinInfo coin={coinData} />
          <StatsGrid coin={coinData} />
        </div>

      
        <div className="detail-main-area">
          <ChartSection 
            chartData={chartData} 
            days={days} 
            setDays={setDays} 
            coinName={coinData.name}
          />
        </div>
      </div>
    </div>
  );
};

export default DetailView;