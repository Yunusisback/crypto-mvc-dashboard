import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';

const GlobalContext = createContext();

export const useGlobal = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('useGlobal must be used within GlobalProvider');
  }
  return context;
};

// Mock veriler 
const MOCK_PORTFOLIO = [
  {
    coinId: "bitcoin",
    coinName: "Bitcoin",
    coinSymbol: "btc",
    amount: 0.45,
    buyPrice: 42000,
    totalInvested: 18900,
    addedAt: "2024-01-15T10:00:00.000Z"
  },
  {
    coinId: "ethereum",
    coinName: "Ethereum",
    coinSymbol: "eth",
    amount: 12.5,
    buyPrice: 2400,
    totalInvested: 30000,
    addedAt: "2024-02-10T14:30:00.000Z"
  },
  {
    coinId: "solana",
    coinName: "Solana",
    coinSymbol: "sol",
    amount: 250,
    buyPrice: 85,
    totalInvested: 21250,
    addedAt: "2024-03-05T09:15:00.000Z"
  },
  {
    coinId: "ripple",
    coinName: "XRP",
    coinSymbol: "xrp",
    amount: 10000,
    buyPrice: 0.55,
    totalInvested: 5500,
    addedAt: "2024-01-20T11:45:00.000Z"
  }
];

const MOCK_TRANSACTIONS = [
  {
    type: 'buy',
    coinId: 'bitcoin',
    coinName: 'Bitcoin',
    coinSymbol: 'btc',
    amount: 0.5,
    price: 42000,
    total: 21000,
    date: "2024-01-15T10:00:00.000Z"
  },
  {
    type: 'buy',
    coinId: 'ripple',
    coinName: 'XRP',
    coinSymbol: 'xrp',
    amount: 10000,
    price: 0.55,
    total: 5500,
    date: "2024-01-20T11:45:00.000Z"
  },
  {
    type: 'buy',
    coinId: 'ethereum',
    coinName: 'Ethereum',
    coinSymbol: 'eth',
    amount: 15,
    price: 2350,
    total: 35250,
    date: "2024-02-01T16:20:00.000Z"
  },
  {
    type: 'sell',
    coinId: 'ethereum',
    coinName: 'Ethereum',
    coinSymbol: 'eth',
    amount: 2.5,
    price: 2800,
    total: 7000,
    date: "2024-02-15T09:30:00.000Z"
  },
  {
    type: 'buy',
    coinId: 'solana',
    coinName: 'Solana',
    coinSymbol: 'sol',
    amount: 250,
    price: 85,
    total: 21250,
    date: "2024-03-05T09:15:00.000Z"
  },
  {
    type: 'sell',
    coinId: 'bitcoin',
    coinName: 'Bitcoin',
    coinSymbol: 'btc',
    amount: 0.05,
    price: 65000,
    total: 3250,
    date: "2024-03-10T14:00:00.000Z"
  }
];

const MOCK_WATCHLIST = ['bitcoin', 'ethereum', 'solana', 'ripple', 'cardano', 'avalanche-2', 'polkadot'];

export const GlobalProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
  
  const [watchlist, setWatchlist] = useState(() => {
    const local = JSON.parse(localStorage.getItem('watchlist'));
    return (local && local.length > 0) ? local : MOCK_WATCHLIST;
  });
  
  const [portfolio, setPortfolio] = useState(() => {
    const local = JSON.parse(localStorage.getItem('portfolio'));
    return (local && local.length > 0) ? local : MOCK_PORTFOLIO;
  });
  
  const [transactions, setTransactions] = useState(() => {
    const local = JSON.parse(localStorage.getItem('transactions'));
    return (local && local.length > 0) ? local : MOCK_TRANSACTIONS;
  });
  
  const [globalMarketData, setGlobalMarketData] = useState(null);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  useEffect(() => {
    localStorage.setItem('portfolio', JSON.stringify(portfolio));
  }, [portfolio]);

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

// Bildirim Ekleme Fonksiyonu
  const addNotification = useCallback((type, message) => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, type, message }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 4000);
  }, []);

  const addToWatchlist = useCallback((coinId) => {
    setWatchlist(prev => {
      if (prev.includes(coinId)) return prev;
      const updated = [...prev, coinId];
      return updated;
    });
    addNotification('success', 'İzleme listesine eklendi!');
  }, [addNotification]);

  const removeFromWatchlist = useCallback((coinId) => {
    setWatchlist(prev => {
      const updated = prev.filter(id => id !== coinId);
      return updated;
    });
    addNotification('info', 'İzleme listesinden çıkarıldı.');
  }, [addNotification]);

  const isInWatchlist = useCallback((coinId) => watchlist.includes(coinId), [watchlist]);

  
  const addToPortfolio = useCallback((coinId, coinName, coinSymbol, amount, buyPrice) => {
    setPortfolio(prev => {
      const existing = prev.find(item => item.coinId === coinId);
      let updated;
      
       
      if (existing) {
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
      return updated;
    });

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
        updated = prev.filter(item => item.coinId !== coinId);
      } else {
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
      return updated;
    });

    // İşlem kaydı ekle
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

    addNotification('info', `${amount} ${coin?.coinSymbol?.toUpperCase() || ''} satıldı!`);
  }, [portfolio, addNotification]);

  const addTransaction = useCallback((transaction) => {
    setTransactions(prev => {
      const updated = [transaction, ...prev].slice(0, 50);
      return updated;
    });
  }, []);

  const isInPortfolio = useCallback((coinId) => {
    return portfolio.some(item => item.coinId === coinId);
  }, [portfolio]);

  const getPortfolioItem = useCallback((coinId) => {
    return portfolio.find(item => item.coinId === coinId);
  }, [portfolio]);

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

   // Tüm context değerlerini memoize et
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
    removeFromWatchlist, 
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


