
import "./MainPage.css"; 

const MainPageView = ({ coins, user }) => {
  return (
    <div className="main-container">
   
      <div className="welcome-section">
         <span className="anim-coin">₿</span> Hoş Geldiniz, {user?.displayName || 'Yatırımcı'}
      </div>

      <div className="stats-container">
        <div className="stat-card">
          <span className="stat-label">Toplam Piyasa Değeri</span>
          <span className="stat-value">$2.41 Trilyon</span>
          <span className="stat-change up">+1.2%</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">24s İşlem Hacmi</span>
          <span className="stat-value">$85.4 Milyar</span>
          <span className="stat-change down">-5.4%</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">BTC Dominansı</span>
          <span className="stat-value">52.4%</span>
          <span className="stat-change up">+0.3%</span>
        </div>
      </div>


      <div className="crypto-table-container">
        <table className="crypto-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Coin</th>
              <th>Fiyat</th>
              <th>24s Değişim</th>
              <th>Piyasa Değeri</th>
            </tr>
          </thead>
          <tbody>
            {coins?.map((coin, index) => (
              <tr key={coin.id} className="coin-row" onClick={() => window.location.href=`/coin/${coin.id}`}>
                <td>{index + 1}</td>
                <td>
                  <div className="coin-info-cell">
                    <img src={coin.image} alt={coin.name} />
                    <div>
                      <div className="coin-name">{coin.name}</div>
                      <div className="coin-symbol">{coin.symbol?.toUpperCase()}</div>
                    </div>
                  </div>
                </td>
                <td className="price-cell">${coin.current_price?.toLocaleString()}</td>
                <td className={coin.price_change_percentage_24h > 0 ? 'price-up' : 'price-down'}>
                  {coin.price_change_percentage_24h?.toFixed(2)}%
                </td>
                <td>${(coin.market_cap / 1000000000).toFixed(2)}B</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MainPageView;