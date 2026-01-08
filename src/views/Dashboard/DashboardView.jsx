
import { Link } from 'react-router-dom';
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import ErrorMessage from "../../components/ui/ErrorMessage";
import { FiPieChart, FiArrowRight, FiBell, FiHeadphones, FiChevronDown, FiSearch } from 'react-icons/fi';
import PortfolioSidebar from './components/PortfolioSidebar';
import BalanceChart from './components/BalanceChart';

const DashboardView = ({
  isLoading,
  error,
  trendingCoins,
  watchlistCoins,
  allCoins,
  handleRefresh,
  handleCoinClick
}) => {
  
  if (isLoading) return <LoadingSpinner message="Panel hazırlanıyor..." />;
  if (error) return <ErrorMessage message={error} onRetry={handleRefresh} />;

  return (
    <div className="min-h-screen pt-6 pb-10 px-4 md:px-8 max-w-400 mx-auto animate-fade-in">
      
      {/* header*/}
      <div className="flex flex-col xl:flex-row justify-between items-center mb-10 gap-6">
        
        {/* Sol Başlık ve Arama */}
        <div className="w-full xl:w-auto flex flex-col md:flex-row items-center gap-8">
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold text-white mb-1">
              Kontrol <span className="text-yellow-400">Paneli</span>
            </h1>
            <p className="text-gray-400 text-sm">Güncel portföy durumunuz.</p>
          </div>

          {/* Arama Çubuğu */}
          <div className="hidden md:flex items-center bg-[#121212] border border-white/5 rounded-full px-4 py-2.5 w-64 focus-within:border-yellow-500/50 transition-colors">
             <FiSearch className="text-gray-500 mr-2" />
             <input 
                type="text" 
                placeholder="Varlık ara..." 
                className="bg-transparent border-none outline-none text-sm text-white placeholder-gray-600 w-full"
             />
          </div>
        </div>

        {/* Sağ Aksiyonlar ve Profil  */}
        <div className="flex items-center gap-4 w-full xl:w-auto justify-end">
           
           {/* Canlı destek butonu */}
           <button className="w-11 h-11 rounded-full bg-[#121212] border border-white/5 flex items-center justify-center text-gray-400 hover:text-yellow-400 hover:border-yellow-500/30 transition-all shadow-lg group relative">
              <FiHeadphones size={20} />

              {/* Tooltip benzeri etiket */}
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500 border-2 border-[#121212]"></span>
              </span>
           </button>

           {/* Bildirim Butonu  */}
           <button className="w-11 h-11 rounded-full bg-[#121212] border border-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 transition-all shadow-lg relative">
              <FiBell size={20} />
              <div className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-[#121212]"></div>
           </button>

           {/* Ayırıcı Çizgi */}
           <div className="h-8 w-px bg-gray-800 mx-2"></div>

           {/*  Profil Alanı */}
           <div className="flex items-center gap-3 cursor-pointer hover:bg-[#121212] p-2 rounded-xl transition-colors border border-transparent hover:border-white/5">
              
              {/* İsim ve Rol */}
              <div className="text-right hidden sm:block">
                 <p className="text-sm font-bold text-white leading-none">Arya Wijaya</p>
                 <p className="text-[11px] text-gray-500 mt-1">Premium Üye</p>
              </div>

              {/* Avatar */}
              <div className="w-10 h-10 rounded-full bg-linear-to-tr from-yellow-400 to-yellow-600 p-0.5">
                 <img 
                   src="https://i.pravatar.cc/150?u=a042581f4e29026704d" 
                   alt="Profile" 
                   className="w-full h-full rounded-full object-cover border-2 border-[#050505]"
                 />
              </div>

              {/* Dropdown İkonu */}
              <FiChevronDown className="text-gray-500 hidden sm:block" />
           </div>

        </div>
      </div>

      {/* ana içerik*/}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Sol Grafik ve Listeler  */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Banner */}
          <div className="relative bg-[#121212] rounded-4xl p-8 text-white overflow-hidden shadow-2xl shadow-yellow-900/5 border border-white/5">
             <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-400/10 rounded-full -translate-y-1/2 translate-x-1/4 blur-3xl"></div>
             <div className="absolute bottom-0 left-0 w-48 h-48 bg-yellow-400/5 rounded-full translate-y-1/2 -translate-x-1/4 blur-2xl"></div>
             
             <div className="relative z-10 max-w-lg">
               <h2 className="text-3xl font-bold mb-4 leading-tight">Portföyünüzü <br/> Profesyonelce Yönetin</h2>
               <p className="text-gray-400 mb-8">Tüm işlem geçmişiniz, analizleriniz ve piyasa verileri tek ekranda.</p>
               <button className="bg-yellow-400 text-black px-8 py-3 rounded-xl font-bold hover:bg-yellow-300 transition shadow-lg shadow-yellow-400/20 cursor-pointer">
                 Detaylı Analiz
               </button>
             </div>
          </div>

          {/* Portföy Grafiği */}
          <div className="p-6 rounded-3xl border border-white/5 bg-[#121212]/80 backdrop-blur-md shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-white">Portföy Grafiği</h3>
              <span className="bg-yellow-400/10 text-yellow-400 px-3 py-1 rounded-lg text-sm font-bold border border-yellow-400/20">$ USD</span>
            </div>
            <BalanceChart />
          </div>
          
          {/* İzleme Listesi */}
          <div className="p-6 rounded-3xl border border-white/5 bg-[#121212]/50 backdrop-blur-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <FiPieChart className="text-yellow-400" />
                İzleme Listem
              </h2>
              <Link to="/home" className="text-sm text-yellow-400 hover:text-yellow-300 flex items-center gap-1">
                Tümünü Gör <FiArrowRight />
              </Link>
            </div>

            {watchlistCoins.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {watchlistCoins.map((coin) => (
                  <div 
                    key={coin.id} 
                    onClick={() => handleCoinClick(coin.id)}
                    className="p-4 rounded-2xl bg-[#0a0a0a] hover:bg-[#1a1a1a] border border-white/5 hover:border-yellow-400/50 transition-all cursor-pointer group flex items-center gap-3"
                  >
                    <img src={coin.image} alt={coin.name} className="w-10 h-10 rounded-full grayscale group-hover:grayscale-0 transition-all" />
                    <div className="flex-1">
                      <h4 className="font-bold text-white group-hover:text-yellow-400 transition-colors">{coin.symbol.toUpperCase()}</h4>
                      <span className="text-xs text-gray-500">{coin.name}</span>
                    </div>
                    <div className="text-right">
                       <div className="text-white font-mono font-bold">${coin.current_price.toLocaleString()}</div>
                       <div className={`text-xs font-bold ${coin.price_change_percentage_24h > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                         {coin.price_change_percentage_24h.toFixed(2)}%
                       </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 border border-dashed border-gray-800 rounded-2xl bg-black/20">
                <p className="text-gray-400 mb-4">Henüz izleme listeniz boş.</p>
                <Link to="/home" className="bg-yellow-400 text-black px-6 py-2 rounded-xl font-bold hover:bg-yellow-300 transition inline-flex items-center gap-2">
                  Coin Ekle
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Sağ Kenar Çubuğu */}
        <div className="lg:col-span-4">
          <PortfolioSidebar allCoins={allCoins} />
        </div>

      </div>
    </div>
  );
};

export default DashboardView;