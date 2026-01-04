import  { createContext, useContext, useState, useEffect } from 'react';

const GlobalContext = createContext();

export const useGlobal = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('useGlobal must be used within GlobalProvider');
  }
  return context;
};


export const GlobalProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
  const [watchlist, setWatchlist] = useState(() => {
    const saved = localStorage.getItem('watchlist');
    return saved ? JSON.parse(saved) : [];
  });
  const [portfolio, setPortfolio] = useState(() => {
    const saved = localStorage.getItem('portfolio');
    return saved ? JSON.parse(saved) : [];
  });
  const [globalMarketData, setGlobalMarketData] = useState(null);
  const [notifications, setNotifications] = useState([]);

  const toggleTheme = () => {
    setTheme(prev => {
      const newTheme = prev === 'dark' ? 'light' : 'dark';
      localStorage.setItem('theme', newTheme);
      document.documentElement.setAttribute('data-theme', newTheme);
      return newTheme;
    });
  };

  const addToWatchlist = (coinId) => {
    if (!watchlist.includes(coinId)) {
      const updated = [...watchlist, coinId];
      setWatchlist(updated);
      localStorage.setItem('watchlist', JSON.stringify(updated));
      addNotification('success', 'Coin izleme listesine eklendi!');
    }
  };

  const removeFromWatchlist = (coinId) => {
    const updated = watchlist.filter(id => id !== coinId);
    setWatchlist(updated);
    localStorage.setItem('watchlist', JSON.stringify(updated));
    addNotification('info', 'Coin izleme listesinden çıkarıldı');
  };

  const isInWatchlist = (coinId) => watchlist.includes(coinId);

  const addToPortfolio = (coin) => {
    const updated = [...portfolio, { ...coin, addedAt: Date.now() }];
    setPortfolio(updated);
    localStorage.setItem('portfolio', JSON.stringify(updated));
    addNotification('success', 'Portfolio\'ya eklendi!');
  };

  const removeFromPortfolio = (coinId) => {
    const updated = portfolio.filter(item => item.id !== coinId);
    setPortfolio(updated);
    localStorage.setItem('portfolio', JSON.stringify(updated));
    addNotification('info', 'Portfolio\'dan çıkarıldı');
  };

  const addNotification = (type, message) => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, type, message }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 3000);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, []);

  const value = {
    theme, toggleTheme, watchlist, addToWatchlist, removeFromWatchlist, isInWatchlist,
    portfolio, addToPortfolio, removeFromPortfolio, globalMarketData, setGlobalMarketData,
    notifications, addNotification
  };

  return <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>;
};