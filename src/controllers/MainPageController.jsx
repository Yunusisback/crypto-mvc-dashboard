import { useEffect, useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import MainPageModel from '../models/MainPageModel'; 
import MainPageView from '../views/Main/MainPageView'; 

const MainPageController = () => {
  const navigate = useNavigate();
  const coinsPerPage = 10; 


  const [coins, setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  
  // Kullanıcı bilgisi
  const [user] = useState(() => {
    try {
      const userData = localStorage.getItem('currentUser');
      return userData ? JSON.parse(userData) : { email: 'Misafir', name: 'Misafir' };
    } catch {
      return { email: 'Misafir', name: 'Misafir' };
    }
  });

  const fetchCoins = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Tek seferde 100 coin çekiyoruz
      const data = await MainPageModel.getCoins(100, 1);
      
      if (data) {
        setCoins(data);
      }
    } catch (err) {
      console.error("Controller Error:", err);
      setError('Veriler yüklenirken bir sorun oluştu.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCoins();
  }, [fetchCoins]);

  // Filtreleme ve Sayfalama
  const filteredCoins = useMemo(() => {
    if (!search) return coins;
    const term = search.toLowerCase();
    return coins.filter(coin =>
      coin.name.toLowerCase().includes(term) ||
      coin.symbol.toLowerCase().includes(term)
    );
  }, [coins, search]);

  const totalPages = Math.ceil(filteredCoins.length / coinsPerPage);

  const currentCoins = useMemo(() => {
    const start = (currentPage - 1) * coinsPerPage;
    return filteredCoins.slice(start, start + coinsPerPage);
  }, [filteredCoins, currentPage, coinsPerPage]);

  const handleSearchChange = useCallback((e) => {
    setSearch(e.target.value);
    setCurrentPage(1); 
  }, []);

  const handleNext = useCallback(() => 
    setCurrentPage(p => Math.min(p + 1, totalPages)), [totalPages]);

  const handlePrev = useCallback(() => 
    setCurrentPage(p => Math.max(p - 1, 1)), []);

  const handleRowClick = useCallback((id) => 
    navigate(`/coin/${id}`), [navigate]);

  return (
    <MainPageView
      isLoading={isLoading}
      error={error}
      coins={coins} 
      search={search}
      currentPage={currentPage}
      totalPages={totalPages}
      currentCoins={currentCoins} 
      handleSearchChange={handleSearchChange}
      handleNext={handleNext}
      handlePrev={handlePrev}
      handleRowClick={handleRowClick}
      coinsPerPage={coinsPerPage}
      user={user}
    />
  );
};

export default MainPageController;