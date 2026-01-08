import { useState, useMemo } from 'react';
import CoinTable from "./CoinTable";
import Pagination from "./Pagination";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import ErrorMessage from "../../components/ui/ErrorMessage";
import BuySellModal from "../Dashboard/components/BuySellModal";
import { FiSearch, FiTrendingUp, FiActivity, FiArrowUpRight, FiZap, FiGlobe } from 'react-icons/fi';

const MainPageView = ({
  isLoading,
  error,
  coins,
  search,
  handleSearchChange,
  currentPage,
  totalPages,
  handleNext,
  handlePrev,
  currentCoins,
  handleRowClick,
  coinsPerPage,
  user
}) => {
  const [showBuyModal, setShowBuyModal] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  
  // En çok yükselen 3 coini bul 
  const topGainers = useMemo(() => {
    if (!coins || coins.length === 0) return [];
    return [...coins]
      .sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h)
      .slice(0, 3);
  }, [coins]);

  if (isLoading) return <LoadingSpinner message="Piyasa verileri yükleniyor..." />;
  if (error) return <ErrorMessage message={error} onRetry={() => window.location.reload()} />;

  const filters = [
    { id: 'all', label: 'Tüm Piyasalar', icon: <FiActivity /> },
    { id: 'gainers', label: 'Yükselenler', icon: <FiTrendingUp /> },
    { id: 'volume', label: 'Yüksek Hacim', icon: <FiZap /> },
  ];

  return (
    <div className="min-h-screen pt-6 pb-12 px-4 md:px-8 max-w-400 mx-auto animate-fade-in">
      
      {/* Başlık ve Genel İstatistikler */}
      <div className="mb-10">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 mb-3 select-none">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
              </span>
              <span className="text-yellow-500 text-xs font-bold uppercase tracking-wider">Canlı Piyasa</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
              Kripto <span className="text-transparent bg-clip-text bg-linear-to-r from-yellow-400 to-yellow-600">Dünyası</span>
            </h1>
            <p className="text-gray-400 mt-2 max-w-xl">
              Dünya genelindeki {coins.length}+ kripto para birimini anlık takip edin, fırsatları yakalayın.
            </p>
          </div>

          {/* Genel İstatistikler */}
          <div className="flex gap-6 bg-[#121212] p-4 rounded-2xl border border-white/5 shadow-lg select-none">
             <div>
                <p className="text-xs text-gray-500 font-bold uppercase flex items-center gap-1">
                   <FiGlobe /> Piyasa Değeri
                </p>
                <p className="text-xl font-mono font-bold text-white mt-1">$2.58T</p>
             </div>
             <div className="w-px bg-white/10"></div>
             <div>
                <p className="text-xs text-gray-500 font-bold uppercase flex items-center gap-1">
                   <FiActivity /> 24s Hacim
                </p>
                <p className="text-xl font-mono font-bold text-white mt-1">$92.3B</p>
             </div>
          </div>
        </div>

         
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {topGainers.map((coin, index) => (
             <div 
               key={coin.id} 
               onClick={() => handleRowClick(coin.id)}
               className="group relative bg-[#121212] hover:bg-[#1a1a1a] border border-white/5 hover:border-emerald-500/30 rounded-3xl h-40 cursor-pointer transition-all duration-300 overflow-hidden shadow-lg flex flex-col justify-between"
             >
                {/* Kart İçeriği */}
                <div className="relative z-20 p-6 flex justify-between items-start">
                   <div className="flex items-center gap-4">
                      <img src={coin.image} className="w-12 h-12 rounded-full shadow-lg group-hover:scale-110 transition-transform bg-white/5 p-1" alt={coin.name} />
                      <div>
                         <h3 className="font-bold text-white text-xl leading-none">{coin.symbol.toUpperCase()}</h3>
                         <p className="text-gray-400 text-xs mt-1 font-medium">{coin.name}</p>
                      </div>
                   </div>
                   
                   <div className="text-right">
                      <p className="font-mono font-black text-2xl text-white tracking-tight">
                        ${coin.current_price < 1 ? coin.current_price.toFixed(4) : coin.current_price.toLocaleString()}
                      </p>
                      <span className="inline-flex items-center gap-1 text-emerald-400 text-xs font-bold mt-1">
                        <FiArrowUpRight />
                        {coin.price_change_percentage_24h.toFixed(2)}%
                      </span>
                   </div>
                </div>

                {/*  grafik  */}
                <div className="absolute bottom-0 left-0 right-0 h-20 w-full z-10 opacity-30 group-hover:opacity-50 transition-all duration-500 pointer-events-none">
                   <svg 
                      viewBox="0 0 500 150" 
                      preserveAspectRatio="none" 
                      className="w-full h-full text-emerald-500 fill-current"
                   >
                      <defs>
                        <linearGradient id={`grad-${index}`} x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="currentColor" stopOpacity="0.5" />
                          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <path 
                        d="M0,120 C50,120 40,80 100,80 C150,80 180,110 240,70 C300,30 330,80 390,40 C440,5 450,40 500,20 L500,150 L0,150 Z" 
                        fill={`url(#grad-${index})`} 
                      />
                      <path 
                        d="M0,120 C50,120 40,80 100,80 C150,80 180,110 240,70 C300,30 330,80 390,40 C440,5 450,40 500,20" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="3" 
                        strokeLinecap="round"
                      />
                   </svg>
                </div>
             </div>
          ))}
        </div>
      </div>

      {/* Filtreler ve Arama */}
      <div className="sticky top-4 z-30 mb-6">
        <div className="bg-[#121212]/80 backdrop-blur-xl border border-white/5 p-2 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-4 shadow-2xl">
          
          {/* Filtre Butonları */}
          <div className="flex items-center gap-1 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar px-2">
            {filters.map(filter => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap border cursor-pointer ${
                  activeFilter === filter.id
                    ? 'bg-white text-black border-white shadow-lg'
                    : 'bg-transparent text-gray-400 border-transparent hover:text-white hover:bg-white/5'
                }`}
              >
                {filter.icon}
                {filter.label}
              </button>
            ))}
          </div>

          {/* Arama Çubuğu */}
          <div className="relative w-full md:w-80 group">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-yellow-400 transition-colors" size={18} />
            <input
              type="text"
              placeholder="Coin ara... (BTC, ETH)"
              value={search}
              onChange={handleSearchChange}
              className="w-full pl-11 pr-4 py-2.5 bg-black/50 border border-white/10 rounded-xl text-sm text-white focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400/50 transition-all outline-none placeholder-gray-600"
            />
          </div>
        </div>
      </div>

      {/* tablo */}
      <div className="bg-[#121212] border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
         <CoinTable
            currentCoins={currentCoins}
            indexOfFirstCoin={(currentPage - 1) * coinsPerPage}
            handleRowClick={handleRowClick}
          />
      </div>

      {/* Pagination */}
      <div className="flex justify-center pt-8">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          handleNext={handleNext}
          handlePrev={handlePrev}
        />
      </div>

      {/* Satın Al modalı */}
      {showBuyModal && (
        <BuySellModal
          allCoins={coins}
          onClose={() => setShowBuyModal(false)}
        />
      )}
    </div>
  );
};

export default MainPageView;