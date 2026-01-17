import api from '../services/api'; 

const DashboardModel = {

  // Global Piyasa Verileri
  getGlobalData: async () => {
    try {
      const response = await api.get('/global');
      return response.data.data;
    } catch (error) {
      console.error("Global veri hatası:", error);
      return null;
    }
  },

  // Trend Olan Coinler
  getTrendingCoins: async () => {
    try {
      const response = await api.get('/search/trending');
      return response.data.coins.map(coin => coin.item);
    } catch (error) {
      console.error("Trend coin hatası:", error);
      return [];
    }
  },

  // Top Coinler 
  getTopCoins: async (limit = 20) => {
    try {
      const response = await api.get('/coins/markets', {
        params: {
          vs_currency: 'usd',
          order: 'market_cap_desc',
          per_page: limit,
          page: 1,
          sparkline: true,
          price_change_percentage: '24h'
        }
      });
      return response.data;
    } catch (error) {
      console.error("Top coin hatası:", error);
      return [];
    }
  },

  // Watchlist veya Portföy için ID ye göre coin çekme
  getWatchlistCoins: async (coinIds) => {
    if (!coinIds || coinIds.length === 0) return [];
    try {
      const response = await api.get('/coins/markets', {
        params: {
          vs_currency: 'usd',
          ids: coinIds.join(','),
          order: 'market_cap_desc',
          sparkline: true,
          price_change_percentage: '24h'
        }
      });
      return response.data;
    } catch (error) {
      console.error("Watchlist coin hatası:", error);
      return [];
    }
  },

  // Market İstatistiklerini Hesaplama Helperı
  calculateMarketStats: (data) => {
    if (!data) return null;
    return {
      marketCap: data.total_market_cap.usd,
      volume: data.total_volume.usd,
      btcDominance: data.market_cap_percentage.btc,
      activeCoins: data.active_cryptocurrencies
    };
  },

 
  // Bu fonksiyon önce arama yapar  sonra bulunan coinlerin fiyat verisini çeker
  searchCoinsWithPrice: async (query) => {
    if (!query || query.length < 3) return []; 
    try {

     
      const searchResponse = await api.get('/search', { params: { query } });
      
      // İlk 5 sonucu alıyoruz
      const foundCoins = searchResponse.data.coins.slice(0, 5);

      if (foundCoins.length === 0) return [];

      //  Bulunan coinlerin ID lerini topla
      const coinIds = foundCoins.map(c => c.id);

      // Fiyat verilerini çek
      const pricesResponse = await api.get('/coins/markets', {
        params: {
          vs_currency: 'usd',
          ids: coinIds.join(','),
          order: 'market_cap_desc',
          sparkline: false,
          price_change_percentage: '24h'
        }
      });
      
      return pricesResponse.data;
    } catch (error) {
      console.error("Search API error:", error);
      return [];
    }
  }
};

export default DashboardModel;