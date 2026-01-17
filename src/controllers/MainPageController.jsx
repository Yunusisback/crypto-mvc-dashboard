import { useEffect, useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import MainPageModel from '../models/MainPageModel'; 
import MainPageView from '../views/Main/MainPageView'; 

const MainPageController = () => {
  const navigate = useNavigate();
  const coinsPerPage = 10; 

  const [initialCoins, setInitialCoins] = useState([]); 
  const [coins, setCoins] = useState([]); 
  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  
  // Kullanıcı bilgisi (localStorage dan)
  const [user] = useState(() => {
    try {
      const userData = localStorage.getItem('currentUser');
      return userData ? JSON.parse(userData) : { email: 'Misafir', name: 'Misafir' };
    } catch {
      return { email: 'Misafir', name: 'Misafir' };
    }
  });

  //  Sayfa açılınca ilk veriyi çek
  const fetchInitialData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const data = await MainPageModel.getCoins(100, 1);
      
      if (data) {
        setInitialCoins(data); // Yedeğe at
        setCoins(data);        // Ekrana bas
      }
    } catch (err) {
      console.error("Controller Error:", err);
      setError('Veriler yüklenirken bir sorun oluştu.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInitialData();
  }, [fetchInitialData]);

  //  Arama Mantığı 
  useEffect(() => {

     // Arama kutusu boş veya 3 karakterden azsa  ilk veriyi göster
    if (!search || search.length < 3) {
      if (initialCoins.length > 0) {
        setCoins(initialCoins);
      }
      return;
    }

      
    // Yazmayı bıraktıktan 500ms sonra istek atar 
    const timerId = setTimeout(async () => {
      setIsLoading(true);
      try {

        // Yeni yazdığımız arama fonksiyonunu kullanıyoruz
        const results = await MainPageModel.searchCoins(search);
        
        if (results && results.length > 0) {
          setCoins(results);
          setCurrentPage(1); 
        }
      } catch (err) {
        console.error("Search Error:", err);
      } finally {
        setIsLoading(false);
      }
    }, 500);

    // Kullanıcı 500ms dolmadan yeni harfe basarsa  önceki sayacı iptal et
    return () => clearTimeout(timerId);

  }, [search, initialCoins]);


   
   // Sayfalama için mevcut coinleri hesapla
  const currentCoins = useMemo(() => {
    const start = (currentPage - 1) * coinsPerPage;
    return coins.slice(start, start + coinsPerPage);
  }, [coins, currentPage, coinsPerPage]);

  const totalPages = Math.ceil(coins.length / coinsPerPage);


  const handleSearchChange = useCallback((e) => {
    setSearch(e.target.value);
    if (e.target.value.length === 0) setCurrentPage(1);
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