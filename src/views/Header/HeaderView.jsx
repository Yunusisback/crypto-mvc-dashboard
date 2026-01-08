import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useGlobal } from '../../context/GlobalContext';
import { useState, useRef, useEffect } from 'react';
import { FiLogOut, FiMoon, FiSun, FiBell, FiUser, FiTrendingUp, FiPieChart, FiSearch, FiSettings, FiHelpCircle, FiShield, FiCreditCard } from "react-icons/fi";
import { BiCoinStack } from "react-icons/bi";

const HeaderView = ({ isLoggedIn, isAuthPage, handleLogout, handleLoginClick, setIsLoginMode }) => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme, notifications } = useGlobal();
  
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const userMenuRef = useRef(null);
  const notificationRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setShowUserMenu(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(e.target)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const mockNotifications = [
    { id: 1, title: 'BTC Fiyat Alarmı', message: 'Bitcoin $45,000 seviyesini geçti!', time: '5 dk önce', unread: true },
    { id: 2, title: 'Portföy Güncellemesi', message: 'Toplam değer %5.2 arttı', time: '1 saat önce', unread: true },
    { id: 3, title: 'Yeni Coin Listelendi', message: 'SOL şimdi işlem yapılabilir', time: '3 saat önce', unread: false },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-white/5">
      <div className="max-w-480 mx-auto px-8 h-20 flex items-center justify-between gap-8">
        
        {/* Logo */}
        {!isAuthPage && (
          <Link to={isLoggedIn ? "/dashboard" : "/"} className="flex items-center gap-4 no-underline group cursor-pointer shrink-0">
            <div className="relative w-12 h-12 flex items-center justify-center bg-yellow-500/10 rounded-full group-hover:bg-yellow-500/20 transition-all duration-300">
              <BiCoinStack className="text-3xl text-yellow-400" />
              <div className="absolute inset-0 bg-yellow-400/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white">
              Coin<span className="text-yellow-400">Vault</span>
            </h1>
          </Link>
        )}

        {/*  Arama Çubuğu */}
        {isLoggedIn && !isAuthPage && (
          <div className="hidden lg:flex items-center flex-1 max-w-xl">
            <div className="relative w-full">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Coin ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-full text-sm text-white placeholder-gray-500 focus:border-yellow-400/50 focus:bg-white/10 transition-all outline-none cursor-text"
              />
            </div>
          </div>
        )}

        {/* Navigasyon */}
        {isLoggedIn && !isAuthPage && (
          <nav className="hidden md:flex items-center gap-3 bg-white/5 p-1.5 rounded-full border border-white/5 backdrop-blur-md">
            <NavLink 
              to="/dashboard" 
              className={({ isActive }) => 
                `flex items-center gap-2.5 px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
                  isActive 
                  ? 'bg-yellow-400 text-black shadow-lg shadow-yellow-400/20' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`
              }
            >
              <FiPieChart size={18} />
              {t('dashboard')}
            </NavLink>
            <NavLink 
              to="/home" 
              className={({ isActive }) => 
                `flex items-center gap-2.5 px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
                  isActive 
                  ? 'bg-yellow-400 text-black shadow-lg shadow-yellow-400/20' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`
              }
            >
              <FiTrendingUp size={18} />
              {t('markets')}
            </NavLink>
          </nav>
        )}

        {/* Kullanıcı Bilgileri */}
        <div className="flex items-center gap-4 shrink-0">
          {!isAuthPage ? (
            isLoggedIn ? (
              <>
                {/* Dil Seçici */}
                <div className="hidden md:flex items-center gap-1.5 bg-white/5 p-1.5 rounded-full border border-white/10">
                  <button
                    onClick={() => changeLanguage('tr')}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      i18n.language === 'tr' ? 'bg-yellow-400 text-black' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    TR
                  </button>
                  <button
                    onClick={() => changeLanguage('en')}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      i18n.language === 'en' ? 'bg-yellow-400 text-black' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    EN
                  </button>
                </div>

                {/* Tema */}
                <button 
                  onClick={toggleTheme} 
                  className="p-3 rounded-full text-gray-400 hover:text-yellow-400 hover:bg-white/5 transition-all cursor-pointer"
                  title={theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                >
                  {theme === 'dark' ? <FiSun size={20} /> : <FiMoon size={20} />}
                </button>

                {/* Bildirimler */}
                <div className="relative" ref={notificationRef}>
                  <button 
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="relative p-3 rounded-full text-gray-400 hover:text-yellow-400 hover:bg-white/5 transition-all cursor-pointer"
                  >
                    <FiBell size={20} />
                    {mockNotifications.filter(n => n.unread).length > 0 && (
                      <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-black"></span>
                    )}
                  </button>

                  {showNotifications && (
                    <div className="absolute right-0 mt-2 w-80 glass-panel rounded-2xl border border-white/10 shadow-xl overflow-hidden animate-fade-in">
                      <div className="p-4 border-b border-white/10">
                        <h3 className="text-sm font-bold text-white">Bildirimler</h3>
                      </div>
                      <div className="max-h-96 overflow-y-auto">
                        {mockNotifications.map(notif => (
                          <div key={notif.id} className={`p-4 border-b border-white/5 hover:bg-white/5 transition-colors ${notif.unread ? 'bg-yellow-400/5' : ''} cursor-pointer`}>
                            <div className="flex items-start gap-3">
                              <div className={`w-2 h-2 mt-1.5 rounded-full ${notif.unread ? 'bg-yellow-400' : 'bg-gray-600'}`}></div>
                              <div className="flex-1">
                                <h4 className="text-sm font-semibold text-white">{notif.title}</h4>
                                <p className="text-xs text-gray-400 mt-1">{notif.message}</p>
                                <span className="text-xs text-gray-500 mt-2 block">{notif.time}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="p-3 text-center border-t border-white/10">
                        <button className="text-xs text-yellow-400 hover:text-yellow-300 font-medium cursor-pointer">Tümünü Gör</button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="h-8 w-px bg-white/10"></div>

                {/* Kullanıcı Menüsü */}
                <div className="relative" ref={userMenuRef}>
                  <button 
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-3 pl-1.5 pr-4 py-1.5 rounded-full bg-white/5 hover:bg-white/10 transition-all border border-white/10 cursor-pointer"
                  >
                    <div className="w-9 h-9 rounded-full bg-linear-to-tr from-yellow-400 to-yellow-600 p-0.5">
                      <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                        <FiUser className="text-gray-400 text-sm" />
                      </div>
                    </div>
                    <span className="hidden md:block text-sm font-medium text-gray-300">Hesabım</span>
                  </button>

                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-64 glass-panel rounded-2xl border border-white/10 shadow-xl overflow-hidden animate-fade-in">
                      <div className="p-4 border-b border-white/10">
                        <p className="text-sm font-semibold text-white">admin@coinvault.com</p>
                        <p className="text-xs text-gray-400 mt-1">Premium Üye</p>
                      </div>
                      
                      <div className="p-2">
                        <button onClick={() => navigate('/profile')} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-white/5 hover:text-white transition-all text-left cursor-pointer">
                          <FiUser size={18} />
                          <span className="text-sm">Profilim</span>
                        </button>
                        <button onClick={() => navigate('/wallet')} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-white/5 hover:text-white transition-all text-left cursor-pointer">
                          <FiCreditCard size={18} />
                          <span className="text-sm">Cüzdanım</span>
                        </button>
                        <button onClick={() => navigate('/settings')} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-white/5 hover:text-white transition-all text-left cursor-pointer">
                          <FiSettings size={18} />
                          <span className="text-sm">Ayarlar</span>
                        </button>
                        <button onClick={() => navigate('/security')} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-white/5 hover:text-white transition-all text-left cursor-pointer">
                          <FiShield size={18} />
                          <span className="text-sm">Güvenlik</span>
                        </button>
                        <button onClick={() => navigate('/help')} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-white/5 hover:text-white transition-all text-left cursor-pointer">
                          <FiHelpCircle size={18} />
                          <span className="text-sm">Yardım</span>
                        </button>
                      </div>

                      <div className="p-2 border-t border-white/10">
                        <button 
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 transition-all text-left cursor-pointer"
                        >
                          <FiLogOut size={18} />
                          <span className="text-sm font-medium">Çıkış Yap</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <button 
                onClick={handleLoginClick} 
                className="btn-primary flex items-center gap-2 px-6 py-2.5 text-sm cursor-pointer"
              >
                <FiUser />
                {t('login')}
              </button>
            )
          ) : null}
        </div>
      </div>
    </header>
  );
};

export default HeaderView;