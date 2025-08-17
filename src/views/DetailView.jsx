import React, { useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  Title, 
  Tooltip, 
  Legend,
  Filler
} from 'chart.js';
import CrosshairPlugin from 'chartjs-plugin-crosshair';

// Grafik çizmek için chart js eklentilerinii aktif hale getiriyoruz
ChartJS.register(
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  Title, 
  Tooltip, 
  Legend, 
  CrosshairPlugin,
  Filler
);

const DetailPageView = ({ coinData, chartData, loading, error, timeRange, onTimeRangeChange }) => {
  // Zaman aralığı etiketlerini türkçe olarak tanımlıyoruz
  const timeRangeLabels = {
    '24s': '24 Saat',
    '7g': '7 Gün', 
    '30g': '30 Gün',
    '1y': '1 Yıl'
  };

  // Yükleme devam ediyorsa geliştirilmiş spinner gösterelim
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loader"></div>
        <p style={{ color: '#ffd700', marginTop: '20px', fontSize: '1.1rem' }}>
          Coin verileri yükleniyor...
        </p>
      </div>
    );
  }

  // Hata durumunda modern hata mesajı
  if (error) {
    return (
      <div className="coin-detail-container">
        <div className="glass-effect" style={{ textAlign: 'center', padding: '3rem' }}>
          <div style={{ color: '#ff4444', fontSize: '3rem', marginBottom: '1rem' }}>⚠️</div>
          <h2 style={{ color: '#ff4444', marginBottom: '1rem' }}>Hata Oluştu</h2>
          <p style={{ color: '#fff', opacity: 0.8 }}>{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="pagination-btn"
            style={{ marginTop: '1rem' }}
          >
            Tekrar Dene
          </button>
        </div>
      </div>
    );
  }

  // Eğer veri yoksa veya yanlış gelmişse hata mesajı
  if (!coinData || !chartData || !Array.isArray(chartData.prices)) {
    return (
      <div className="coin-detail-container">
        <div className="glass-effect" style={{ textAlign: 'center', padding: '3rem' }}>
          <div style={{ color: '#ffd700', fontSize: '3rem', marginBottom: '1rem' }}>📊</div>
          <h2 style={{ color: '#ffd700', marginBottom: '1rem' }}>Veri Bulunamadı</h2>
          <p style={{ color: '#fff', opacity: 0.8 }}>
            Coin verileri şu anda mevcut değil. Lütfen daha sonra tekrar deneyin.
          </p>
        </div>
      </div>
    );
  }

  // Grafik verilerini memoize ediyoruz (performans için)
  const chartConfig = useMemo(() => {
    const prices = chartData.prices;
    const labels = prices.map(price => {
      const date = new Date(price[0]);
      return timeRange === '24s' ? 
        date.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }) :
        date.toLocaleDateString('tr-TR', { day: '2-digit', month: '2-digit' });
    });

    const priceValues = prices.map(price => price[1]);
    
    // Minimum ve maksimum fiyatları buluyoruz gradient için
    const minPrice = Math.min(...priceValues);
    const maxPrice = Math.max(...priceValues);
    
    // Fiyat değişimine göre ana rengi belirliyoruz
    const firstPrice = priceValues[0];
    const lastPrice = priceValues[priceValues.length - 1];
    const isPositive = lastPrice >= firstPrice;
    
    // Gradient renkleri
    const gradientColors = isPositive ? 
      ['rgba(76, 175, 80, 0.8)', 'rgba(76, 175, 80, 0.1)'] : 
      ['rgba(244, 67, 54, 0.8)', 'rgba(244, 67, 54, 0.1)'];
    
    const borderColor = isPositive ? '#4CAF50' : '#F44336';

    return {
      labels,
      datasets: [{
        label: `${coinData.name} Fiyatı`,
        data: priceValues,
        borderColor: borderColor,
        backgroundColor: (context) => {
          const chart = context.chart;
          const {ctx, chartArea} = chart;
          if (!chartArea) return null;
          
          const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
          gradient.addColorStop(0, gradientColors[0]);
          gradient.addColorStop(1, gradientColors[1]);
          return gradient;
        },
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 8,
        pointHoverBackgroundColor: '#ffd700',
        pointHoverBorderColor: '#fff',
        pointHoverBorderWidth: 2,
        hoverBorderWidth: 4,
      }]
    };
  }, [chartData, coinData.name, timeRange]);

  // Geliştirilmiş grafik ayarları
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: { 
        display: false 
      },
      tooltip: {
        enabled: true,
        mode: 'index',
        intersect: false,
        backgroundColor: 'rgba(17, 17, 17, 0.95)',
        titleColor: '#ffd700',
        bodyColor: '#fff',
        borderColor: '#ffd700',
        borderWidth: 2,
        cornerRadius: 12,
        displayColors: false,
        titleFont: {
          size: 14,
          weight: 'bold'
        },
        bodyFont: {
          size: 16,
          weight: '600'
        },
        padding: 12,
        callbacks: {
          title: function(context) {
            return context[0].label;
          },
          label: function(context) {
            return `$${context.parsed.y.toLocaleString('tr-TR', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 6
            })}`;
          }
        }
      },
      crosshair: {
        line: { 
          color: '#ffd700', 
          width: 2,
          dashPattern: [5, 5]
        },
        sync: { enabled: false },
        zoom: { enabled: false }
      }
    },
    scales: {
      x: {
        grid: { 
          display: false 
        },
        border: {
          color: 'rgba(255, 215, 0, 0.3)'
        },
        ticks: {
          color: '#fff',
          font: { 
            size: 12, 
            weight: '500' 
          },
          maxRotation: 0,
          maxTicksLimit: timeRange === '24s' ? 12 : 8,
          padding: 10
        }
      },
      y: {
        grid: { 
          color: 'rgba(255, 255, 255, 0.08)',
          lineWidth: 1
        },
        border: {
          color: 'rgba(255, 215, 0, 0.3)'
        },
        ticks: {
          color: '#fff',
          font: { 
            size: 12, 
            weight: '500' 
          },
          padding: 15,
          callback: function(value) {
            return '$' + value.toLocaleString('tr-TR', {
              minimumFractionDigits: value < 1 ? 4 : 0,
              maximumFractionDigits: value < 1 ? 6 : 0
            });
          }
        }
      }
    },
    animation: {
      duration: 2000,
      easing: 'easeInOutQuart'
    }
  };

  // Fiyat değişim yüzdesini hesaplıyoruz
  const priceChange24h = coinData.market_data.price_change_percentage_24h;
  const priceChangeClass = priceChange24h >= 0 ? 'positive' : 'negative';
  const priceChangeIcon = priceChange24h >= 0 ? '📈' : '📉';

  return (
    <div className="coin-detail-container page-animate">
      {/* Coin başlığı ve fiyat bilgisi */}
      <div className="coin-header glass-effect">
        <div className="coin-title">
          <img 
            src={coinData.image.large} 
            alt={coinData.name} 
            className="coin-logo"
            style={{ 
              borderRadius: '50%', 
              border: '3px solid rgba(255, 215, 0, 0.3)',
              boxShadow: '0 0 20px rgba(255, 215, 0, 0.3)'
            }} 
          />
          <div>
            <h1 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '15px' }}>
              <span className="coin-name">{coinData.name}</span>
              <span className="coin-symbol">{coinData.symbol.toUpperCase()}</span>
            </h1>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '10px', 
              marginTop: '10px',
              fontSize: '1rem',
              opacity: 0.8
            }}>
              <span>Piyasa Sırası: #{coinData.market_cap_rank}</span>
              <span>{priceChangeIcon}</span>
              <span className={priceChangeClass}>
                %{Math.abs(priceChange24h).toFixed(2)}
              </span>
            </div>
          </div>
          <div className="coin-price" style={{ 
            textAlign: 'right',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end'
          }}>
            <div style={{ fontSize: '2.2rem', fontWeight: 'bold' }}>
              ${coinData.market_data.current_price.usd.toLocaleString('tr-TR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 6
              })}
            </div>
            <div className={`${priceChangeClass}`} style={{ fontSize: '1.1rem', marginTop: '5px' }}>
              ${Math.abs(coinData.market_data.price_change_24h).toLocaleString('tr-TR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 6
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Zaman aralığı butonları */}
      <div className="time-range-buttons">
        {Object.entries(timeRangeLabels).map(([range, label]) => (
          <button
            key={range}
            className={`time-btn ${timeRange === range ? 'active' : ''}`}
            onClick={() => onTimeRangeChange(range)}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Grafik */}
      <div className="chart-container glass-effect">
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '20px'
        }}>
          <h3 style={{ 
            color: '#ffd700', 
            margin: 0,
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            📊 Fiyat Grafiği
            <span style={{ 
              fontSize: '0.9rem', 
              color: '#aaa',
              fontWeight: 'normal'
            }}>
              ({timeRangeLabels[timeRange]})
            </span>
          </h3>
        </div>
        <div style={{ height: '100%', minHeight: '350px' }}>
          <Line data={chartConfig} options={options} />
        </div>
      </div>

      {/* Coin istatistikleri */}
      <div className="coin-stats glass-effect">
        <h2 className="stats-title">
          <span className="anim-coin">📈</span>
          <span className="anim-coin">Piyasa</span> 
          <span className="anim-vault">İstatistikleri</span>
        </h2>
        <div className="stats-grid">
          <div className="stat-item">
            <span className="stat-label">💰 Market Değeri</span>
            <span className="stat-value">
              ${coinData.market_data.market_cap.usd.toLocaleString()}
            </span>
          </div>
          <div className="stat-item">
            <span className="stat-label">📊 24s İşlem Hacmi</span>
            <span className="stat-value">
              ${coinData.market_data.total_volume.usd.toLocaleString()}
            </span>
          </div>
          <div className="stat-item">
            <span className="stat-label">🔄 Dolaşımdaki Arz</span>
            <span className="stat-value">
              {coinData.market_data.circulating_supply?.toLocaleString() || 'Belirtilmemiş'} {coinData.symbol.toUpperCase()}
            </span>
          </div>
          <div className="stat-item">
            <span className="stat-label">📈 24s Değişim</span>
            <span className={`stat-value ${priceChangeClass}`}>
              {priceChange24h > 0 ? '+' : ''}{priceChange24h.toFixed(2)}%
            </span>
          </div>
          <div className="stat-item">
            <span className="stat-label">🏆 En Yüksek Fiyat</span>
            <span className="stat-value">
              ${coinData.market_data.ath.usd.toLocaleString()}
            </span>
          </div>
          <div className="stat-item">
            <span className="stat-label">📅 ATH Tarihi</span>
            <span className="stat-value" style={{ fontSize: '1rem' }}>
              {new Date(coinData.market_data.ath_date.usd).toLocaleDateString('tr-TR')}
            </span>
          </div>
          <div className="stat-item">
            <span className="stat-label">🔢 Maksimum Arz</span>
            <span className="stat-value">
              {coinData.market_data.max_supply?.toLocaleString() || '♾️ Sınırsız'}
            </span>
          </div>
          <div className="stat-item">
            <span className="stat-label">🏅 Piyasa Sırası</span>
            <span className="stat-value" style={{ color: '#ffd700' }}>
              #{coinData.market_cap_rank}
            </span>
          </div>
          {coinData.market_data.price_change_percentage_7d && (
            <div className="stat-item">
              <span className="stat-label">📅 7g Değişim</span>
              <span className={`stat-value ${
                coinData.market_data.price_change_percentage_7d >= 0 ? 'positive' : 'negative'
              }`}>
                {coinData.market_data.price_change_percentage_7d > 0 ? '+' : ''}
                {coinData.market_data.price_change_percentage_7d.toFixed(2)}%
              </span>
            </div>
          )}
          {coinData.market_data.price_change_percentage_30d && (
            <div className="stat-item">
              <span className="stat-label">📆 30g Değişim</span>
              <span className={`stat-value ${
                coinData.market_data.price_change_percentage_30d >= 0 ? 'positive' : 'negative'
              }`}>
                {coinData.market_data.price_change_percentage_30d > 0 ? '+' : ''}
                {coinData.market_data.price_change_percentage_30d.toFixed(2)}%
              </span>
            </div>
          )}
          {coinData.market_data.price_change_percentage_1y && (
            <div className="stat-item">
              <span className="stat-label">🗓️ 1y Değişim</span>
              <span className={`stat-value ${
                coinData.market_data.price_change_percentage_1y >= 0 ? 'positive' : 'negative'
              }`}>
                {coinData.market_data.price_change_percentage_1y > 0 ? '+' : ''}
                {coinData.market_data.price_change_percentage_1y.toFixed(2)}%
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Son Güncelleme Bilgisi */}
      <div style={{ 
        textAlign: 'center', 
        marginTop: '2rem', 
        padding: '1rem',
        color: '#888',
        fontSize: '0.9rem'
      }}>
        📅 Son güncelleme: {new Date(coinData.last_updated).toLocaleString('tr-TR')}
      </div>
    </div>
  );
};

export default DetailPageView;