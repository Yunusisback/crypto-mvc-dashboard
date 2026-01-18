import { useTranslation } from 'react-i18next';
import { useGlobal } from '../../../context/GlobalContext';
import millify from 'millify';
import { FiX, FiStar } from 'react-icons/fi';

const WatchlistSection = ({ coins, onCoinClick }) => {
  const { t } = useTranslation();
  const { removeFromWatchlist } = useGlobal();

  if (!coins || coins.length === 0) {
    return (
      <div className="glass-panel rounded-2xl p-6 select-none">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <FiStar className="text-yellow-400" size={24} />
            {t('watchlist')}
          </h2>
        </div>
        <div className="text-center py-16">
          <div className="text-6xl mb-4 opacity-30">📊</div>
          <p className="text-xl font-bold text-white mb-2">{t('watchlist_empty', 'İzleme listesi boş')}</p>
          <p className="text-gray-400">{t('watchlist_add_hint', 'Takip etmek istediğiniz coinleri ekleyin')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-panel rounded-2xl p-6 select-none">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <FiStar className="text-yellow-400" size={24} />
          {t('watchlist')}
        </h2>
        <span className="px-3 py-1 bg-yellow-400/10 text-yellow-400 rounded-full text-xs font-bold">
          {coins.length} {t('coins', 'Coin')}
        </span>
      </div>

      <div className="space-y-3">
        {coins.map((coin) => {
          const isPositive = coin.price_change_percentage_24h >= 0;

          return (
            <div 
              key={coin.id} 
              className="relative group"
            >
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeFromWatchlist(coin.id);
                }}
                className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-red-500/10 text-red-400 opacity-0 group-hover:opacity-100 hover:bg-red-500/20 transition-all"
                aria-label={t('removed_from_watchlist')}
              >
                <FiX size={16} />
              </button>

              <div 
                onClick={() => onCoinClick(coin.id)}
                className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-yellow-400/50 transition-all cursor-pointer"
              >
                <img 
                  src={coin.image} 
                  alt={coin.name} 
                  className="w-12 h-12 rounded-full group-hover:scale-110 transition-transform"
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
                  <div className="text-white font-mono font-bold mb-1">
                    ${coin.current_price > 1 
                      ? millify(coin.current_price, { precision: 2 }) 
                      : coin.current_price.toLocaleString()}
                  </div>
                  <div className={`text-xs font-bold ${isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
                    {isPositive ? '↑' : '↓'} {Math.abs(coin.price_change_percentage_24h || 0).toFixed(2)}%
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WatchlistSection;