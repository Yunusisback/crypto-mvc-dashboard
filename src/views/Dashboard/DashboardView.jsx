import './Dashboard.css';
import MarketStatsCards from './components/MarketStatsCards';
import TrendingCoins from './components/TrendingCoins';
import TopCoinsTable from './components/TopCoinsTable';
import WatchlistSection from './components/WatchlistSection';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';


const DashboardView = ({
  isLoading,
  error,
  marketStats,
  trendingCoins,
  topCoins,
  watchlistCoins,
  onCoinClick,
  onRefresh
}) => {
  if (isLoading && !marketStats) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={onRefresh} />;
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">
            <span className="crypto-icon">₿</span> Crypto Dashboard
          </h1>
          <p className="dashboard-subtitle">Piyasa genel görünümü ve trendler</p>
        </div>
        <button onClick={onRefresh} className="refresh-btn" disabled={isLoading}>
          <span className={`refresh-icon ${isLoading ? 'spinning' : ''}`}>🔄</span>
          Yenile
        </button>
      </div>

      <MarketStatsCards stats={marketStats} />

      <div className="dashboard-grid">
        <div className="dashboard-section">
          <TrendingCoins coins={trendingCoins} onCoinClick={onCoinClick} />
        </div>

        <div className="dashboard-section">
          <WatchlistSection coins={watchlistCoins} onCoinClick={onCoinClick} />
        </div>
      </div>

      <div className="dashboard-section full-width">
        <TopCoinsTable coins={topCoins} onCoinClick={onCoinClick} />
      </div>
    </div>
  );
};

export default DashboardView;