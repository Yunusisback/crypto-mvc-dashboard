import axios from 'axios';


const API_BASE_URL = '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
});

api.interceptors.response.use(
  (response) => response,
  (error) => {

   
    console.warn("API Bağlantı Hatası:", error.response ? error.response.data : error.message);
    return Promise.reject(error);
  }
);


// Cache 
const cache = {
  coins: { data: null, timestamp: 0 },
  global: { data: null, timestamp: 0 },
};
const CACHE_DURATION = 60000; 

export const fetchCoins = async (page = 1, perPage = 100) => {

  // Cache kontrolü
  if (page === 1 && cache.coins.data && (Date.now() - cache.coins.timestamp < CACHE_DURATION)) {
    return cache.coins.data;
  }
  try {
    const response = await api.get('/coins/markets', {
      params: {
        vs_currency: 'usd',
        order: 'market_cap_desc',
        per_page: perPage,
        page: page,
        sparkline: false,
        price_change_percentage: '24h'
      }
    });
    if (page === 1) cache.coins = { data: response.data, timestamp: Date.now() };
    return response.data;
  } catch (error) {
    console.warn("FetchCoins Hatası (Mock Veri Dönülüyor)", error);
    return [];
  }
};

// Global Piyasa Verilerini Getir
export const fetchGlobalMarketData = async () => {
  if (cache.global.data && (Date.now() - cache.global.timestamp < CACHE_DURATION)) {
    return cache.global.data;
  }
  
  try {
    const response = await api.get('/global');
    // CoinGecko bazen yapıyı değiştirir  güvenli erişim sağlayalım
    const data = response.data?.data || {}; 
    
    const formatted = {
      total_market_cap: data.total_market_cap?.usd || 0,
      total_volume: data.total_volume?.usd || 0,
      market_cap_change_percentage_24h_usd: data.market_cap_change_percentage_24h_usd || 0,
      active_cryptocurrencies: data.active_cryptocurrencies || 0
    };
    cache.global = { data: formatted, timestamp: Date.now() };
    return formatted;
  } catch (error) {
    console.error("Global Data Fetch Error:", error);
    return { 
      total_market_cap: 0, 
      total_volume: 0, 
      market_cap_change_percentage_24h_usd: 0, 
      active_cryptocurrencies: 0 
    };
  }
};

// Belirli bir coine ait detayları getir
export const fetchCoinDetail = async (id) => {
  const response = await api.get(`/coins/${id}`, {
    params: { localization: false, tickers: false, market_data: true, community_data: false, developer_data: false, sparkline: true }
  });
  return response.data;
};

// Belirli bir coine ait tarihsel fiyat verilerini getir
export const fetchCoinHistory = async (id, days = 7) => {
  try {
    const response = await api.get(`/coins/${id}/market_chart`, {
      params: { vs_currency: 'usd', days: days }
    });
    return response.data.prices;
  } catch (error) {
    return [];
  }
};

// Arama Fonksiyonu 
export const searchCoins = async (query) => {
  const response = await api.get('/search', {
    params: { query }
  });
  return response.data;
}

export default api;