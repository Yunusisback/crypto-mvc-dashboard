

const StatsGrid = ({ coin }) => {
  const data = [
    { label: "Piyasa Sırası", value: `#${coin.market_cap_rank}` },
    { label: "Güncel Fiyat", value: `$${coin.market_data.current_price.usd.toLocaleString()}` },
    { label: "24s Değişim", value: `%${coin.market_data.price_change_percentage_24h.toFixed(2)}`, 
      color: coin.market_data.price_change_percentage_24h > 0 ? '#00ff88' : '#ff4d4d' },
    { label: "Market Hacmi", value: `$${(coin.market_data.market_cap.usd / 1e9).toFixed(2)}B` }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
      {data.map((item, index) => (
        <div key={index} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #222' }}>
          <span style={{ color: '#888', fontSize: '0.9rem' }}>{item.label}</span>
          <span style={{ color: item.color || '#fff', fontWeight: 'bold' }}>{item.value}</span>
        </div>
      ))}
    </div>
  );
};

export default StatsGrid;