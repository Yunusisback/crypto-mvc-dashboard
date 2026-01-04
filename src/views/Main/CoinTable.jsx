

const CoinTable = ({ currentCoins, indexOfFirstCoin, handleRowClick }) => (
  <div className="main-list glass-effect">
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Coin</th>
          <th>Fiyat (USD)</th>
          <th>Market Hacmi</th>
          <th>24h Değişim (%)</th>
        </tr>
      </thead>
      <tbody>
        {currentCoins.length === 0 ? (
          <tr>
            <td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>
              Aradığınız kritere uygun coin bulunamadı.
            </td>
          </tr>
        ) : (
          currentCoins.map((coin, index) => (
            <tr
              key={coin.id}
              onClick={() => handleRowClick(coin.id)}
           
              className={`coin-row ${
                coin.priceChange === 'up' ? 'price-change-up' : 
                coin.priceChange === 'down' ? 'price-change-down' : ''
              }`}
            >
              <td>{indexOfFirstCoin + index + 1}</td>
              <td className="coin-cell">
                <span className="coin-symbol">{coin.symbol.toUpperCase()}</span>
                <span className="coin-name">{coin.name}</span>
              </td>
              <td className='price-cell1'>${coin.current_price.toLocaleString()}</td>
              <td>${coin.market_cap.toLocaleString()}</td>
              <td className={coin.price_change_percentage_24h > 0 ? 'text-success' : 'text-danger'}>
                {coin.price_change_percentage_24h?.toFixed(2)}%
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>
);

export default CoinTable;