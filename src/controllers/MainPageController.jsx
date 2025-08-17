import { useEffect, useState, useRef } from 'react';
import MainPageModel from '../models/MainPageModel.js';
import MainPageView from '../views/MainPageView.jsx';
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

      setError(null);
      const data = await MainPageModel.getCoins();
      if (data) {
        const newPrices = {};
        const updatedCoins = data.map(coin => {
          const prevPrice = prevPricesRef.current[coin.id];
          let priceChange = null;

          if (prevPrice && prevPrice > coin.current_price) {
            priceChange = 'down';
          } else if (prevPrice && prevPrice < coin.current_price) {
            priceChange = 'up';
          }

          newPrices[coin.id] = coin.current_price;
          return { ...coin, priceChange };
        });

        setCoins(updatedCoins);
        prevPricesRef.current = newPrices;
      }
    } catch (err) {
      setError('Veriler çekilirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
      console.error(err);
    } finally {
      setIsLoading(false);

    }
  };

  useEffect(() => {
    fetchCoins();

    const intervalId = setInterval(fetchCoins, 60000); 

    return () => clearInterval(intervalId);
  }, []);

  const filteredCoins = coins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(search.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCoins.length / coinsPerPage);
  const indexOfLastCoin = currentPage * coinsPerPage;
  const indexOfFirstCoin = indexOfLastCoin - coinsPerPage;
  const currentCoins = filteredCoins.slice(indexOfFirstCoin, indexOfLastCoin);

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleRowClick = (coinId) => {
    navigate(`/coin/${coinId}`);
  };

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
      setSearch={setSearch}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      totalPages={totalPages}
      currentCoins={currentCoins}
      indexOfFirstCoin={indexOfFirstCoin}
      handleNext={handleNext}
      handlePrev={handlePrev}
      handleRowClick={handleRowClick}
      handleSearchChange={handleSearchChange}
    />
  );
};

export default MainPageController;