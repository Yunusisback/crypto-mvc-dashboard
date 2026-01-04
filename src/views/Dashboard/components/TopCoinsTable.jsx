import millify from 'millify';
import { useGlobal } from '../../../context/GlobalContext';


const TopCoinsTable = ({ coins, onCoinClick }) => {
  const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useGlobal();

  return (
    <div className="top-coins-section">
      <div className="section-header">
        <h2 className="section-title">
          <span className="chart-icon">📈</span> Top 10 Coinler
        </h2>
        <span className="section-badge">Piyasa Değerine Göre</span>
      </div>

      <div className="table-container">
        <table className="coins-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Coin</th>
              <th>Fiyat</th>
              <th>24s Değişim</th>
              <th>7g Değişim</th>
              <th>Piyasa Değeri</th>
              <th>Hacim (24s)</th>
              <th>İzle</th>
            </tr>
          </thead>
          <tbody>
            {coins.map((coin, index) => (
              <tr key={coin.id} className="coin-row">
                <td className="rank-cell">{index + 1}</td>
                
                <td className="coin-cell" onClick={() => onCoinClick(coin.id)}>
                  <img src={coin.image} alt={coin.name} className="coin-image" />
                  <div className="coin-info">
                    <div className="coin-name">{coin.name}</div>
                    <div className="coin-symbol">{coin.symbol.toUpperCase()}</div>
                  </div>
                </td>

                <td className="price-cell" onClick={() => onCoinClick(coin.id)}>
                  ${coin.current_price.toLocaleString()}
                </td>

                <td 
                  className={`change-cell ${coin.price_change_percentage_24h >= 0 ? 'positive' : 'negative'}`}
                  onClick={() => onCoinClick(coin.id)}
                >
                  <span className="change-arrow">
                    {coin.price_change_percentage_24h >= 0 ? '↑' : '↓'}
                  </span>
                  {Math.abs(coin.price_change_percentage_24h || 0).toFixed(2)}%
                </td>

                <td 
                  className={`change-cell ${(coin.price_change_percentage_7d_in_currency || 0) >= 0 ? 'positive' : 'negative'}`}
                  onClick={() => onCoinClick(coin.id)}
                >
                  <span className="change-arrow">
                    {(coin.price_change_percentage_7d_in_currency || 0) >= 0 ? '↑' : '↓'}
                  </span>
                  {Math.abs(coin.price_change_percentage_7d_in_currency || 0).toFixed(2)}%
                </td>

                <td className="market-cap-cell" onClick={() => onCoinClick(coin.id)}>
                  ${millify(coin.market_cap)}
                </td>

                <td className="volume-cell" onClick={() => onCoinClick(coin.id)}>
                  ${millify(coin.total_volume)}
                </td>

                <td className="action-cell">
                  <button
                    className={`watchlist-btn ${isInWatchlist(coin.id) ? 'active' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      isInWatchlist(coin.id) 
                        ? removeFromWatchlist(coin.id) 
                        : addToWatchlist(coin.id);
                    }}
                  >
                    {isInWatchlist(coin.id) ? '⭐' : '☆'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopCoinsTable;