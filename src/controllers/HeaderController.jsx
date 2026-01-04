import { useNavigate, useLocation } from 'react-router-dom';
import HeaderView from '../views/Header/HeaderView';


const HeaderController = ({ isLoggedIn, setIsLoggedIn, setIsLoginMode }) => {
  const navigate = useNavigate();
  const location = useLocation();

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


  const isAuthPage = location.pathname === '/' || location.pathname === '/register';

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