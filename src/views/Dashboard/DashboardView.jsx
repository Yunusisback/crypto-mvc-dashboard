import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import ErrorMessage from "../../components/ui/ErrorMessage";
import PremiumChartAnimation from '../../components/ui/PremiumChartAnimation';
import { FiPieChart, FiArrowRight, FiBell, FiHeadphones, FiChevronDown, FiSearch, FiActivity, FiTrendingUp, FiTrendingDown } from 'react-icons/fi';
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

  const containerVars = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVars = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  if (isLoading) return <LoadingSpinner message={t('loading')} />;
  if (error) return <ErrorMessage message={error} onRetry={handleRefresh} />;

  return (
    <motion.div 
      variants={containerVars}
      initial="hidden"
      animate="show"
      className="min-h-screen pt-6 pb-12 px-4 md:px-8 max-w-400 mx-auto font-inter select-none relative"
    >
      
      {/* Header Alanı */}
      <motion.div variants={itemVars} className="flex flex-col xl:flex-row justify-between items-center mb-10 gap-6 relative z-10">

        {/* Arama Çubuğu */}
        <div className="relative w-full md:w-64 group px-1 md:px-0">
            <div className="relative w-full h-full rounded-xl overflow-hidden p-px">
                <div className="absolute -inset-full animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,transparent_50%,#ffffff_100%)] opacity-40"></div>
                
                <div className="relative z-10 bg-[#121212] rounded-xl flex items-center h-full border border-transparent transition-all duration-300 group-hover:border-white/30 group-hover:bg-white/5">
                    <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-yellow-400 group-hover:text-gray-300 transition-colors" size={16} />
                    <input 
                        type="text" 
                        placeholder={t('search_placeholder')}
                        className="w-full bg-transparent border-none rounded-xl py-2.5 pl-10 pr-4 text-xs text-white focus:ring-0 transition-all outline-none placeholder-gray-600 font-medium h-full"
                    />
                </div>
            </div>
        </div>

        {/* Profil ve Bildirimler */}
        <div className="flex items-center gap-4 w-full xl:w-auto justify-end">

          <div className="flex items-center gap-1 bg-[#0a0a0a]/60 backdrop-blur-xl p-1.5 rounded-2xl border border-white/10 shadow-lg">

            <button
              onClick={toggleLanguage}
              className="w-10 h-10 rounded-xl flex cursor-pointer items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all text-xs font-black tracking-wider"
            >
              {i18n.language.toUpperCase()}
            </button>

            <div className="w-px h-5 bg-white/10 mx-1"></div>

            <button className="w-10 h-10 rounded-xl flex items-center cursor-pointer justify-center text-gray-300 hover:text-primary hover:bg-white/10 transition-all relative group">
              <FiHeadphones size={20} className="transition-transform group-hover:scale-110" />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-emerald-400 rounded-full border border-[#0a0a0a] animate-pulse shadow-[0_0_8px_#34d399]"></span>
            </button>

            <button className="w-10 h-10 rounded-xl flex items-center cursor-pointer justify-center text-gray-300 hover:text-white hover:bg-white/10 transition-all relative group">
              <FiBell size={20} className="transition-transform group-hover:rotate-12" />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-[#0a0a0a] animate-pulse shadow-[0_0_8px_#ef4444]"></span>
            </button>
          </div>

          <div className="flex items-center gap-3 pl-2 pr-4 py-1.5 bg-[#0a0a0a]/60 hover:bg-[#1a1a1a]/80 backdrop-blur-xl rounded-2xl border border-white/10 hover:border-primary/30 transition-all cursor-pointer group shadow-lg">
            <div className="w-11 h-11 rounded-xl bg-linear-to-br from-primary to-[#8B6914] p-0.5 shadow-[0_0_15px_rgba(255,215,0,0.2)]">
              <img src="https://imgs.search.brave.com/T5FYY3ziZtmmhNwIDE5KKWsF4nIoEqXV3TTsRwvxmbc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAyMC8w/OS8yMi8xOC81NS9h/dmF0YXItNTU5NDA1/Ml82NDAucG5n" alt="Profile" className="w-full h-full rounded-[10px] object-cover border border-black/20" />
            </div>
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-white leading-none group-hover:text-primary transition-colors">DENİZ</p>
            </div>
            <FiChevronDown className="text-gray-500 group-hover:text-white transition-colors" />
          </div>
        </div>
      </motion.div>

      {/* Ana İçerik Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">

        <div className="lg:col-span-8 space-y-8">

          {/* Banner */}
          <motion.div 
            variants={itemVars}
            className="relative rounded-[2.5rem] p-8 md:p-10 overflow-hidden group border border-white/10 shadow-2xl bg-[#0a0a0a]"
          >
            <div className="absolute inset-0 bg-linear-to-r from-[#1a1a1a] via-[#0d0d0d] to-bg-dark"></div>
            <div className="absolute top-0 right-0 w-125 h-125 bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4 group-hover:bg-primary/10 transition-colors duration-700"></div>
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="max-w-lg text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-6 backdrop-blur-sm">
                  <FiActivity /> {t('weekly_analysis')}
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight">
                  {t('portfolio_ai_title')} <br /> 
                  <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-[#C5A358]">{t('portfolio_ai_subtitle')}</span>
                </h2>
                <p className="text-gray-400 mb-8 leading-relaxed">
                  {t('portfolio_ai_desc')}
                </p>
                <div className="flex gap-4 justify-center md:justify-start">
                  <button className="bg-primary text-black px-8 py-3.5 rounded-xl font-bold hover:bg-[#FDB931] transition-all shadow-[0_0_20px_rgba(255,215,0,0.3)] hover:shadow-[0_0_30px_rgba(255,215,0,0.5)] active:scale-95 cursor-pointer">
                    {t('start_analysis')}
                  </button>
                  <button className="px-8 py-3.5 rounded-xl font-bold text-white border border-white/10 hover:bg-white/5 hover:border-white/20 transition-all cursor-pointer backdrop-blur-sm">
                    {t('more_info')}
                  </button>
                </div>
              </div>

              <div className="hidden md:block transform group-hover:scale-105 transition-transform duration-500">
                <PremiumChartAnimation />
              </div>
            </div>
          </motion.div>

          {/* Portföy Grafiği */}
          <motion.div 
            variants={itemVars}
            className="relative group rounded-[2.5rem] p-px bg-linear-to-b from-white/10 to-transparent shadow-2xl overflow-hidden"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-primary/5 rounded-full blur-[100px] transition-colors duration-500"></div>

            <div className="bg-[#0a0a0a]/80 backdrop-blur-xl rounded-[2.4rem] p-6 md:p-8 relative z-10 border border-white/5">
              
              <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 relative z-10">
                <div>
                  <h3 className="text-xl font-black text-white flex items-center gap-3">
                    <span className="w-1.5 h-6 bg-primary rounded-full shadow-[0_0_10px_#FFD700]"></span>
                    {t('portfolio_performance')}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1 pl-5 font-medium tracking-wide flex items-center gap-2">
                    <span className="text-emerald-400 flex items-center gap-1 bg-emerald-400/10 px-1.5 rounded"><FiTrendingUp/> +%12.4</span> 
                    {t('portfolio_change_desc')}
                  </p>
                </div>

                <div className="flex bg-[#1A1A1A] p-1.5 rounded-xl border border-white/5">
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
                          ? 'bg-primary text-black shadow-lg shadow-primary/20'
                          : 'text-gray-500 hover:text-white hover:bg-white/5'
                        }`}
                    >
                      {item.label === t('all_markets') && item.value === 'ALL' ? 'Tümü' : item.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="h-87.5 w-full -ml-2 relative z-10">
                <BalanceChart period={period} />
              </div>
            </div>
          </motion.div>

          {/* İzleme Listesi */}
          <motion.div 
            variants={itemVars}
            className="bg-[#0a0a0a]/60 backdrop-blur-xl p-6 md:p-8 rounded-[2.5rem] border border-white/5 shadow-2xl"
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-bold text-white flex items-center gap-3">
                <div className="p-2.5 bg-primary/10 rounded-xl text-primary border border-primary/20">
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
                  <motion.div
                    key={coin.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleCoinClick(coin.id)}
                    className="group relative p-5 rounded-3xl bg-[#0f0f0f] border border-white/5 hover:border-primary/30 transition-all duration-300 cursor-pointer overflow-hidden shadow-lg"
                  >
                    <div className="absolute inset-0 bg-linear-to-br from-primary/0 via-primary/0 to-primary/0 group-hover:via-primary/5 transition-all duration-500"></div>

                    <div className="relative z-10 flex items-center gap-4">

                      <div className="relative">
                        <div className="w-14 h-14 rounded-2xl bg-black border border-white/10 p-2 group-hover:border-primary/30 transition-colors shadow-lg">
                            <img
                            src={coin.image}
                            alt={coin.name}
                            className="w-full h-full object-contain"
                            />
                        </div>
                        
                      
                        <div className="absolute -bottom-1 -right-1 bg-[#0a0a0a] rounded-full p-0.5">
                          {coin.price_change_percentage_24h > 0
                            ? <div className="w-3 h-3 bg-emerald-500 rounded-full border border-black shadow-[0_0_5px_#10b981]"></div>
                            : <div className="w-3 h-3 bg-red-500 rounded-full border border-black shadow-[0_0_5px_#ef4444]"></div>
                          }
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-bold text-white text-lg leading-tight group-hover:text-primary transition-colors truncate">
                              {coin.symbol.toUpperCase()}
                            </h4>
                            <span className="text-xs text-gray-500 font-medium truncate block mt-0.5">{coin.name}</span>
                          </div>
                          <div className="text-right">
                            <div className="text-white font-mono font-bold tracking-tight text-lg">
                              ${coin.current_price.toLocaleString()}
                            </div>
                            <div className={`text-xs font-bold mt-1 inline-flex items-center gap-1 px-2 py-0.5 rounded-md border ${coin.price_change_percentage_24h > 0
                                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                                : 'bg-red-500/10 text-red-400 border-red-500/20'
                              }`}>
                              {coin.price_change_percentage_24h > 0 ? <FiTrendingUp size={10}/> : <FiTrendingDown size={10}/>}
                              {coin.price_change_percentage_24h.toFixed(2)}%
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 border border-dashed border-white/10 rounded-3xl bg-white/2">
                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
                  <FiSearch className="text-gray-500 text-2xl" />
                </div>
                <p className="text-gray-400 mb-6 font-medium">{t('watchlist_empty')}</p>
                <Link to="/home" className="bg-primary text-black px-8 py-3 rounded-xl font-bold hover:bg-[#FDB931] transition shadow-lg shadow-primary/20 inline-flex items-center gap-2">
                  <span className="text-xl leading-none">+</span> {t('add_coin')}
                </Link>
              </div>
            )}
          </motion.div>
        </div>

        {/* Yan Menü */}
        <div className="lg:col-span-4 relative z-10">
          <div className="sticky top-6">
            <PortfolioSidebar
              allCoins={allCoins}
              stats={portfolioStats}
              transactions={transactions}
              onBuyClick={() => setShowBuyModal(true)} 
            />
          </div>
        </div>

      </div>

      {/* Alım Satım Modalı */}
      {showBuyModal && (
        <BuySellModal
          allCoins={allCoins}
          onClose={() => setShowBuyModal(false)}
        />
      )}
    </motion.div>
  );
};

export default DashboardView;