import ChartSection from "./ChartSection";
import CoinInfo from "./CoinInfo";
import StatsGrid from "./StatsGrid";
import { useGlobal } from "../../context/GlobalContext";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import { FiStar, FiArrowLeft, FiInfo, FiExternalLink } from "react-icons/fi";
import { Link } from "react-router-dom";

const DetailView = ({ coinData, chartData, days, setDays }) => {
  const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useGlobal();

  if (!coinData) {
    return <LoadingSpinner message="Piyasa verileri analiz ediliyor..." />;
  }

  const inWatchlist = isInWatchlist(coinData.id);

  const handleWatchlistToggle = () => {
    if (inWatchlist) {
      removeFromWatchlist(coinData.id);
    } else {
      addToWatchlist(coinData.id);
    }
  };

  return (
    <div className="min-h-screen pt-6 pb-12 px-0 md:px-4 max-w-350 mx-auto animate-fade-in">

      {/* Üst nav */}
      <div className="flex justify-between items-center mb-6">
        <Link
          to="/home"
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
        >
          <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/5 group-hover:border-yellow-400/50 group-hover:text-yellow-400 transition-all">
            <FiArrowLeft />
          </div>
          <span className="font-medium text-sm">Piyasalar</span>
        </Link>

        <button
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 border ${
            inWatchlist
              ? "bg-yellow-400 text-black border-yellow-400 shadow-[0_0_20px_rgba(250,204,21,0.3)]"
              : "bg-transparent text-gray-300 border-white/10 hover:border-yellow-400 hover:text-yellow-400"
          }`}
          onClick={handleWatchlistToggle}
        >
          <FiStar className={inWatchlist ? "fill-current" : ""} size={16} />
          {inWatchlist ? "İzleniyor" : "İzlemeye Al"}
        </button>
      </div>

      {/* Coin temel bilgileri */}
      <div className="mb-8">
        <CoinInfo coin={coinData} />
      </div>

      {/* Ana içerik grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Grafik ve Hakkında */}
        <div className="lg:col-span-2 space-y-8">
          <ChartSection
            chartData={chartData}
            days={days}
            setDays={setDays}
            coinName={coinData.name}
          />

          <div className="glass-panel p-6 md:p-8 rounded-3xl border border-white/5">
            <div className="flex items-center gap-2 mb-4">
              <FiInfo className="text-yellow-400" />
              <h3 className="text-lg font-bold text-white">
                Hakkında: {coinData.name}
              </h3>
            </div>

            <div className="prose prose-invert prose-sm max-w-none text-gray-400 leading-relaxed">
              <p
                dangerouslySetInnerHTML={{
                  __html:
                    coinData.description?.tr ||
                    coinData.description?.en ||
                    "Açıklama bulunamadı.",
                }}
                className="line-clamp-4 hover:line-clamp-none transition-all duration-500 cursor-pointer"
              />
            </div>

            {coinData.links?.homepage?.[0] && (
              <a
                href={coinData.links.homepage[0]}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-4 text-xs font-bold text-yellow-400 hover:text-yellow-300"
              >
                Resmi Websitesi <FiExternalLink />
              </a>
            )}
          </div>
        </div>

        {/*  İstatistikler */}
        <div className="lg:col-span-1 space-y-6">
          <div className="flex items-center gap-2 mb-2 px-2">
            <div className="w-1 h-5 bg-yellow-400 rounded-full"></div>
            <h3 className="font-bold text-white">Piyasa Verileri</h3>
          </div>

          <StatsGrid coin={coinData} />

          <div className="glass-panel p-6 rounded-2xl bg-linear-to-br from-purple-500/5 to-blue-500/5 border border-white/5">
            <p className="text-xs font-bold text-gray-500 uppercase mb-2">
              Likidite Skoru
            </p>

            <div className="flex items-end gap-2">
              <span className="text-3xl font-black text-white">
                {coinData.liquidity_score?.toFixed(1) || "N/A"}
              </span>
              <span className="text-sm text-gray-400 mb-1">/ 100</span>
            </div>

            <div className="w-full bg-gray-800 h-1.5 rounded-full mt-3 overflow-hidden">
              <div
                className="h-full bg-linear-to-r from-purple-400 to-blue-400"
                style={{ width: `${coinData.liquidity_score || 0}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailView;