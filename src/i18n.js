import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const enTranslations = {
 
  home: "Home",
  dashboard: "Dashboard",
  markets: "Markets",
  news: "News Feed",
  wallet: "Wallet & Balance",
  swap: "Quick Swap",
  history: "Transactions",
  settings: "Settings",
  help: "Support Center",
  logout: "Logout",
  profile: "Profile",
  

  main_platform: "MAIN PLATFORM",
  financial_assets: "FINANCIAL ASSETS",
  preferences: "PREFERENCES",

 
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


  search_placeholder: "Search assets, transactions or reports...",
  weekly_analysis: "Weekly Analysis",
  portfolio_ai_title: "Manage Portfolio with",
  portfolio_ai_subtitle: "AI",
  portfolio_ai_desc: "Analyze market movements in advance and manage your assets efficiently.",
  start_analysis: "Start Analysis",
  more_info: "More Info",
  portfolio_performance: "Portfolio Performance",
  portfolio_change_desc: "Asset change in last 7 days",
  watchlist: "My Watchlist",
  all_markets: "All Markets",
  watchlist_empty: "Your watchlist looks empty.",
  add_coin: "Add Coin",
  my_account: "My Account",
  notifications: "Notifications",
  change_language: "Change Language",

 
  top_coins: "Top Coins",
  total_market_cap: "Total Market Cap",
  v24h_volume: "24h Volume",
  btc_dominance: "BTC Dominance",
  active_cryptos: "Active Cryptos",
  loading: "Loading...",
  error: "Error",
  retry: "Retry",
  

  price: "Price",
  change: "Change",
  market_cap: "Market Cap",
  current_price: "Current Price",
  "24h_change": "24h Change",
  added_to_watchlist: "Added to watchlist!",
  removed_from_watchlist: "Removed from watchlist",
  watchlist_add_hint: "Add coins you want to track",

 
  wallets: "Wallets",
  add: "Add",
  total_assets: "Total Assets",
  buy: "Buy",
  sell: "Sell",
  transfer: "Transfer",
  recent_transactions: "Recent Transactions",
  view_all: "View All",
  transaction_buy: "Buy",
  transaction_sell: "Sell",
  transaction_expense: "Expense",
  transaction_deposit: "Deposit",
  

  card_holder: "Card Holder",
  valid: "VALID",
  thru: "THRU",
};

const trTranslations = {

  home: "Anasayfa",
  dashboard: "Kontrol Paneli",
  markets: "Piyasalar",
  news: "Haber Akışı",
  wallet: "Cüzdan & Bakiye",
  swap: "Hızlı Takas",
  history: "İşlem Geçmişi",
  settings: "Ayarlar",
  help: "Destek Merkezi",
  logout: "Çıkış Yap",
  profile: "Profilim",

  main_platform: "ANA PLATFORM",
  financial_assets: "FİNANSAL VARLIKLAR",
  preferences: "TERCİHLER",

 
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


  search_placeholder: "Varlık, işlem veya rapor ara...",
  weekly_analysis: "Haftalık Analiz",
  portfolio_ai_title: "Portföyünüzü",
  portfolio_ai_subtitle: "Yapay Zeka ile Yönetin",
  portfolio_ai_desc: "Piyasa hareketlerini önceden analiz edin ve varlıklarınızı en verimli şekilde değerlendirin.",
  start_analysis: "Analizi Başlat",
  more_info: "Daha Fazla Bilgi",
  portfolio_performance: "Portföy Performansı",
  portfolio_change_desc: "Son 7 günlük varlık değişimi",
  watchlist: "İzleme Listem",
  all_markets: "Tüm Piyasalar",
  watchlist_empty: "Listeniz henüz boş görünüyor.",
  add_coin: "Coin Ekle",
  my_account: "Hesabım",
  notifications: "Bildirimler",
  change_language: "Dili Değiştir",

  top_coins: "Top Coinler",
  total_market_cap: "Toplam Piyasa Değeri",
  v24h_volume: "24s Hacim",
  btc_dominance: "BTC Dominansı",
  active_cryptos: "Aktif Kripto",
  loading: "Yükleniyor...",
  error: "Hata",
  retry: "Tekrar Dene",


  price: "Fiyat",
  change: "Değişim",
  market_cap: "Piyasa Değeri",
  current_price: "Güncel Fiyat",
  "24h_change": "24s Değişim",
  added_to_watchlist: "İzleme listesine eklendi!",
  removed_from_watchlist: "İzleme listesinden çıkarıldı",
  watchlist_add_hint: "Takip etmek istediğiniz coinleri ekleyin",

  wallets: "Cüzdanlar",
  add: "Ekle",
  total_assets: "Toplam Varlık",
  buy: "Satın Al",
  sell: "Satış Yap",
  transfer: "Transfer",
  recent_transactions: "Son İşlemler",
  view_all: "Tümü",
  transaction_buy: "Alış",
  transaction_sell: "Satış",
  transaction_expense: "Harcama",
  transaction_deposit: "Yatırma",

  card_holder: "KART SAHİBİ",
  valid: "VALID", 
  thru: "THRU",
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