import React from 'react';
import { FaBitcoin } from 'react-icons/fa';
import CardView from './CardView';

const MainPageView = ({ coins, search, setSearch, currentPage, 
  setCurrentPage, totalPages, currentCoins, indexOfFirstCoin, 
  handleNext, handlePrev, isLoading, handleRowClick, handleSearchChange, error }) => {

  // Yükleme durumu kontrolü
  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '80vh', flexDirection: 'column' }}>
        <div className="loader"></div>
        <p className="mt-3 text-white-50">Veriler yükleniyor...</p>
      </div>
    );
  }

  // Hata durumu kontrolü
  if (error) {
    return <div className="text-center py-5 text-danger">{error}</div>;
  }

  // Eğer veri yoksa (ancak hata da yoksa) boş mesajı göster
  if (!coins || coins.length === 0) {
    return <div className="text-center py-5 text-warning">Gösterilecek coin verisi bulunamadı.</div>;
  }

  const topThreeCoins = coins.slice(0, 3);

  return (
    <div className="main-page-wrapper">
      <div className="container-xl mt-5">
        <h4 className="d-flex align-items-center gap-3 welcome-heading">
          <FaBitcoin />
          <span>Hoş Geldiniz!</span>
        </h4>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', justifyContent: 'center', marginBottom: '20px' }}>
          {topThreeCoins.map((coin) => (
            <CardView key={coin.id} coin={coin} />
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', marginBottom: '20px' }}>
          <input
            type="text"
            className="animated-input search-input glass-effect"
            placeholder="Arama..."
            value={search}
            onChange={handleSearchChange}
          />
        </div>

        {/* Masaüstü görünümü için tablo */}
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
                      coin.price_change_percentage_24h > 0
                        ? 'price-change-up'
                        : coin.price_change_percentage_24h < 0
                        ? 'price-change-down'
                        : ''
                    }`}
                  >
                    <td>{indexOfFirstCoin + index + 1}</td>
                    <td className="coin-cell">
                      <span className="coin-symbol">{coin.symbol.toUpperCase()}</span>
                      <span className="coin-name">{coin.name}</span>
                    </td>
                    <td className='price-cell1'>${coin.current_price.toLocaleString()}</td>
                    <td>${coin.market_cap.toLocaleString()}</td>
                    <td
                      className={
                        coin.price_change_percentage_24h > 0
                          ? 'text-success'
                          : coin.price_change_percentage_24h < 0
                          ? 'text-danger'
                          : ''
                      }
                    >
                      {coin.price_change_percentage_24h?.toFixed(2)}%
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Telefon görünümü için kart listesi */}
        <div className="card-list">
          {currentCoins.length === 0 ? (
            <div className="text-center py-5 text-warning">
              Aradığınız kritere uygun coin bulunamadı.
            </div>
          ) : (
            currentCoins.map((coin) => (
              <CardView key={coin.id} coin={coin} onClick={() => handleRowClick(coin.id)} />
            ))
          )}
        </div>

        <div className="pagination-container">
          <button onClick={handlePrev} disabled={currentPage === 1} className="pagination-btn">
            « Geri
          </button>
          <span className="page-number">
            Sayfa {currentPage} / {totalPages}
          </span>
          <button onClick={handleNext} disabled={currentPage === totalPages} className="pagination-btn">
            İleri »
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainPageView;