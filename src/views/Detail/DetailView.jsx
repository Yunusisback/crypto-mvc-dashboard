import ChartSection from "./ChartSection";
import CoinInfo from "./CoinInfo";
import StatsGrid from "./StatsGrid";
import { useGlobal } from "../../context/GlobalContext";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import { FiStar, FiArrowLeft } from "react-icons/fi";
import { Link } from "react-router-dom";

const DetailView = ({ coinData, chartData, days, setDays }) => {
  const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useGlobal();

  if (!coinData) return <LoadingSpinner message="Varlık analizi yapılıyor..." />;

  const inWatchlist = isInWatchlist(coinData.id);

  const handleWatchlistToggle = () => {
    inWatchlist ? removeFromWatchlist(coinData.id) : addToWatchlist(coinData.id);
  };

  return (
    <div className="min-h-screen pt-28 pb-10 px-4 md:px-8 max-w-7xl mx-auto animate-fade-in">
      
        {/* Geri Dön Butonu ve Eylemler */}
      <div className="flex justify-between items-center mb-8">
        <Link to="/home" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group">
          <div className="p-2 rounded-full bg-white/5 group-hover:bg-white/10">
            <FiArrowLeft />
          </div>
          <span>Piyasaya Dön</span>
        </Link>

        <button 
          className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-bold transition-all duration-300 ${
            inWatchlist 
            ? 'bg-yellow-400 text-black shadow-lg shadow-yellow-400/20 hover:bg-yellow-300' 
            : 'bg-white/5 text-gray-300 border border-white/10 hover:border-yellow-400 hover:text-yellow-400'
          }`}
          onClick={handleWatchlistToggle}
        >
          <FiStar className={inWatchlist ? "fill-black" : ""} />
          {inWatchlist ? 'İzleniyor' : 'İzlemeye Al'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Sol Kenar Çubuğu */}
        <div className="lg:col-span-4 space-y-6">
          <div className="glass-panel p-8 rounded-3xl text-center relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-yellow-400 to-transparent opacity-50"></div>
             <CoinInfo coin={coinData} />
          </div>

          <div className="glass-panel p-6 rounded-3xl">
            <h3 className="text-lg font-bold text-white mb-4 border-b border-gray-800 pb-2">
              Piyasa İstatistikleri
            </h3>
            <StatsGrid coin={coinData} />
          </div>
        </div>

        {/* Ana İçerik Alanı */}
        <div className="lg:col-span-8">
          <div className="glass-panel p-6 md:p-8 rounded-3xl h-full flex flex-col">
            <ChartSection 
              chartData={chartData} 
              days={days} 
              setDays={setDays} 
              coinName={coinData.name} 
            />
            
            <div className="mt-6 p-4 bg-yellow-500/5 rounded-xl border border-yellow-500/10">
              <h4 className="text-yellow-400 font-bold mb-2 text-sm uppercase tracking-wide">
                Hakkında: {coinData.name}
              </h4>
              <p className="text-gray-400 text-sm leading-relaxed line-clamp-4 hover:line-clamp-none transition-all cursor-pointer">
                <span dangerouslySetInnerHTML={{ __html: coinData.description?.en || coinData.description?.tr || "Açıklama bulunamadı." }} />
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DetailView;