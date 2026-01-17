import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import ErrorMessage from "../../components/ui/ErrorMessage";
import PremiumChartAnimation from '../../components/ui/PremiumChartAnimation';
import { FiPieChart, FiArrowRight, FiBell, FiHeadphones, FiChevronDown, FiSearch, FiActivity } from 'react-icons/fi';
import PortfolioSidebar from './components/PortfolioSidebar';
import BalanceChart from './components/BalanceChart';
import BuySellModal from './components/BuySellModal'; 

const DashboardView = ({
  isLoading,
  error,
  watchlistCoins,
  allCoins,
  portfolioStats,
  transactions,
  handleRefresh,
  handleCoinClick
}) => {

  const { t, i18n } = useTranslation();
  const [period, setPeriod] = useState('1W');
  const [showBuyModal, setShowBuyModal] = useState(false); 

  const toggleLanguage = () => {
    const newLang = i18n.language === 'tr' ? 'en' : 'tr';
    i18n.changeLanguage(newLang);
  };

  if (isLoading) return <LoadingSpinner message={t('loading')} />;
  if (error) return <ErrorMessage message={error} onRetry={handleRefresh} />;

  return (
    <div className="min-h-screen pt-6 pb-12 px-4 md:px-8 max-w-400 mx-auto animate-fade-in">

      {/* Header Alanı */}
      <div className="flex flex-col xl:flex-row justify-between items-center mb-10 gap-6">

        {/* Arama Çubuğu  */}
        <div className="w-full xl:w-auto flex items-center">

          {/* Dış Wrapper */}
          <div className="relative group w-full md:w-96 rounded-2xl p-px overflow-hidden">

            {/* Dönen Arka Plan Işığı */}
            <div className="absolute -inset-full animate-spin [animation-duration:5s] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,transparent_50%,rgba(255,255,255,0.2)_100%)]"></div>

            {/* İnput Alanı */}
            <div className="relative z-10 flex items-center w-full h-full bg-[#0a0a0a] rounded-2xl px-5 py-3.5 border border-white/5 transition-colors duration-300 group-hover:bg-[#121212]">
              <FiSearch
                className="text-gray-500 mr-3 transition-colors duration-300 group-hover:text-white group-focus-within:text-yellow-400"
                size={20}
              />
              <input
                type="text"
                placeholder={t('search_placeholder')}
                className="bg-transparent border-none outline-none text-sm font-medium text-white placeholder-gray-500 w-full group-focus-within:placeholder-gray-400 transition-all"
              />
            </div>
          </div>
        </div>

        {/* Profil ve Bildirimler */}
        <div className="flex items-center gap-4 w-full xl:w-auto justify-end">

          {/* İkon Grubu (Dil  Destek  Bildirim) */}
          <div className="flex items-center gap-1 bg-[#0a0a0a] p-1.5 rounded-2xl border border-white/10 shadow-lg shadow-black/20">

            {/* Dil Değiştirici */}
            <button
              onClick={toggleLanguage}
              className="w-10 h-10 rounded-xl flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 transition-all text-xs font-black tracking-wider"
              title={t('change_language')}
            >
              {i18n.language.toUpperCase()}
            </button>

            <div className="w-px h-5 bg-white/10 mx-1"></div>

            {/* Destek  */}
            <button
              className="w-10 h-10 rounded-xl flex items-center justify-center text-gray-400 hover:text-yellow-400 hover:bg-white/5 transition-all relative group"
              title={t('help')}
            >
              <FiHeadphones size={20} className="transition-transform group-hover:scale-110" />

              {/* Yanıp Sönen Yeşil Nokta  */}
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-emerald-500 rounded-full border border-[#0a0a0a] animate-pulse shadow-[0_0_8px_#10b981]"></span>
            </button>

            {/* Bildirimler */}
            <button
              className="w-10 h-10 rounded-xl flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 transition-all relative group"
              title={t('notifications')}
            >
              <FiBell size={20} className="transition-transform group-hover:rotate-12" />

              {/* Yanıp Sönen Kırmızı Nokta */}
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-[#0a0a0a] animate-pulse shadow-[0_0_8px_#ef4444]"></span>
            </button>
          </div>

          {/* Profil Kartı */}
          <div className="flex items-center gap-3 pl-2 pr-4 py-1.5 bg-[#0a0a0a] hover:bg-[#121212] rounded-2xl border border-white/10 hover:border-yellow-400/30 transition-all cursor-pointer group shadow-lg">
            <div className="w-11 h-11 rounded-xl bg-linear-to-tr from-yellow-400 to-yellow-600 p-0.5 shadow-[0_0_15px_rgba(250,204,21,0.2)] group-hover:shadow-[0_0_20px_rgba(250,204,21,0.4)] transition-shadow">
              <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="Profile" className="w-full h-full rounded-[10px] object-cover border border-black/20" />
            </div>
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-white leading-none group-hover:text-yellow-400 transition-colors">Ely John</p>
            </div>
            <FiChevronDown className="text-gray-500 group-hover:text-white transition-colors" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Ana İçerik */}
        <div className="lg:col-span-8 space-y-8">

          {/* banner */}
          <div className="relative rounded-4xl p-10 overflow-hidden group border border-white/5 shadow-2xl">

            {/* Arka Plan Efektleri */}
            <div className="absolute inset-0 bg-[#121212]"></div>
            <div className="absolute top-0 right-0 w-125 h-125 bg-linear-to-b from-yellow-600/20 to-transparent rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4"></div>
            <div className="absolute bottom-0 left-0 w-75 h-75 bg-blue-600/10 rounded-full blur-[80px] translate-y-1/3 -translate-x-1/4"></div>

            {/* Banner İçeriği */}
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="max-w-lg text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-400/10 border border-yellow-400/20 text-yellow-400 text-xs font-bold uppercase tracking-wider mb-4">
                  <FiActivity /> {t('weekly_analysis')}
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight">
                  {t('portfolio_ai_title')} <br /> <span className="text-transparent bg-clip-text bg-linear-to-r from-white to-gray-500">{t('portfolio_ai_subtitle')}</span>
                </h2>
                <p className="text-gray-400 mb-8 leading-relaxed">
                  {t('portfolio_ai_desc')}
                </p>
                <div className="flex gap-4 justify-center md:justify-start">
                  <button className="bg-white text-black px-8 py-3.5 rounded-xl font-bold hover:bg-yellow-400 transition-all shadow-lg hover:shadow-yellow-400/20 active:scale-95 cursor-pointer">
                    {t('start_analysis')}
                  </button>
                  <button className="px-8 py-3.5 rounded-xl font-bold text-white border border-white/10 hover:bg-white/5 transition-all cursor-pointer">
                    {t('more_info')}
                  </button>
                </div>
              </div>

              {/* grafik animasyonu */}
              <div className="hidden md:block">
                <PremiumChartAnimation />
              </div>
            </div>
          </div>

          {/* Portföy Grafiği */}
          <div className="relative group rounded-4xl p-px bg-linear-to-b from-white/10 to-transparent shadow-2xl">

            {/* Arka planda hafif sarı ambient ışık */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-yellow-500/5 rounded-full blur-[80px] group-hover:bg-yellow-500/10 transition-colors duration-500"></div>

            <div className="bg-[#0D0D0D] rounded-[1.9rem] p-6 md:p-8 relative z-10 border border-white/5 group-hover:border-yellow-500/20 transition-colors duration-500">

              {/* Header */}
              <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <div>
                  <h3 className="text-xl font-black text-white flex items-center gap-3">
                    <span className="w-1 h-6 bg-yellow-400 rounded-full shadow-[0_0_10px_#facc15]"></span>
                    {t('portfolio_performance')}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1 pl-4 font-medium tracking-wide">
                    {t('portfolio_change_desc')}
                  </p>
                </div>

                {/* Zaman Seçici */}
                <div className="flex bg-[#1A1A1A] p-1 rounded-xl border border-white/5">
                  {[
                    { label: '1G', value: '1D' },
                    { label: '1H', value: '1W' },
                    { label: '1A', value: '1M' },
                    { label: '1Y', value: '1Y' },
                    { label: t('all_markets'), value: 'ALL' }
                  ].map((item) => (
                    <button
                      key={item.value}
                      onClick={() => setPeriod(item.value)}
                      className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all duration-300 ${period === item.value
                          ? 'bg-yellow-400 text-black shadow-[0_0_10px_rgba(250,204,21,0.4)]'
                          : 'text-gray-500 hover:text-white hover:bg-white/5'
                        }`}
                    >
                      {item.label === t('all_markets') && item.value === 'ALL' ? 'Tümü' : item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Grafik Alanı */}
              <div className="h-87.5 w-full -ml-2">
                <BalanceChart period={period} />
              </div>
            </div>
          </div>

          {/* İzleme Listesi */}
          <div className="glass-panel p-6 md:p-8 rounded-4xl border border-white/5">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-bold text-white flex items-center gap-3">
                <div className="p-2 bg-yellow-400/10 rounded-lg text-yellow-400">
                  <FiPieChart size={20} />
                </div>
                {t('watchlist')}
              </h2>
              <Link to="/home" className="group flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-white transition-colors bg-white/5 px-4 py-2 rounded-full border border-white/5 hover:border-white/20">
                {t('all_markets')}
                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {watchlistCoins.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {watchlistCoins.map((coin) => (
                  <div
                    key={coin.id}
                    onClick={() => handleCoinClick(coin.id)}
                    className="group relative p-5 rounded-2xl bg-[#0a0a0a] border border-white/5 hover:border-yellow-400/30 transition-all duration-300 cursor-pointer overflow-hidden"
                  >
                    {/* Hover Glow */}
                    <div className="absolute inset-0 bg-linear-to-r from-yellow-400/0 via-yellow-400/0 to-yellow-400/0 group-hover:via-yellow-400/5 transition-all duration-500"></div>

                    <div className="relative z-10 flex items-center gap-4">
                      <div className="relative">
                        <img
                          src={coin.image}
                          alt={coin.name}
                          className="w-12 h-12 rounded-full group-hover:scale-110 transition-transform duration-300 bg-white/5 p-1"
                        />
                        <div className="absolute -bottom-1 -right-1 bg-[#0a0a0a] rounded-full p-0.5">
                          {coin.price_change_percentage_24h > 0
                            ? <div className="w-4 h-4 bg-emerald-500 rounded-full border-2 border-[#0a0a0a]"></div>
                            : <div className="w-4 h-4 bg-red-500 rounded-full border-2 border-[#0a0a0a]"></div>
                          }
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-bold text-white text-lg leading-tight group-hover:text-yellow-400 transition-colors truncate">
                              {coin.symbol.toUpperCase()}
                            </h4>
                            <span className="text-xs text-gray-500 font-medium truncate block">{coin.name}</span>
                          </div>
                          <div className="text-right">
                            <div className="text-white font-mono font-bold tracking-tight">
                              ${coin.current_price.toLocaleString()}
                            </div>
                            <div className={`text-xs font-bold mt-0.5 inline-flex items-center px-1.5 py-0.5 rounded-md ${coin.price_change_percentage_24h > 0
                                ? 'bg-emerald-500/10 text-emerald-400'
                                : 'bg-red-500/10 text-red-400'
                              }`}>
                              {coin.price_change_percentage_24h > 0 ? '+' : ''}{coin.price_change_percentage_24h.toFixed(2)}%
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 border-2 border-dashed border-white/5 rounded-2xl bg-white/2">
                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
                  <FiSearch className="text-gray-500 text-2xl" />
                </div>
                <p className="text-gray-400 mb-6 font-medium">{t('watchlist_empty')}</p>
                <Link to="/home" className="bg-yellow-400 text-black px-8 py-3 rounded-xl font-bold hover:bg-yellow-300 transition shadow-lg shadow-yellow-400/20 inline-flex items-center gap-2">
                  <span className="text-xl leading-none">+</span> {t('add_coin')}
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Yan Çubuk */}
        <div className="lg:col-span-4">
          <div className="sticky top-24">
            <PortfolioSidebar
              allCoins={allCoins}
              stats={portfolioStats}
              transactions={transactions}
              onBuyClick={() => setShowBuyModal(true)} 
            />
          </div>
        </div>

      </div>

      {showBuyModal && (
        <BuySellModal
          allCoins={allCoins}
          onClose={() => setShowBuyModal(false)}
        />
      )}
    </div>
  );
};

export default DashboardView;