import millify from 'millify';


const MarketStatsCards = ({ stats }) => {
  if (!stats) return null;

  const cards = [
    {
      label: 'Toplam Piyasa Değeri',
      value: `$${millify(stats.totalMarketCap)}`,
      change: stats.marketCapChange,
      icon: '💰',
      color: 'primary'
    },
    {
      label: '24s İşlem Hacmi',
      value: `$${millify(stats.totalVolume)}`,
      icon: '📊',
      color: 'info'
    },
    {
      label: 'BTC Dominansı',
      value: `${stats.btcDominance.toFixed(2)}%`,
      icon: '₿',
      color: 'warning'
    },
    {
      label: 'Aktif Kripto',
      value: millify(stats.activeCryptos),
      icon: '🪙',
      color: 'success'
    }
  ];

  return (
    <div className="market-stats-grid">
      {cards.map((card, index) => (
        <div key={index} className={`stat-card stat-card-${card.color}`}>
          <div className="stat-card-header">
            <span className="stat-icon">{card.icon}</span>
            <span className="stat-label">{card.label}</span>
          </div>
          <div className="stat-value">{card.value}</div>
          {card.change !== undefined && (
            <div className={`stat-change ${card.change >= 0 ? 'positive' : 'negative'}`}>
              {card.change >= 0 ? '↑' : '↓'} {Math.abs(card.change).toFixed(2)}%
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MarketStatsCards;