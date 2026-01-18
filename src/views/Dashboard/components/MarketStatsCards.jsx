import millify from 'millify';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import { FiDollarSign, FiActivity, FiLayers } from 'react-icons/fi';

const MarketStatsCards = ({ stats }) => {
  const { t } = useTranslation();

  const cards = useMemo(() => {
    if (!stats) return [];

    return [
      {
        label: t('total_market_cap'),
        value: `$${millify(stats.totalMarketCap || 0)}`,
        change: stats.marketCapChange,
        icon: <FiDollarSign size={24} />,
        color: 'yellow'
      },
      {
        label: t('v24h_volume'),
        value: `$${millify(stats.totalVolume || 0)}`,
        icon: <FiActivity size={24} />,
        color: 'blue'
      },
      {
        label: t('btc_dominance'),
        value: `${(stats.btcDominance || 0).toFixed(2)}%`,
        icon: <span className="text-2xl font-bold">₿</span>,
        color: 'orange'
      },
      {
        label: t('active_cryptos'),
        value: millify(stats.activeCryptos || 0),
        icon: <FiLayers size={24} />,
        color: 'green'
      }
    ];
  }, [stats, t]);

  
  const colorStyles = {
    yellow: { icon: 'text-yellow-400 bg-yellow-400/10', border: 'group-hover:border-yellow-400/50' },
    blue:   { icon: 'text-blue-400 bg-blue-400/10',     border: 'group-hover:border-blue-400/50' },
    orange: { icon: 'text-orange-400 bg-orange-400/10', border: 'group-hover:border-orange-400/50' },
    green:  { icon: 'text-emerald-400 bg-emerald-400/10', border: 'group-hover:border-emerald-400/50' },
  };

  if (!stats) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 select-none">
      {cards.map((card, index) => {
        const styles = colorStyles[card.color];
        
        return (
          <div 
            key={index} 
            className={`glass-card p-6 rounded-3xl relative overflow-hidden group border border-white/5 transition-all duration-300 ${styles.border}`}
          >
            {/* Arka plan parlaması */}
            <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity ${styles.icon.split(' ')[0].replace('text', 'bg')}`}></div>

            <div className="flex items-start justify-between mb-4 relative z-10">
              <div className={`p-3 rounded-2xl ${styles.icon} transition-transform group-hover:scale-110 duration-300`}>
                {card.icon}
              </div>
              
              {card.change !== undefined && (
                <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold border ${
                  card.change >= 0 
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                    : 'bg-red-500/10 text-red-400 border-red-500/20'
                }`}>
                  {card.change >= 0 ? '↑' : '↓'} {Math.abs(card.change).toFixed(2)}%
                </div>
              )}
            </div>

            <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">
              {card.label}
            </p>
            <h3 className="text-2xl font-black text-white font-mono tracking-tight">
              {card.value}
            </h3>
          </div>
        );
      })}
    </div>
  );
};

export default MarketStatsCards;