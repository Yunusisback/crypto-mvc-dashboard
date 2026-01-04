import { useGlobal } from '../../../context/GlobalContext';
import millify from 'millify';


const WatchlistSection = ({ coins, onCoinClick }) => {
  const { removeFromWatchlist } = useGlobal();

  if (coins.length === 0) {
    return (
      <div className="watchlist-section">
        <div className="section-header">
          <h2 className="section-title">
            <span className="star-icon">⭐</span> İzleme Listem
          </h2>
        </div>
        <div className="empty-watchlist">
          <div className="empty-icon">📝</div>
          <p className="empty-text">İzleme listesi boş</p>
          <p className="empty-subtext">Takip etmek istediğiniz coinleri ekleyin</p>
        </div>
      </div>
    );
  }

  return (
    <div className="watchlist-section">
      <div className="section-header">
        <h2 className="section-title">
          <span className="star-icon">⭐</span> İzleme Listem
        </h2>
        <span className="section-badge">{coins.length} Coin</span>
      </div>

      <div className="watchlist-grid">
        {coins.map((coin) => (
          <div key={coin.id} className="watchlist-card">
            <button
              className="remove-btn"
              onClick={(e) => {
                e.stopPropagation();
                removeFromWatchlist(coin.id);
              }}
            >
              ×
            </button>

            <div className="watchlist-card-content" onClick={() => onCoinClick(coin.id)}>
              <img src={coin.image} alt={coin.name} className="watchlist-image" />
              
              <div className="watchlist-info">
                <div className="watchlist-name">{coin.name}</div>
                <div className="watchlist-symbol">{coin.symbol.toUpperCase()}</div>
              </div>

              <div className="watchlist-price">
                <div className="price-main">${millify(coin.current_price)}</div>
                <div className={`price-change ${coin.price_change_percentage_24h >= 0 ? 'positive' : 'negative'}`}>
                  {coin.price_change_percentage_24h >= 0 ? '↑' : '↓'} 
                  {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WatchlistSection;