

const TrendingCoins = ({ coins, onCoinClick }) => {
  return (
    <div className="trending-section">
      <div className="section-header">
        <h2 className="section-title">
          <span className="fire-icon">🔥</span> Trend Coinler
        </h2>
        <span className="section-badge">Popüler</span>
      </div>

      <div className="trending-list">
        {coins.slice(0, 7).map((item, index) => {
          const coin = item.item;
          return (
            <div
              key={coin.id}
              className="trending-item"
              onClick={() => onCoinClick(coin.id)}
            >
              <div className="trending-rank">#{index + 1}</div>
              <img src={coin.small} alt={coin.name} className="trending-image" />
              <div className="trending-info">
                <div className="trending-name">{coin.name}</div>
                <div className="trending-symbol">{coin.symbol}</div>
              </div>
              <div className="trending-score">
                <span className="score-label">Skor:</span>
                <span className="score-value">{coin.score + 1}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TrendingCoins;