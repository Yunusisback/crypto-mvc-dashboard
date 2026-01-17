import { useEffect, useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardModel from '../models/DashboardModel';
import DashboardView from '../views/Dashboard/DashboardView';
import { useGlobal } from '../context/GlobalContext';

const DashboardController = () => {
  const navigate = useNavigate();

  const { 
    watchlist, 
    setGlobalMarketData, 
    portfolio, 
    transactions
  } = useGlobal();
  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [trendingCoins, setTrendingCoins] = useState([]);
  const [watchlistCoins, setWatchlistCoins] = useState([]);
  const [marketStats, setMarketStats] = useState(null);
  
  // Hem Top 20 hem de Portföydeki coinlerin birleşimi
  const [allCoins, setAllCoins] = useState([]); 

  // Portföy Hesaplaması
  const portfolioStats = useMemo(() => {

    // Veri yoksa veya portföy boşsa 0 döndür
    if (!allCoins.length || !portfolio.length) {
      return { totalValue: 0, totalProfit: 0, profitPercent: 0 };
    }

    let totalValue = 0;
    let totalInvested = 0;

    portfolio.forEach(item => {

      // Coinin güncel fiyatını 'allCoins' içinden bul
      const currentCoin = allCoins.find(c => c.id === item.coinId);
      
      if (currentCoin) {
        const currentValue = item.amount * currentCoin.current_price;
        totalValue += currentValue;
        totalInvested += item.totalInvested;
      } else {

        // Eğer fiyat bulunamazsa (nadir durum) alınan fiyattan hesapla ki 0 görünmesin
        console.warn(`Fiyat bulunamadı: ${item.coinId}`);
        totalValue += item.amount * item.buyPrice; 
        totalInvested += item.totalInvested;
      }
    });

    const totalProfit = totalValue - totalInvested;
    const profitPercent = totalInvested > 0 ? (totalProfit / totalInvested) * 100 : 0;

    return { totalValue, totalProfit, profitPercent };
  }, [portfolio, allCoins]);
 
  // Portföydeki coinlerin güncel verilerini çekmek için yardımcı fonksiyon
  const fetchPortfolioCoinsData = useCallback(async () => {
    if (portfolio.length === 0) return [];
    
    // Portföydeki benzersiz ID leri al
    const portfolioIds = [...new Set(portfolio.map(p => p.coinId))];
    try {

      // Mevcut getWatchlistCoins metodu ID listesi alıp veri döndürüyor 
      return await DashboardModel.getWatchlistCoins(portfolioIds);
    } catch (err) {
      console.error("Portföy veri hatası:", err);
      return [];
    }
  }, [portfolio]);

  const fetchDashboardData = useCallback(async () => {
    try {
      setError(null);
      
      // Tüm verileri paralel çek 
      const [globalData, trending, topCoinsData, portfolioCoinsData] = await Promise.all([
        DashboardModel.getGlobalData(),
        DashboardModel.getTrendingCoins(),
        DashboardModel.getTopCoins(20),
        fetchPortfolioCoinsData() 
      ]);

      if (globalData) {
        setGlobalMarketData(globalData);
        setMarketStats(DashboardModel.calculateMarketStats(globalData));
      }

      if (trending) setTrendingCoins(trending);

      
      let combinedCoins = [];
      
      if (topCoinsData && topCoinsData.length > 0) {
        combinedCoins = [...topCoinsData];
      }

      if (portfolioCoinsData && portfolioCoinsData.length > 0) {
        portfolioCoinsData.forEach(pCoin => {
          
          // Eğer bu coin zaten listede yoksa ekle
          if (!combinedCoins.find(c => c.id === pCoin.id)) {
            combinedCoins.push(pCoin);
          }
        });
      }

      setAllCoins(combinedCoins);

    } catch (err) {
      console.error('Dashboard data error:', err);
      if (!marketStats && !allCoins.length) {
        setError('Veriler yüklenirken bir sorun oluştu.');
      }
    } finally {
      setIsLoading(false);
    }
  }, [setGlobalMarketData, marketStats, allCoins.length, fetchPortfolioCoinsData]);

  const fetchWatchlistCoins = useCallback(async () => {
    if (watchlist.length === 0) {
      setWatchlistCoins([]);
      return;
    }
    try {
      const coins = await DashboardModel.getWatchlistCoins(watchlist);
      setWatchlistCoins(coins || []);
    } catch (err) {
      console.error('Watchlist error:', err);
    }
  }, [watchlist]);

  useEffect(() => {
    let isMounted = true;
    const init = async () => {
      if (isMounted) {
        await fetchDashboardData();
        await fetchWatchlistCoins();
      }
    };
    init();
    
    const interval = setInterval(() => {
      if(isMounted) fetchDashboardData();
    }, 120000);
    
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [fetchDashboardData, fetchWatchlistCoins]);

  const handleCoinClick = useCallback((coinId) => {
    navigate(`/coin/${coinId}`);
  }, [navigate]);
  
  const handleRefresh = useCallback(() => {
    setIsLoading(true);
    Promise.all([fetchDashboardData(), fetchWatchlistCoins()])
      .finally(() => setIsLoading(false));
  }, [fetchDashboardData, fetchWatchlistCoins]);

  return (
    <DashboardView
      isLoading={isLoading}
      error={error}
      trendingCoins={trendingCoins}
      watchlistCoins={watchlistCoins}
      allCoins={allCoins} 
      portfolioStats={portfolioStats} 
      transactions={transactions}
      handleRefresh={handleRefresh}
      handleCoinClick={handleCoinClick}
    />
  );
};

export default DashboardController;