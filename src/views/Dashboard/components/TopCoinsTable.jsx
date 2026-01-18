import millify from 'millify';
import { useTranslation } from 'react-i18next';
import { useGlobal } from '../../../context/GlobalContext';
import { FiStar, FiArrowUp, FiArrowDown } from 'react-icons/fi';

const TopCoinsTable = ({ coins, onCoinClick }) => {
  const { t } = useTranslation();
  const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useGlobal();

  const handleWatchlistToggle = (e, coinId) => {
    e.stopPropagation();
    if (isInWatchlist(coinId)) {
      removeFromWatchlist(coinId);
    } else {
      addToWatchlist(coinId);
    }
  };

  return (
    <div className="glass-panel rounded-2xl p-6 select-none">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          <div className="w-1 h-8 bg-yellow-400 rounded-full"></div>
          {t('top_coins')}
        </h2>
        <span className="px-4 py-2 bg-yellow-400/10 text-yellow-400 rounded-full text-xs font-bold border border-yellow-400/20">
          {t('market_cap')}
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left py-4 px-4 text-gray-400 text-xs uppercase tracking-wider font-semibold">#</th>
              <th className="text-left py-4 px-4 text-gray-400 text-xs uppercase tracking-wider font-semibold">{t('coin')}</th>
              <th className="text-right py-4 px-4 text-gray-400 text-xs uppercase tracking-wider font-semibold">{t('price')}</th>
              <th className="text-right py-4 px-4 text-gray-400 text-xs uppercase tracking-wider font-semibold">24h</th>
              <th className="text-right py-4 px-4 text-gray-400 text-xs uppercase tracking-wider font-semibold">7d</th>
              <th className="text-right py-4 px-4 text-gray-400 text-xs uppercase tracking-wider font-semibold">{t('market_cap')}</th>
              <th className="text-right py-4 px-4 text-gray-400 text-xs uppercase tracking-wider font-semibold">{t('volume')}</th>
              <th className="text-center py-4 px-4 text-gray-400 text-xs uppercase tracking-wider font-semibold">★</th>
            </tr>
          </thead>
          <tbody>
            {coins.map((coin, index) => {
              const isPositive24h = coin.price_change_percentage_24h >= 0;
              const isPositive7d = (coin.price_change_percentage_7d_in_currency || 0) >= 0;
              const inWatchlist = isInWatchlist(coin.id);

              return (
                <tr 
                  key={coin.id} 
                  onClick={() => onCoinClick(coin.id)}
                  className="border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer group"
                >
                  <td className="py-4 px-4 text-gray-400 font-bold">{index + 1}</td>
                  
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <img 
                        src={coin.image} 
                        alt={coin.name} 
                        className="w-10 h-10 rounded-full group-hover:scale-110 transition-transform"
                      />
                      <div>
                        <div className="font-bold text-white group-hover:text-yellow-400 transition-colors">
                          {coin.name}
                        </div>
                        <div className="text-xs text-gray-500 uppercase font-bold">
                          {coin.symbol}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="py-4 px-4 text-right text-white font-mono font-semibold">
                    ${coin.current_price.toLocaleString()}
                  </td>

                  <td className="py-4 px-4 text-right">
                    <div className={`inline-flex items-center gap-1 ${isPositive24h ? 'text-emerald-400' : 'text-red-400'}`}>
                      {isPositive24h ? <FiArrowUp size={14} /> : <FiArrowDown size={14} />}
                      <span className="font-bold">{Math.abs(coin.price_change_percentage_24h || 0).toFixed(2)}%</span>
                    </div>
                  </td>

                  <td className="py-4 px-4 text-right">
                    <div className={`inline-flex items-center gap-1 ${isPositive7d ? 'text-emerald-400' : 'text-red-400'}`}>
                      {isPositive7d ? <FiArrowUp size={14} /> : <FiArrowDown size={14} />}
                      <span className="font-bold">{Math.abs(coin.price_change_percentage_7d_in_currency || 0).toFixed(2)}%</span>
                    </div>
                  </td>

                  <td className="py-4 px-4 text-right text-gray-400 font-mono">
                    ${millify(coin.market_cap)}
                  </td>

                  <td className="py-4 px-4 text-right text-gray-400 font-mono">
                    ${millify(coin.total_volume)}
                  </td>

                  <td className="py-4 px-4 text-center">
                    <button
                      type="button"
                      onClick={(e) => handleWatchlistToggle(e, coin.id)}
                      className={`p-2 rounded-full transition-all hover:scale-110 ${
                        inWatchlist 
                          ? 'text-yellow-400 bg-yellow-400/10' 
                          : 'text-gray-500 hover:text-yellow-400 hover:bg-yellow-400/10'
                      }`}
                      aria-label={inWatchlist ? t('removed_from_watchlist') : t('added_to_watchlist')}
                    >
                      <FiStar size={18} fill={inWatchlist ? 'currentColor' : 'none'} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopCoinsTable;