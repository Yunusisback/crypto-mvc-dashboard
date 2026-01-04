import { useEffect, useState, useRef, useMemo } from 'react';
import MainPageModel from '../models/MainPageModel.js';
import MainPageView from '../views/Main/MainPageView.jsx'; 
import { useNavigate } from 'react-router-dom';

const MainPageController = () => {
  const [coins, setCoins] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  
  const prevPricesRef = useRef({}); 
  const coinsPerPage = 10;
  const navigate = useNavigate();

  const fetchCoins = async () => {
    try {
      const data = await MainPageModel.getCoins();
      if (data) {
        const newPrices = {};
        const updatedCoins = data.map(coin => {
          const prevPrice = prevPricesRef.current[coin.id];
          let priceChange = null;
          if (prevPrice && prevPrice > coin.current_price) priceChange = 'down';
          else if (prevPrice && prevPrice < coin.current_price) priceChange = 'up';
          newPrices[coin.id] = coin.current_price;
          return { ...coin, priceChange };
        });
        setCoins(updatedCoins);
        prevPricesRef.current = newPrices;
      }
      setError(null);
    } catch (err) {
      setError('Veriler güncellenirken bir sorun oluştu.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCoins();
    const intervalId = setInterval(fetchCoins, 60000); 
    return () => clearInterval(intervalId);
  }, []);

  const filteredCoins = useMemo(() => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(search.toLowerCase())
    );
  }, [coins, search]);

  const totalPages = Math.ceil(filteredCoins.length / coinsPerPage);
  
  const currentCoins = useMemo(() => {
    const indexOfLastCoin = currentPage * coinsPerPage;
    const indexOfFirstCoin = indexOfLastCoin - coinsPerPage;
    return filteredCoins.slice(indexOfFirstCoin, indexOfLastCoin);
  }, [filteredCoins, currentPage]);

  const handleNext = () => setCurrentPage(p => Math.min(p + 1, totalPages));
  const handlePrev = () => setCurrentPage(p => Math.max(p - 1, 1));
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  return (
    <MainPageView
      isLoading={isLoading}
      error={error}
      coins={coins}
      search={search}
      currentPage={currentPage}
      totalPages={totalPages}
      currentCoins={currentCoins}
      indexOfFirstCoin={(currentPage - 1) * coinsPerPage} 
      handleSearchChange={handleSearchChange} 
      handleNext={handleNext}
      handlePrev={handlePrev}
      handleRowClick={(id) => navigate(`/coin/${id}`)}
    />
  );
};

export default MainPageController;