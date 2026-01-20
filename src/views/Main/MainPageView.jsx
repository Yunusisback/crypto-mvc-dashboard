import { useState, useMemo } from 'react';
import CoinTable from "./CoinTable";
import Pagination from "./Pagination";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import ErrorMessage from "../../components/ui/ErrorMessage";
import BuySellModal from "../Dashboard/components/BuySellModal";
import { FiSearch, FiTrendingUp, FiActivity, FiZap, FiGlobe, FiBarChart2, FiArrowUpRight } from 'react-icons/fi';

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
    <div className="min-h-screen pt-8 pb-12 px-4 md:px-8 max-w-7xl mx-auto animate-fade-in font-inter select-none">

      {/* header*/}
      <div className="flex flex-col xl:flex-row justify-between items-end mb-12 gap-8 relative">
        
        {/* Başlık */}
        <div className="relative z-10 w-full xl:w-auto">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/20 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
            </span>
            <span className="text-[11px] font-bold text-yellow-400 tracking-widest uppercase">Canlı Piyasa</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-tight mb-2">
            Piyasa <span className="text-transparent bg-clip-text bg-linear-to-r from-yellow-400 to-yellow-600">Analizi</span>
          </h1>
          <p className="text-gray-400 text-sm md:text-base max-w-lg">
            Küresel kripto para piyasasındaki anlık değişimleri, hacim verilerini ve trendleri takip edin.
          </p>
        </div>

        {/* İstatistik Kartları */}
        <div className="flex gap-4 w-full xl:w-auto overflow-x-auto pb-4 xl:pb-0 scrollbar-hide">
          
          {/* Piyasa Değeri Kartı */}
          <div className="glass-card min-w-50 flex-1 p-5 rounded-2xl border border-white/5 bg-[#0a0a0a]/60 backdrop-blur-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <FiGlobe size={48} />
            </div>
            <div className="relative z-10">
                <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-2">
                    <span className="p-1 rounded bg-blue-500/10 text-blue-400"><FiGlobe /></span> Piyasa Değeri
                </p>
                <div className="text-2xl font-mono font-bold text-white mb-1">$2.58T</div>
                <div className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-md">
                    <FiArrowUpRight /> %1.2
                </div>
            </div>
          </div>

          {/* Hacim Kartı */}
          <div className="glass-card min-w-50 flex-1 p-5 rounded-2xl border border-white/5 bg-[#0a0a0a]/60 backdrop-blur-xl relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <FiActivity size={48} />
            </div>
            <div className="relative z-10">
                <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-2">
                    <span className="p-1 rounded bg-purple-500/10 text-purple-400"><FiActivity /></span> 24s Hacim
                </p>
                <div className="text-2xl font-mono font-bold text-white mb-1">$92.3B</div>
                <div className="inline-flex items-center gap-1 text-xs font-bold text-gray-400 bg-white/5 px-2 py-0.5 rounded-md">
                    Stabil
                </div>
            </div>
          </div>

        </div>
      </div>

      {/* top */}
      <div className="mb-12">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <FiTrendingUp className="text-emerald-400" /> Günün Yıldızları
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {topGainers.map((coin, index) => (
            <div
                key={coin.id}
                onClick={() => handleRowClick(coin.id)}
                className="group relative bg-[#0a0a0a] hover:bg-[#121212] border border-white/5 hover:border-yellow-400/20 p-5 rounded-2xl cursor-pointer transition-all duration-300 hover:-translate-y-1 overflow-hidden"
            >
                {/* Arka plan efekti */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400/5 rounded-full blur-3xl -mr-16 -mt-16 transition-all group-hover:bg-yellow-400/10"></div>
                
                <div className="relative z-10 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="relative">
                             <img src={coin.image} className="w-12 h-12 rounded-full shadow-lg group-hover:scale-110 transition-transform duration-300" alt={coin.name} />
                             <div className="absolute -top-1 -left-1 w-5 h-5 bg-[#1a1a1a] border border-white/10 rounded-full flex items-center justify-center text-[10px] font-bold text-yellow-400">
                                #{index + 1}
                             </div>
                        </div>
                        <div>
                            <h3 className="font-bold text-white text-lg leading-none mb-1 group-hover:text-yellow-400 transition-colors">{coin.symbol.toUpperCase()}</h3>
                            <p className="text-xs text-gray-500 font-medium">{coin.name}</p>
                        </div>
                    </div>
                    
                    <div className="text-right">
                        <div className="text-white font-mono font-bold text-lg">${coin.current_price.toLocaleString()}</div>
                        <div className="text-sm text-emerald-400 font-bold flex items-center justify-end gap-1">
                            <FiArrowUpRight />
                            %{coin.price_change_percentage_24h.toFixed(2)}
                        </div>
                    </div>
                </div>
            </div>
            ))}
        </div>
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


      {/* Tablo Alanı */}
      <div className="glass-panel bg-[#0a0a0a]/40 border border-white/5 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-sm">
        <div className="overflow-x-auto scrollbar-hide">
          <CoinTable
            currentCoins={currentCoins}
            indexOfFirstCoin={(currentPage - 1) * coinsPerPage}
            handleRowClick={handleRowClick}
          />
        </div>
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

      {/* Modal */}
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