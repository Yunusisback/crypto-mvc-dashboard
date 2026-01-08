import { useNavigate, useLocation } from 'react-router-dom';
import { useCallback, useMemo } from 'react';
import HeaderView from '../views/Header/HeaderView';

const HeaderController = ({ isLoggedIn, setIsLoggedIn, setIsLoginMode }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Çıkış işlemini hafızaya alıyoruz 
  const handleLogout = useCallback(() => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    setIsLoginMode(true);
    navigate("/", { replace: true });
  }, [navigate, setIsLoggedIn, setIsLoginMode]);

  // Login butonu tıklama işlemi
  const handleLoginClick = useCallback(() => {
    setIsLoginMode(true);
    navigate("/");
  }, [navigate, setIsLoginMode]);


  const isAuthPage = useMemo(() => {
    return location.pathname === '/' || location.pathname === '/register';
  }, [location.pathname]);

  return (
    <HeaderView
      isLoggedIn={isLoggedIn}
      isAuthPage={isAuthPage}
      handleLogout={handleLogout}
      handleLoginClick={handleLoginClick}
      location={location}
      setIsLoginMode={setIsLoginMode} 
    />
  );
};

export default HeaderController;