import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import millify from 'millify';
import { FiActivity, FiLayers,  FiTarget, FiBarChart2, FiPieChart } from 'react-icons/fi';

const StatsGrid = ({ coin }) => {
  const { t } = useTranslation();

  const stats = useMemo(() => {
    if (!coin || !coin.market_data) return [];
    const md = coin.market_data;

    return [
      { 
        label: t('market_cap', 'Piyasa Değeri'), 
        value: `$${millify(md.market_cap?.usd || 0)}`,
        subtext: "Piyasa Hakimiyeti: %" + (md.market_cap_change_percentage_24h?.toFixed(2) || 0),
        icon: <FiPieChart />,
        color: 'text-blue-400',
        bg: 'bg-blue-400/10',
        border: 'border-blue-400/20'
      },
      { 
        label: t('volume', '24s Hacim'), 
        value: `$${millify(md.total_volume?.usd || 0)}`,
        subtext: "Yüksek Likidite",
        icon: <FiActivity />,
        color: 'text-purple-400',
        bg: 'bg-purple-400/10',
        border: 'border-purple-400/20'
      },
      { 
        label: 'Dolaşan Arz', 
        value: `${millify(md.circulating_supply || 0)} ${coin.symbol?.toUpperCase()}`,
        subtext: "Maks: " + (md.max_supply ? millify(md.max_supply) : "Sınırsız"),
        icon: <FiLayers />,
        color: 'text-yellow-400',
        bg: 'bg-yellow-400/10',
        border: 'border-yellow-400/20'
      },
      { 
        label: 'Tüm Zamanlar (ATH)', 
        value: `$${md.ath?.usd?.toLocaleString() || 0}`,
        subtext: md.ath_change_percentage?.usd?.toFixed(1) + "% düşüş",
        icon: <FiTarget />,
        color: 'text-orange-400',
        bg: 'bg-orange-400/10',
        border: 'border-orange-400/20'
      }
    ];
  }, [coin, t]);

  if (!coin) return null;
  const md = coin.market_data;

  // 24s Range Hesaplama 
  const low24 = md?.low_24h?.usd || 0;
  const high24 = md?.high_24h?.usd || 0;
  const current = md?.current_price?.usd || 0;
  const rangePercent = high24 - low24 > 0 ? ((current - low24) / (high24 - low24)) * 100 : 0;

  return (
    <div className="space-y-4 select-none">
      
      {/* Grid Kartlar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {stats.map((item, index) => (
          <div 
            key={index} 
            className={`glass-panel p-5 rounded-2xl transition-all duration-300 hover:bg-white/5 border border-white/5 group hover:border-white/10`}
          >
            <div className="flex justify-between items-start mb-3">
               <div className={`p-2.5 rounded-xl ${item.bg} ${item.color} ${item.border} border shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {item.icon}
               </div>
               <div className="text-[10px] font-bold text-gray-500 uppercase bg-white/5 px-2 py-1 rounded-md">
                 Analiz
               </div>
            </div>
            
            <div className="space-y-1">
              <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">
                {item.label}
              </p>
              <p className="text-xl md:text-2xl font-mono font-black text-white tracking-tight">
                {item.value}
              </p>
              <p className="text-[10px] text-gray-500 font-medium">
                {item.subtext}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* 24 Saatlik Fiyat Aralığı  */}
      <div className="glass-panel p-6 rounded-2xl border border-white/5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <FiBarChart2 className="text-gray-400" />
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">24s Fiyat Aralığı</span>
          </div>
          <span className="text-xs font-mono text-yellow-400 bg-yellow-400/10 px-2 py-1 rounded">Canlı</span>
        </div>

        <div className="relative h-4 bg-[#1a1a1a] rounded-full w-full overflow-hidden shadow-inner border border-white/5">

          {/* Arka plan gradient */}
          <div 
            className="absolute top-0 left-0 h-full bg-linear-to-r from-red-500 via-yellow-500 to-emerald-500 opacity-80"
            style={{ width: '100%' }}
          ></div>
          
          {/* Gösterge Çubuğu */}
          <div 
            className="absolute top-0 bottom-0 w-1.5 bg-white shadow-[0_0_10px_white] z-10"
            style={{ left: `${Math.min(Math.max(rangePercent, 0), 100)}%` }}
          ></div>
        </div>

        <div className="flex justify-between mt-3 text-xs font-mono font-bold">
          <div className="text-left">
            <div className="text-gray-500 mb-0.5">En Düşük</div>
            <div className="text-red-400">${low24.toLocaleString()}</div>
          </div>
          <div className="text-right">
            <div className="text-gray-500 mb-0.5">En Yüksek</div>
            <div className="text-emerald-400">${high24.toLocaleString()}</div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default StatsGrid;