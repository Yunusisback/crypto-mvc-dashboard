import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import { FiTrendingUp } from 'react-icons/fi';

const TrendingCoins = ({ coins, onCoinClick }) => {
  const { t } = useTranslation();

  const trendingList = useMemo(() => {
    return coins?.slice(0, 7).map(item => item.item) || [];
  }, [coins]);

  if (trendingList.length === 0) return null;

  return (
    <div className="glass-panel rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <FiTrendingUp className="text-red-400" size={24} />
          {t('trending_coins')}
        </h2>
        <span className="px-3 py-1 bg-red-400/10 text-red-400 rounded-full text-xs font-bold">
           Popüler
        </span>
      </div>

      <div className="space-y-3">
        {trendingList.map((coin, index) => (
          <div
            key={coin.id}
            onClick={() => onCoinClick(coin.id)}
            className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-yellow-400/50 transition-all cursor-pointer group"
          >
            <div className="text-yellow-400 font-black text-lg min-w-7.5">
              #{index + 1}
            </div>
            
            <img 
              src={coin.small} 
              alt={coin.name} 
              className="w-10 h-10 rounded-full group-hover:scale-110 transition-transform"
            />
            
            <div className="flex-1">
              <div className="font-bold text-white group-hover:text-yellow-400 transition-colors">
                {coin.name}
              </div>
              <div className="text-xs text-gray-500 uppercase font-bold">
                {coin.symbol}
              </div>
            </div>

            <div className="text-right">
              <div className="text-xs text-gray-500 mb-1">Skor</div>
              <div className="text-yellow-400 font-bold">{coin.score + 1}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingCoins;