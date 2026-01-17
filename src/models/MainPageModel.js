import api from '../services/api';

class MainPageModel {
  static async getCoins(perPage = 100, page = 1) {
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

 
  static async searchCoins(query) {
     if (!query || query.length < 3) return [];
     try {

       // API den arama yap 
       const { data: { coins } } = await api.get('/search', { params: { query } });
       
       // İlk 20 sonucu al
       const topResults = coins.slice(0, 20); 
       if (!topResults.length) return [];

       const ids = topResults.map(c => c.id).join(',');

       //  Bulunan ID ler için detaylı piyasa verisi çek
       const { data } = await api.get('/coins/markets', {
         params: {
            vs_currency: 'usd',
            ids: ids,
            order: 'market_cap_desc',
            sparkline: false,
            price_change_percentage: '24h'
         }
       });
       return data;
     } catch (err) {
       console.error("MainPage Search Error:", err);
       return [];
     }
  }
}

export default MainPageModel;