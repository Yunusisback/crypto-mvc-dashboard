import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';


const resources = {
  en: {
    translation: {
      "home": "Home",
      "logout": "Logout",
      "login": "Login",
      "register": "Register",
      "main-page": "Main Page",
      "email": "E-Mail",
      "age": "Age",
      "password": "Password",
      "confirm-password": "Confirm Password",
      "login-heading": "Login",
      "register-heading": "Register"
    }
  },
  tr: {
    translation: {
      "home": "Anasayfa",
      "logout": "Çıkış Yap",
      "login": "Giriş Yap",
      "register": "Kaydol",
      "main-page": "Ana Sayfa",
      "email": "E-Mail",
      "age": "Yaş",
      "password": "Şifre",
      "confirm-password": "Şifre Onay",
      "login-heading": "Giriş Yap",
      "register-heading": "Kaydol"
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