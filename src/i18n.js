
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {

      
      "home": "Home",
      "dashboard": "Dashboard",
      "markets": "Markets",
      "logout": "Logout",
      "login": "Login",
      "register": "Register",
      
    
      "email": "E-Mail",
      "age": "Age",
      "password": "Password",
      "confirm-password": "Confirm Password",
      "login-heading": "Login",
      "register-heading": "Register",
      
     
      "market-overview": "Market Overview",
      "trending-coins": "Trending Coins",
      "watchlist": "My Watchlist",
      "top-coins": "Top Coins",
      "total-market-cap": "Total Market Cap",
      "24h-volume": "24h Volume",
      "btc-dominance": "BTC Dominance",
      "active-cryptos": "Active Cryptos",
      
     
      "loading": "Loading...",
      "error": "Error",
      "retry": "Retry",
      "refresh": "Refresh",
      "search": "Search",
      "price": "Price",
      "change": "Change",
      "market-cap": "Market Cap",
      "volume": "Volume",
      "rank": "Rank",
      
     
      "added-to-watchlist": "Added to watchlist!",
      "removed-from-watchlist": "Removed from watchlist",
      "error-loading-data": "Error loading data",
    }
  },
  tr: {
    translation: {
      
      "home": "Anasayfa",
      "dashboard": "Dashboard",
      "markets": "Piyasalar",
      "logout": "Çıkış Yap",
      "login": "Giriş Yap",
      "register": "Kaydol",
      
    
      "email": "E-Mail",
      "age": "Yaş",
      "password": "Şifre",
      "confirm-password": "Şifre Onay",
      "login-heading": "Giriş Yap",
      "register-heading": "Kaydol",
      
     
      "market-overview": "Piyasa Genel Görünümü",
      "trending-coins": "Trend Coinler",
      "watchlist": "İzleme Listem",
      "top-coins": "Top Coinler",
      "total-market-cap": "Toplam Piyasa Değeri",
      "24h-volume": "24s Hacim",
      "btc-dominance": "BTC Dominansı",
      "active-cryptos": "Aktif Kripto",
      
      
      "loading": "Yükleniyor...",
      "error": "Hata",
      "retry": "Tekrar Dene",
      "refresh": "Yenile",
      "search": "Ara",
      "price": "Fiyat",
      "change": "Değişim",
      "market-cap": "Piyasa Değeri",
      "volume": "Hacim",
      "rank": "Sıra",
      
   
      "added-to-watchlist": "İzleme listesine eklendi!",
      "removed-from-watchlist": "İzleme listesinden çıkarıldı",
      "error-loading-data": "Veriler yüklenirken hata oluştu",
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "tr", 
    detection: {
      order: ['queryString', 'cookie', 'localStorage', 'navigator'],
    },
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;