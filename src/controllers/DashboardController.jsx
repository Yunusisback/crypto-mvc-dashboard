import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardModel from '../models/DashboardModel';
import DashboardView from '../views/Dashboard/DashboardView';
import { useGlobal } from '../context/GlobalContext';

const DashboardController = () => {
  const navigate = useNavigate();
  const { watchlist, setGlobalMarketData } = useGlobal();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [trendingCoins, setTrendingCoins] = useState([]);
  const [topCoins, setTopCoins] = useState([]); 
  const [watchlistCoins, setWatchlistCoins] = useState([]);
  const [marketStats, setMarketStats] = useState(null);
  const [allCoins, setAllCoins] = useState([]); 


  const fetchDashboardData = useCallback(async () => {
    try {
      setError(null);
      
      // Global Veri
      const globalData = await DashboardModel.getGlobalData();
      if (globalData) {
        setGlobalMarketData(globalData);
        setMarketStats(DashboardModel.calculateMarketStats(globalData));
      }

      // API yi boğmamak için 500ms bekle
      await new Promise(r => setTimeout(r, 500));

      // Trendler
      const trending = await DashboardModel.getTrendingCoins();
      if (trending) setTrendingCoins(trending);

      // 500ms daha bekle
      await new Promise(r => setTimeout(r, 500));

      //  Top Coinler
      const topCoinsData = await DashboardModel.getTopCoins(20);
      if (topCoinsData && topCoinsData.length > 0) {
        setTopCoins(topCoinsData);
        setAllCoins(topCoinsData);
      }

    } catch (err) {
      console.error('Dashboard data error:', err);

      // Kritik veri yoksa hata göster
      if (!marketStats) {
        setError('Veriler yüklenirken bir sorun oluştu.');
      }
    } finally {
      setIsLoading(false);
    }
  }, [setGlobalMarketData, marketStats]);

  // İzleme Listesi Coinlerini Getir
  const fetchWatchlistCoins = useCallback(async () => {
    if (watchlist.length === 0) {
      setWatchlistCoins([]);
      return;
    }
    try {
     
      await new Promise(r => setTimeout(r, 1000));
      const coins = await DashboardModel.getWatchlistCoins(watchlist);
      setWatchlistCoins(coins || []);
    } catch (err) {
      console.error('Watchlist error:', err);
    }
  }, [watchlist]);


  useEffect(() => {
    let isMounted = true;

    const init = async () => {
      if(isMounted) await fetchDashboardData();
      if(isMounted) await fetchWatchlistCoins();
    };

    init();
    
    // Periyodik yenileme (2 dakikada bir)
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
    fetchDashboardData();
    fetchWatchlistCoins();
  }, [fetchDashboardData, fetchWatchlistCoins]);

  return (
    <DashboardView
      isLoading={isLoading}
      error={error}
      trendingCoins={trendingCoins}
      watchlistCoins={watchlistCoins}
      allCoins={allCoins}
      handleRefresh={handleRefresh}
      handleCoinClick={handleCoinClick}
    />
  );
};

export default DashboardController;