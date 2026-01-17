import api from '../services/api';

export default class DetailModel {
  static async getCoinDetail(id) {
    if (!id) return null;
    try {
    
      const { data } = await api.get(`/coins/${id}`);
      return data;
    } catch (err) {
      console.warn("Detail warning:", err.message);
      throw err;
    }
  }

  static async getCoinChartData(id, days = 1) {
    if (!id) return null;
    try {
      
      const { data } = await api.get(`/coins/${id}/market_chart`, {
        params: {
          vs_currency: 'usd',
          days: days
        }
      });
      
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