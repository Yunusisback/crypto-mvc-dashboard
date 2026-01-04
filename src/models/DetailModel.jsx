import axios from "axios";

const BASE_URL = "https://api.coingecko.com/api/v3/coins";

export default class DetailModel {

  static async getCoinDetail(id) {
    try {
      const response = await axios.get(`${BASE_URL}/${id}`);
      return response.data;
    } catch (err) {
      console.error("Detay verisi çekilemedi:", err);
    }
  }


  static async getCoinChartData(id, days) {
    try {
      const response = await axios.get(
        `${BASE_URL}/${id}/market_chart?vs_currency=usd&days=${days}`
      );
      return response.data;
    } catch (err) {
      console.error("Grafik verisi çekilemedi:", err);
    }
  }
}