import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const enTranslations = {

  home: "Home",
  dashboard: "Dashboard",
  markets: "Markets",
  logout: "Logout",
  login: "Login",
  register: "Register",
 
  email: "E-Mail",
  age: "Age",
  phone: "Phone",
  password: "Password",
  confirm_password: "Confirm Password",
  login_heading: "Login",
  register_heading: "Register",
  

  no_account: "Don't have an account?",
  has_account: "Already a member?",


  market_overview: "Market Overview",
  trending_coins: "Trending Coins",
  watchlist: "My Watchlist",
  top_coins: "Top Coins",
  total_market_cap: "Total Market Cap",
  v24h_volume: "24h Volume",
  btc_dominance: "BTC Dominance",
  active_cryptos: "Active Cryptos",
  
 
  loading: "Loading...",
  error: "Error",
  retry: "Retry",
  refresh: "Refresh",
  search: "Search",
  price: "Price",
  change: "Change",
  market_cap: "Market Cap",
  volume: "Volume",
  rank: "Rank",
  coin: "Coin",
  coins: "Coins",
  
 
  market_rank: "Market Rank",
  current_price: "Current Price",
  "24h_change": "24h Change",
  

  added_to_watchlist: "Added to watchlist!",
  removed_from_watchlist: "Removed from watchlist",
  error_loading_data: "Error loading data",
  

  watchlist_empty: "Watchlist is empty",
  watchlist_add_hint: "Add coins you want to track",
};

const trTranslations = {

  home: "Anasayfa",
  dashboard: "Panel",
  markets: "Piyasalar",
  logout: "Çıkış Yap",
  login: "Giriş Yap",
  register: "Kaydol",


  email: "E-Posta",
  age: "Yaş",
  phone: "Telefon",
  password: "Şifre",
  confirm_password: "Şifre Onay",
  login_heading: "Giriş Yap",
  register_heading: "Kaydol",


  no_account: "Hesabınız yok mu?",
  has_account: "Zaten üye misiniz?",

  market_overview: "Piyasa Genel Görünümü",
  trending_coins: "Trend Coinler",
  watchlist: "İzleme Listem",
  top_coins: "Top Coinler",
  total_market_cap: "Toplam Piyasa Değeri",
  v24h_volume: "24s Hacim",
  btc_dominance: "BTC Dominansı",
  active_cryptos: "Aktif Kripto",

  
  loading: "Yükleniyor...",
  error: "Hata",
  retry: "Tekrar Dene",
  refresh: "Yenile",
  search: "Ara",
  price: "Fiyat",
  change: "Değişim",
  market_cap: "Piyasa Değeri",
  volume: "Hacim",
  rank: "Sıra",
  coin: "Coin",
  coins: "Coin",

 
  market_rank: "Piyasa Sırası",
  current_price: "Güncel Fiyat",
  "24h_change": "24s Değişim",

  added_to_watchlist: "İzleme listesine eklendi!",
  removed_from_watchlist: "İzleme listesinden çıkarıldı",
  error_loading_data: "Veriler yüklenirken hata oluştu",
  

  watchlist_empty: "İzleme listesi boş",
  watchlist_add_hint: "Takip etmek istediğiniz coinleri ekleyin",
};

const resources = {
  en: { translation: enTranslations },
  tr: { translation: trTranslations }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "tr", 
    supportedLngs: ['en', 'tr'],
    detection: {
      order: ['localStorage', 'cookie', 'navigator'],
      caches: ['localStorage'], 
    },
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;