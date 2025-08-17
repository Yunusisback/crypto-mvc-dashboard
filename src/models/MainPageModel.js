import axios from 'axios';

class MainPageModel {
  static async getCoins() {
    try {
      const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
        params: {
          vs_currency: 'usd',
          order: 'market_cap_desc',
          per_page: 30,
          page: 1,
          sparkline: false
        }
      });
      return response.data;
    } catch (err) {
      console.error('API isteği sırasında hata:', err.message || err);
      throw err;

    }
  }
}

export default MainPageModel;