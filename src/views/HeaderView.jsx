import React from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; 
import './HeaderView.css';



const HeaderView = ({ isLoggedIn, setIsLoggedIn, setIsLoginMode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t, i18n } = useTranslation(); 

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    setIsLoginMode(true);
    navigate("/", { replace: true });
  };

  const handleLoginClick = () => {
    setIsLoginMode(true);
    navigate("/");
  };
  
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const isAuthPage = location.pathname === '/' || location.pathname === '/register';

  return (
    <header className="header-container glass-effect">
      {!isAuthPage && (
        <Link className="logo-link" to={isLoggedIn ? "/home" : "/"}>
          <img height={40} src="/coin-logo.png" alt="logo" />
          <h3 className="logo-title">
            <span className="anim-coin">Coin</span>
            <span className="anim-vault">Vault</span>
          </h3>
        </Link>
      )}

      {/* Navigasyon ve butonlar */}
      <nav className="header-nav">
        {/* Dil Seçeneği Butonları */}
        {isAuthPage && (
          <div className="language-selector">
            <button
              onClick={() => changeLanguage('tr')}
              className={`lang-btn ${i18n.language === 'tr' ? 'active-lang' : ''}`}
            >
              TR
            </button>
            <button
              onClick={() => changeLanguage('en')}
              className={`lang-btn ${i18n.language === 'en' ? 'active-lang' : ''}`}
            >
              EN
            </button>
          </div>
        )}

        {!isAuthPage && isLoggedIn && location.pathname !== "/home" && (
          <NavLink className="home-button" to={"/home"}>
            🏠 {t('home')}
          </NavLink>
        )}

        {!isAuthPage && !isLoggedIn && location.pathname !== '/' && (
          <button onClick={handleLoginClick} className="login-button">
            {t('login')}
          </button>
        )}

        {!isAuthPage && isLoggedIn && (
          <button onClick={handleLogout} className="logout-button">
            {t('logout')}
          </button>
        )}
      </nav>
    </header>
  );
};

export default HeaderView;