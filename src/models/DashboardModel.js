import axios from 'axios';

const API_BASE_URL = 'https://api.coingecko.com/api/v3';

class DashboardModel {
  static async getGlobalData() {
    try {
      const response = await axios.get(`${API_BASE_URL}/global`);
      return response.data.data;
    } catch (err) {
      console.error('Global market data fetch error:', err);
      throw err;
    }
  }

  static async getTrendingCoins() {
    try {
      const response = await axios.get(`${API_BASE_URL}/search/trending`);
      return response.data.coins;
    } catch (err) {
      console.error('Trending coins fetch error:', err);
      throw err;
    }
  }

  static async getTopCoins(limit = 10) {
    try {
      const response = await axios.get(`${API_BASE_URL}/coins/markets`, {
        params: {
          vs_currency: 'usd',
          order: 'market_cap_desc',
          per_page: limit,
          page: 1,
          sparkline: true,
          price_change_percentage: '24h,7d'
        }
      });
      return response.data;
    } catch (err) {
      console.error('Top coins fetch error:', err);
      throw err;
    }
  }

  static async getWatchlistCoins(coinIds) {
    if (!coinIds || coinIds.length === 0) return [];
    try {
      const response = await axios.get(`${API_BASE_URL}/coins/markets`, {
        params: {
          vs_currency: 'usd',
          ids: coinIds.join(','),
          order: 'market_cap_desc',
          sparkline: true,
          price_change_percentage: '24h,7d'
        }
      });
      return response.data;
    } catch (err) {
      console.error('Watchlist coins fetch error:', err);
      throw err;
    }
  }

  static calculateMarketStats(globalData) {
    if (!globalData) return null;
    return {
      totalMarketCap: globalData.total_market_cap?.usd || 0,
      totalVolume: globalData.total_volume?.usd || 0,
      btcDominance: globalData.market_cap_percentage?.btc || 0,
      ethDominance: globalData.market_cap_percentage?.eth || 0,
      marketCapChange: globalData.market_cap_change_percentage_24h_usd || 0,
      activeCryptos: globalData.active_cryptocurrencies || 0,
      markets: globalData.markets || 0,
    };
  }
}

export default DashboardModel;