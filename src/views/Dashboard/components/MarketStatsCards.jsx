import millify from 'millify';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import { FiDollarSign, FiActivity, FiTrendingUp, FiLayers } from 'react-icons/fi';

const MarketStatsCards = ({ stats }) => {
  const { t } = useTranslation();

  const cards = useMemo(() => {
    if (!stats) return [];

    return [
      {
        label: t('total_market_cap'),
        value: `$${millify(stats.totalMarketCap || 0)}`,
        change: stats.marketCapChange,
        icon: <FiDollarSign size={28} />,
        color: 'yellow'
      },
      {
        label: t('v24h_volume'),
        value: `$${millify(stats.totalVolume || 0)}`,
        icon: <FiActivity size={28} />,
        color: 'blue'
      },
      {
        label: t('btc_dominance'),
        value: `${(stats.btcDominance || 0).toFixed(2)}%`,
        icon: <span className="text-3xl">₿</span>,
        color: 'orange'
      },
      {
        label: t('active_cryptos'),
        value: millify(stats.activeCryptos || 0),
        icon: <FiLayers size={28} />,
        color: 'green'
      }
    ];
  }, [stats, t]);

  if (!stats) return null;

  const colorClasses = {
    yellow: 'text-yellow-400',
    blue: 'text-blue-400',
    orange: 'text-orange-400',
    green: 'text-emerald-400'
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards.map((card, index) => (
        <div key={index} className="glass-card p-6 rounded-2xl hover:scale-105 transition-transform duration-300 cursor-pointer group">
          <div className="flex items-start justify-between mb-4">
            <div className={`${colorClasses[card.color]} group-hover:scale-110 transition-transform`}>
              {card.icon}
            </div>
            {card.change !== undefined && (
              <div className={`text-xs font-bold px-2 py-1 rounded-full ${
                card.change >= 0 
                  ? 'bg-emerald-500/10 text-emerald-400' 
                  : 'bg-red-500/10 text-red-400'
              }`}>
                {card.change >= 0 ? '↑' : '↓'} {Math.abs(card.change).toFixed(2)}%
              </div>
            )}
          </div>
          <p className="text-gray-400 text-xs uppercase tracking-wider mb-2">{card.label}</p>
          <p className="text-3xl font-black text-white font-mono">{card.value}</p>
        </div>
      ))}
    </div>
  );
};

export default MarketStatsCards;