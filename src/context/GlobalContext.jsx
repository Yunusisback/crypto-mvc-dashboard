import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';

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
  const [watchlist, setWatchlist] = useState(() => JSON.parse(localStorage.getItem('watchlist')) || []);
  
  // Portfolio sistemi
  const [portfolio, setPortfolio] = useState(() => 
    JSON.parse(localStorage.getItem('portfolio')) || []
  );
  
  // Transaction geçmişi
  const [transactions, setTransactions] = useState(() => 
    JSON.parse(localStorage.getItem('transactions')) || []
  );
  
  const [globalMarketData, setGlobalMarketData] = useState(null);
  const [notifications, setNotifications] = useState([]);

  // Bildirim sistemi
  const addNotification = useCallback((type, message) => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, type, message }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 4000);
  }, []);

  // Watchlist işlemleri
  const addToWatchlist = useCallback((coinId) => {
    setWatchlist(prev => {
      if (prev.includes(coinId)) return prev;
      const updated = [...prev, coinId];
      localStorage.setItem('watchlist', JSON.stringify(updated));
      addNotification('success', 'İzleme listesine eklendi!');
      return updated;
    });
  }, [addNotification]);

  const removeFromWatchlist = useCallback((coinId) => {
    setWatchlist(prev => {
      const updated = prev.filter(id => id !== coinId);
      localStorage.setItem('watchlist', JSON.stringify(updated));
      addNotification('info', 'İzleme listesinden çıkarıldı.');
      return updated;
    });
  }, [addNotification]);

  const isInWatchlist = useCallback((coinId) => watchlist.includes(coinId), [watchlist]);

  // Portfolio işlemleri
  const addToPortfolio = useCallback((coinId, coinName, coinSymbol, amount, buyPrice) => {
    setPortfolio(prev => {
      const existing = prev.find(item => item.coinId === coinId);
      let updated;
      
      if (existing) {
        // Var olan coine ekleme yap
        updated = prev.map(item => 
          item.coinId === coinId 
            ? { 
                ...item, 
                amount: item.amount + amount,
                totalInvested: item.totalInvested + (amount * buyPrice)
              }
            : item
        );
      } else {
     
        updated = [...prev, {
          coinId,
          coinName,
          coinSymbol,
          amount,
          buyPrice,
          totalInvested: amount * buyPrice,
          addedAt: new Date().toISOString()
        }];
      }
      
      localStorage.setItem('portfolio', JSON.stringify(updated));
      return updated;
    });

    // Transaction kaydet
    addTransaction({
      type: 'buy',
      coinId,
      coinName,
      coinSymbol,
      amount,
      price: buyPrice,
      total: amount * buyPrice,
      date: new Date().toISOString()
    });

    addNotification('success', `${amount} ${coinSymbol.toUpperCase()} satın alındı!`);
  }, [addNotification]);

  const removeFromPortfolio = useCallback((coinId, amount, sellPrice) => {
    setPortfolio(prev => {
      const existing = prev.find(item => item.coinId === coinId);
      if (!existing) return prev;

      let updated;
      if (existing.amount <= amount) {

        // Tümünü sat
        updated = prev.filter(item => item.coinId !== coinId);
      } else {
        
        // Kısmi satış
        updated = prev.map(item =>
          item.coinId === coinId
            ? {
                ...item,
                amount: item.amount - amount,
                totalInvested: item.totalInvested - ((item.totalInvested / item.amount) * amount)
              }
            : item
        );
      }

      localStorage.setItem('portfolio', JSON.stringify(updated));
      return updated;
    });

    // Transaction kaydet
    const coin = portfolio.find(c => c.coinId === coinId);
    addTransaction({
      type: 'sell',
      coinId,
      coinName: coin?.coinName,
      coinSymbol: coin?.coinSymbol,
      amount,
      price: sellPrice,
      total: amount * sellPrice,
      date: new Date().toISOString()
    });

    addNotification('info', `${amount} ${coin?.coinSymbol.toUpperCase()} satıldı!`);
  }, [portfolio, addNotification]);

  const addTransaction = useCallback((transaction) => {
    setTransactions(prev => {
      const updated = [transaction, ...prev].slice(0, 50); // Son 50 işlem
      localStorage.setItem('transactions', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const isInPortfolio = useCallback((coinId) => {
    return portfolio.some(item => item.coinId === coinId);
  }, [portfolio]);

  const getPortfolioItem = useCallback((coinId) => {
    return portfolio.find(item => item.coinId === coinId);
  }, [portfolio]);

  // Tema
  const toggleTheme = useCallback(() => {
    setTheme(prev => {
      const newTheme = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      return newTheme;
    });
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    if(theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const value = useMemo(() => ({
    theme, 
    toggleTheme, 
    watchlist, 
    addToWatchlist, 
    removeFromWatchlist, 
    isInWatchlist,
    portfolio, 
    addToPortfolio, 
    removeFromPortfolio, 
    isInPortfolio,
    getPortfolioItem,
    transactions,
    globalMarketData, 
    setGlobalMarketData, 
    notifications, 
    addNotification
  }), [
    theme, 
    toggleTheme, 
    watchlist, 
    addToWatchlist, 
    removeFromPortfolio, 
    isInWatchlist, 
    portfolio, 
    addToPortfolio, 
    removeFromPortfolio,
    isInPortfolio,
    getPortfolioItem,
    transactions,
    globalMarketData, 
    notifications, 
    addNotification
  ]);

  return (
    <GlobalContext.Provider value={value}>
      {children}
    </GlobalContext.Provider>
  );
};