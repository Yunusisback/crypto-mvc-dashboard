import { useState, useMemo } from 'react';
import CoinTable from "./CoinTable";
import Pagination from "./Pagination";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import ErrorMessage from "../../components/ui/ErrorMessage";
import BuySellModal from "../Dashboard/components/BuySellModal";
import { FiSearch, FiTrendingUp, FiActivity, FiZap, FiGlobe, FiBarChart2 } from 'react-icons/fi';

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

}) => {
  const [showBuyModal, setShowBuyModal] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');

  const topGainers = useMemo(() => {
    if (!coins || coins.length === 0) return [];
    return [...coins]
      .sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h)
      .slice(0, 3);
  }, [coins]);

  if (isLoading) return <LoadingSpinner message="Piyasa verileri yükleniyor..." />;
  if (error) return <ErrorMessage message={error} onRetry={() => window.location.reload()} />;

  const filters = [
    { id: 'all', label: 'Tüm Piyasalar', icon: <FiBarChart2 /> },
    { id: 'gainers', label: 'Yükselenler', icon: <FiTrendingUp /> },
    { id: 'volume', label: 'Yüksek Hacim', icon: <FiZap /> },
  ];

  return (
    <div className="min-h-screen pt-8 pb-12 px-4 md:px-8 max-w-350 mx-auto animate-fade-in">

      {/* header alanı */}
      <div className="flex flex-col lg:flex-row justify-between items-end mb-12 gap-8 relative">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20">
            <div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></div>
            <span className="text-[10px] font-bold text-yellow-400 tracking-widest uppercase">Canlı Piyasa</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-tight">
            <span className="text-transparent bg-clip-text bg-linear-to-r from-yellow-400 via-orange-500 to-amber-600 drop-shadow-sm">Güncel</span> Durum
          </h1>
        </div>

        {/* Piyasa Değeri ve Hacim Kartları */}
        <div className="flex gap-4 relative z-10 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">

          {/* Piyasa Değeri */}
          <div className="bg-[#121212] border border-white/5 p-4 rounded-2xl min-w-40 flex flex-col justify-center">
            <div className="text-gray-500 text-[10px] font-bold uppercase mb-1 flex items-center gap-1.5">
              <FiGlobe className="text-blue-400" /> Piyasa Değeri
            </div>
            <div className="text-xl font-mono font-bold text-white">$2.58T</div>
            <div className="text-[10px] text-emerald-400 font-bold mt-1">▲ %1.2</div>
          </div>

          {/* Hacim */}
          <div className="bg-[#121212] border border-white/5 p-4 rounded-2xl min-w-40 flex flex-col justify-center">
            <div className="text-gray-500 text-[10px] font-bold uppercase mb-1 flex items-center gap-1.5">
              <FiActivity className="text-purple-400" /> 24s Hacim
            </div>
            <div className="text-xl font-mono font-bold text-white">$92.3B</div>
            <div className="text-[10px] text-gray-400 font-bold mt-1">Stabil</div>
          </div>
        </div>
      </div>

      {/* top gainers */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {topGainers.map((coin) => (
          <div
            key={coin.id}
            onClick={() => handleRowClick(coin.id)}
            className="bg-[#0a0a0a] border border-white/10 hover:border-yellow-400/30 p-5 rounded-2xl cursor-pointer transition-all duration-200 group flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <img src={coin.image} className="w-10 h-10 rounded-full grayscale group-hover:grayscale-0 transition-all" alt={coin.name} />
              <div>
                <h3 className="font-bold text-white leading-tight group-hover:text-yellow-400 transition-colors">{coin.symbol.toUpperCase()}</h3>
                <p className="text-[10px] text-gray-500 font-medium">{coin.name}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-white font-mono font-bold">${coin.current_price.toLocaleString()}</div>
              <div className="text-xs text-emerald-400 font-bold mt-0.5">
                %{coin.price_change_percentage_24h.toFixed(2)}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filtre ve Arama */}
      <div className="sticky top-4 z-30 mb-6">
        <div className="bg-[#0a0a0a]/90 backdrop-blur-md border border-white/10 p-1.5 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-3 shadow-xl">

          {/* Filtreler */}
          <div className="flex items-center gap-1 overflow-x-auto w-full md:w-auto scrollbar-hide px-1">
            {filters.map(filter => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`
                    flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0
                    ${activeFilter === filter.id
                    ? 'bg-yellow-400 text-black shadow-lg shadow-yellow-400/20'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }
                  `}
              >
                {filter.icon}
                {filter.label}
              </button>
            ))}
          </div>

          {/* Arama*/}
          <div className="relative w-full md:w-64 group px-1 md:px-0">

            {/* Dış Wrapper */}
            <div className="relative w-full h-full rounded-xl overflow-hidden p-px">

              {/* Animasyon */}
              <div className="absolute -inset-full animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,transparent_50%,#ffffff_100%)] opacity-40"></div>


              {/*  input */}
              <div className="relative z-10 bg-[#121212] rounded-xl flex items-center h-full border border-transparent transition-all duration-300 group-hover:border-white/30 group-hover:bg-white/5">
                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-yellow-400 group-hover:text-gray-300 transition-colors" size={16} />
                <input
                  type="text"
                  placeholder="Coin ara..."
                  value={search}
                  onChange={handleSearchChange}
                  className="w-full bg-transparent border-none rounded-xl py-2.5 pl-10 pr-4 text-xs text-white focus:ring-0 transition-all outline-none placeholder-gray-600 font-medium h-full"
                />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Coin Tablosu */}
      <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto scrollbar-hide">
          <CoinTable
            currentCoins={currentCoins}
            indexOfFirstCoin={(currentPage - 1) * coinsPerPage}
            handleRowClick={handleRowClick}
          />
        </div>
      </div>

      <div className="flex justify-center pt-8">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          handleNext={handleNext}
          handlePrev={handlePrev}
        />
      </div>

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