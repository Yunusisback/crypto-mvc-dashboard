import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

const StatsGrid = ({ coin }) => {
  const { t } = useTranslation();

  const statsData = useMemo(() => {
    if (!coin || !coin.market_data) return [];

      // Piyasa verilerini al
    const marketData = coin.market_data;
    const priceChange = marketData.price_change_percentage_24h || 0;

    return [
      { 
        label: t('market_rank', 'Piyasa Sırası'), 
        value: `#${coin.market_cap_rank || 'N/A'}` 
      },
      { 
        label: t('current_price', 'Güncel Fiyat'), 
        value: `$${marketData.current_price?.usd?.toLocaleString() || '0'}` 
      },
      { 
        label: t('24h_change', '24s Değişim'), 
        value: `${priceChange.toFixed(2)}%`, 
        isPositive: priceChange > 0
      },
      { 
        label: t('market_cap', 'Market Hacmi'), 
        value: `$${((marketData.market_cap?.usd || 0) / 1e9).toFixed(2)}B` 
      }
    ];
  }, [coin, t]);

  if (!coin || statsData.length === 0) return null;

  return (
    <div className="space-y-4">
      {statsData.map((item, index) => (
        <div 
          key={index} 
          className="flex justify-between items-center py-3 border-b border-gray-800 last:border-0 hover:bg-white/5 transition-colors px-2 rounded-lg"
        >
          <span className="text-gray-400 text-sm font-medium">
            {item.label}
          </span>
          <span className={`font-bold font-mono ${
            item.isPositive !== undefined 
              ? item.isPositive ? 'text-emerald-400' : 'text-red-400'
              : 'text-white'
          }`}>
            {item.value}
          </span>
        </div>
      ))}
    </div>
  );
};

export default StatsGrid;