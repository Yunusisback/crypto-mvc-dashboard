import axios from "axios";

const BASE_URL = "https://api.coingecko.com/api/v3/coins";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
});


export default class DetailModel {
  static async getCoinDetail(id) {
    if (!id) return null;
    try {
      const { data } = await api.get(`/${id}`);
      return data;
    } catch (err) {
      console.warn("Detail warning:", err.message);
      throw err;
    }
  }

  // Coin Grafik Verilerini Al
  static async getCoinChartData(id, days = 1) {
    if (!id) return null;
    try {
      const { data } = await api.get(`/${id}/market_chart`, {
        params: {
          vs_currency: 'usd',
          days: days
        }
      });
      
      // Zaman damgasını okunabilir tarihe dönüştür ve fiyatı biçimlendir
      return data.prices.map(([timestamp, price]) => ({
        date: new Date(timestamp).toLocaleDateString(),
        time: new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        price: price.toFixed(2),
        timestamp
      }));

    } catch (err) {
      console.warn("Chart warning:", err.message);
      return [];
    }
  }
}