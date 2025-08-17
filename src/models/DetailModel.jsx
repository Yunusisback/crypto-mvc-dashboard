export default class DetailModel {
  static async getCoinDetail(id) {
    const response = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`);
    

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'API yanıtı okunamadı.' }));
      throw new Error(`API Hatası: ${response.status} - ${errorData.error || response.statusText}`);
    }

    return response.json();
  }

  static async getMarketData(id, days = 30) {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}`
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'API yanıtı okunamadı.' }));
      throw new Error(`API Hatası: ${response.status} - ${errorData.error || response.statusText}`);
    }
    return response.json();
  }
}