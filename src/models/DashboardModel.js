import axios from 'axios';


const API_BASE_URL = 'https://api.coingecko.com/api/v3';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, 
});

//
class DashboardModel {
  static async getGlobalData() {
    try {
      const { data } = await api.get('/global');
      return data.data;
    } catch (err) {
      console.warn("Global data warning:", err.message);
      return null;
    }
  }

  // Trend Olan Coinleri Al
  static async getTrendingCoins() {
    try {
      const { data } = await api.get('/search/trending');
      return data.coins;
    } catch (err) {
      console.warn("Trending data warning:", err.message);
      return [];
    }
  }
  
  // En İyi Coinleri Al
  static async getTopCoins(limit = 10) {
    try {
      const { data } = await api.get('/coins/markets', {
        params: {
          vs_currency: 'usd',
          order: 'market_cap_desc',
          per_page: limit,
          page: 1,
          sparkline: true,
          price_change_percentage: '24h,7d',
        },
      });
      return data;
    } catch (err) {
      console.warn("Top coins warning:", err.message);
      return [];
    }
  }

  // İzleme Listesi Coinlerini Al
  static async getWatchlistCoins(coinIds) {
    if (!coinIds?.length) return [];
    try {
      const { data } = await api.get('/coins/markets', {
        params: {
          vs_currency: 'usd',
          ids: coinIds.join(','),
          order: 'market_cap_desc',
          sparkline: true,
          price_change_percentage: '24h,7d',
        },
      });
      return data;
    } catch (err) {
      return [];
    }
  }

  // Piyasa İstatistiklerini Hesapla
  static calculateMarketStats(globalData) {
    if (!globalData) return null;
    return {
      totalMarketCap: globalData.total_market_cap?.usd ?? 0,
      totalVolume: globalData.total_volume?.usd ?? 0,
      btcDominance: globalData.market_cap_percentage?.btc ?? 0,
      ethDominance: globalData.market_cap_percentage?.eth ?? 0,
      marketCapChange: globalData.market_cap_change_percentage_24h_usd ?? 0,
      activeCryptos: globalData.active_cryptocurrencies ?? 0,
      markets: globalData.markets ?? 0,
    };
  }
}

export default DashboardModel;