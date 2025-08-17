import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import HeaderView from '../views/HeaderView';

const HeaderController = ({ isLoggedIn, setIsLoggedIn, setIsLoginMode }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    setIsLoginMode(true); // Giriş moduna geri dön
    navigate("/", { replace: true });
  };

  const handleLoginClick = () => {
    setIsLoginMode(true);
    navigate("/");
  };

  const isAuthPage = location.pathname === '/' || location.pathname === '/register';

  // Tüm mantığı ve veriyi HeaderView'a prop olarak gönderiyoruz
  return (
    <HeaderView
      isLoggedIn={isLoggedIn}
      isAuthPage={isAuthPage}
      handleLogout={handleLogout}
      handleLoginClick={handleLoginClick}
      location={location}
    />
  );
};

export default HeaderController;