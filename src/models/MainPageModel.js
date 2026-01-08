import axios from 'axios';

const API_BASE_URL = 'https://api.coingecko.com/api/v3';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
});

class MainPageModel {
  static async getCoins(perPage = 30, page = 1) {
    try {
      const { data } = await api.get('/coins/markets', {
        params: {
          vs_currency: 'usd',
          order: 'market_cap_desc',
          per_page: perPage,
          page: page,
          sparkline: false,
          price_change_percentage: '24h'
        }
      });
      return data;
    } catch (err) {
      console.warn("Market list warning:", err.message);
      return [];
    }
  }
}

export default MainPageModel;