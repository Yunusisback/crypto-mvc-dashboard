import  { useEffect, useState } from 'react';
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

  const fetchDashboardData = async () => {
    try {
      setError(null);
      const [globalData, trending, topCoins] = await Promise.all([
        DashboardModel.getGlobalData(),
        DashboardModel.getTrendingCoins(),
        DashboardModel.getTopCoins(10),
      ]);
      setGlobalMarketData(globalData);
      setMarketStats(DashboardModel.calculateMarketStats(globalData));
      setTrendingCoins(trending);
      setTopCoins(topCoins);
    } catch (err) {
      console.error('Dashboard data fetch error:', err);
      setError('Dashboard verileri yüklenirken hata oluştu');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchWatchlistCoins = async () => {
    if (watchlist.length === 0) {
      setWatchlistCoins([]);
      return;
    }
    try {
      const coins = await DashboardModel.getWatchlistCoins(watchlist);
      setWatchlistCoins(coins);
    } catch (err) {
      console.error('Watchlist fetch error:', err);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    fetchWatchlistCoins();
    const globalInterval = setInterval(fetchDashboardData, 120000);
    const watchlistInterval = setInterval(fetchWatchlistCoins, 60000);
    return () => {
      clearInterval(globalInterval);
      clearInterval(watchlistInterval);
    };
  }, []);

  useEffect(() => {
    fetchWatchlistCoins();
  }, [watchlist]);

  const handleCoinClick = (coinId) => navigate(`/coin/${coinId}`);
  const handleRefresh = () => {
    setIsLoading(true);
    fetchDashboardData();
    fetchWatchlistCoins();
  };

  return (
    <DashboardView
      isLoading={isLoading}
      error={error}
      marketStats={marketStats}
      trendingCoins={trendingCoins}
      topCoins={topCoins}
      watchlistCoins={watchlistCoins}
      onCoinClick={handleCoinClick}
      onRefresh={handleRefresh}
    />
  );
};

export default DashboardController;