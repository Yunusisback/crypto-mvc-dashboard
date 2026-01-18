import { useTranslation } from 'react-i18next';
import { FiTrendingUp, FiTrendingDown, FiHash } from 'react-icons/fi';
import { motion } from 'framer-motion'; 

const CoinInfo = ({ coin }) => {
  const { t } = useTranslation();
  if (!coin) return null;

  const currentPrice = coin.market_data?.current_price?.usd || 0;
  const priceChange = coin.market_data?.price_change_percentage_24h || 0;
  const isPositive = priceChange >= 0;

  return (
    <div className="relative w-full mb-8 select-none">

      {/* Arka plan dekoratif ışık efektleri */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-3xl opacity-60">
        <div className="absolute top-[-30%] left-[-20%] w-[60%] h-[140%] bg-linear-to-br from-violet-600/20 to-transparent blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-40%] right-[-20%] w-[50%] h-[140%] bg-linear-to-tl from-cyan-500/15 to-transparent blur-[100px] rounded-full"></div>
      </div>

      {/* Ana Kart */}
      <motion.div
        whileHover={{ y: -4, transition: { duration: 0.3 } }}
        className="relative z-10 glass-panel rounded-3xl border border-white/10 backdrop-blur-2xl shadow-2xl overflow-hidden"
      >
        {/* Hafif iç gradient  */}
        <div className="absolute inset-0 bg-linear-to-br from-white/5 via-transparent to-white/5 pointer-events-none"></div>

        <div className="relative z-10 p-6 md:p-10 flex flex-col md:flex-row items-center md:items-start justify-between gap-8">

          {/* Logo ve Bilgiler */}
          <div className="flex items-center gap-6">
            <div className="relative group shrink-0">

              {/* Logo arka glow  */}
              <div className="absolute inset-0 bg-linear-to-br from-cyan-400/30 to-violet-500/30 blur-2xl rounded-full scale-110 group-hover:scale-125 transition-transform duration-700 opacity-70"></div>

              {/* Logo çerçevesi  */}
              <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full p-0.5 bg-linear-to-br from-white/20 via-transparent to-white/10">
                <div className="w-full h-full rounded-full overflow-hidden bg-black/40 backdrop-blur-md border border-white/10">
                  <img
                    src={coin.image?.large}
                    alt={coin.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </div>

              {/* Rank Badge*/}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1 px-3 py-1 rounded-full bg-black/70 backdrop-blur-xl border border-white/20 text-xs font-bold text-gray-300 shadow-lg">
                <FiHash size={12} className="text-gray-500" />
                #{coin.market_cap_rank}
              </div>
            </div>


            <div className="text-center md:text-left">
              
              {/* Coin Adı  */}
              <h1 className="text-4xl md:text-6xl font-black tracking-tight bg-linear-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent drop-shadow-md">
                {coin.name}
              </h1>

              {/* sembol */}
              <div className="mt-3">
                <span className="inline-block px-4 py-1.5 rounded-full bg-linear-to-r from-cyan-500/10 to-violet-500/10 text-cyan-300 border border-cyan-500/30 text-sm font-bold uppercase tracking-wider shadow-md">
                  {coin.symbol}
                </span>
              </div>
            </div>
          </div>

          {/* Fiyat ve Değişim */}
          
          <div className="flex flex-col items-center md:items-end">

            {/* Canlı Fiyat Etiketi */}
            <div className="flex items-center gap-2 text-gray-500 text-xs font-semibold uppercase tracking-widest mb-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-lg shadow-emerald-400/50"></div>
              {t('livePrice') || 'Canlı Fiyat'}
            </div>

            {/* Fiyat */}
            <div className="text-5xl md:text-7xl font-mono font-extrabold text-white tracking-tighter drop-shadow-xl">
              ${currentPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 6 })}
            </div>

            {/* 24h Değişim */}
            <div
              className={`
                mt-6 flex items-center gap-3 px-6 py-3 rounded-2xl text-xl font-bold backdrop-blur-2xl border transition-all duration-500 shadow-lg
                ${isPositive
                  ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30 shadow-emerald-500/20'
                  : 'bg-red-500/10 text-red-300 border-red-500/30 shadow-red-500/20'}
              `}
            >
              {isPositive ? <FiTrendingUp size={28} /> : <FiTrendingDown size={28} />}
              <span>{Math.abs(priceChange).toFixed(2)}%</span>
              <span className="text-sm opacity-70 font-medium">(24h)</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CoinInfo;