import { useTranslation } from 'react-i18next';
import { FiPlus, FiArrowUpRight, FiArrowDownLeft, FiRefreshCw, FiCreditCard, FiActivity, FiDollarSign, FiTrendingUp, FiTrendingDown } from 'react-icons/fi';
import CreditCard from '../Dashboard/components/CreditCard'; 


const WalletView = () => {
  const { t } = useTranslation();

  
  const assets = [
    { 
      id: 1, 
      symbol: 'BTC', 
      name: 'Bitcoin', 
      balance: 0.4521, 
      value: 28450.20, 
      change: '+2.4%',
      isUp: true,
      image: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=029',
      chartData: "M0,20 L10,18 L20,22 L30,15 L40,18 L50,10 L60,12 L70,5 L80,8 L90,2 L100,5"
    },
    { 
      id: 2, 
      symbol: 'ETH', 
      name: 'Ethereum', 
      balance: 4.2105, 
      value: 12340.50, 
      change: '-1.2%',
      isUp: false,
      image: 'https://cryptologos.cc/logos/ethereum-eth-logo.png?v=029',
      chartData: "M0,5 L10,8 L20,5 L30,12 L40,10 L50,18 L60,15 L70,22 L80,20 L90,25 L100,28"
    },
    { 
      id: 3, 
      symbol: 'USDT', 
      name: 'Tether', 
      balance: 5430.00, 
      value: 5430.00, 
      change: '+0.01%',
      isUp: true,
      image: 'https://cryptologos.cc/logos/tether-usdt-logo.png?v=029',
      chartData: "M0,15 L20,15 L40,14 L60,16 L80,15 L100,15" 
    },
    { 
      id: 4, 
      symbol: 'SOL', 
      name: 'Solana', 
      balance: 145.20, 
      value: 3420.10, 
      change: '+5.7%',
      isUp: true,
      image: 'https://cryptologos.cc/logos/solana-sol-logo.png?v=029',
      chartData: "M0,25 L10,22 L20,18 L30,20 L40,15 L50,10 L60,12 L70,5 L80,8 L90,2 L100,0"
    },
  ];

  return (
    <div className="min-h-screen pt-6 pb-12 px-4 md:px-8 max-w-7xl mx-auto animate-fade-in font-inter select-none">
      
      {/*  Header */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
        <div>
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-2">
            Cüzdan <span className="text-transparent bg-clip-text bg-linear-to-r from-yellow-400 to-yellow-600">Yönetimi</span>
          </h1>
          <p className="text-gray-400 text-sm md:text-base">
            Varlıklarınızı yönetin, transfer yapın ve bakiyenizi kontrol edin.
          </p>
        </div>
        
        {/* Hızlı İşlemler */}
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-yellow-400 text-black px-6 py-3 rounded-xl font-bold hover:bg-yellow-300 transition-all shadow-lg shadow-yellow-400/20 active:scale-95 cursor-pointer">
            <FiPlus size={20} /> {t('deposit') || 'Yatır'}
          </button>
          <button className="flex items-center gap-2 bg-[#1A1A1A] text-white border border-white/10 px-6 py-3 rounded-xl font-bold hover:bg-white/5 transition-all active:scale-95 cursor-pointer">
            <FiArrowUpRight size={20} /> {t('withdraw') || 'Çek'}
          </button>
        </div>
      </div>

      {/* Ana Grid  */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/*  Bakiye ve Varlıklar */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Toplam Bakiye Kartı */}
          <div className="glass-panel p-8 rounded-4xl border border-white/5 relative overflow-hidden group">

            {/* Arka plan ışık efekti */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 transition-all duration-700 group-hover:bg-yellow-500/20"></div>
            
            <div className="relative z-10">
              <p className="text-gray-400 text-sm font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
                Toplam Tahmini Bakiye <FiActivity className="text-yellow-400" />
              </p>
              <div className="flex items-end gap-3 mb-8">
                <span className="text-5xl md:text-6xl font-mono font-black text-white tracking-tighter drop-shadow-lg">
                  $49,640.80
                </span>
                <span className="text-black bg-emerald-400 font-bold px-2 py-1 rounded-lg text-sm mb-2 shadow-[0_0_15px_rgba(52,211,153,0.4)] animate-pulse">
                  +2.4%
                </span>
              </div>

              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: 'Transfer', icon: <FiArrowDownLeft />, color: 'text-blue-400', bg: 'bg-blue-500/20', border: 'hover:border-blue-500/50' },
                  { label: 'Dönüştür', icon: <FiRefreshCw />, color: 'text-purple-400', bg: 'bg-purple-500/20', border: 'hover:border-purple-500/50' },
                  { label: 'Satın Al', icon: <FiDollarSign />, color: 'text-orange-400', bg: 'bg-orange-500/20', border: 'hover:border-orange-500/50' }
                ].map((btn, idx) => (
                  <div key={idx} className={`bg-[#0a0a0a]/50 backdrop-blur-md rounded-2xl p-4 border border-white/5 text-center transition-all duration-300 cursor-pointer group/btn ${btn.border} hover:-translate-y-1 shadow-lg`}>
                    <div className={`w-12 h-12 mx-auto ${btn.bg} ${btn.color} rounded-full flex items-center justify-center mb-2 shadow-inner group-hover/btn:scale-110 transition-transform`}>
                      {btn.icon}
                    </div>
                    <span className="text-xs font-bold text-gray-300 group-hover/btn:text-white transition-colors uppercase tracking-wide">{btn.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Varlık Listesi */}
          <div className="glass-panel rounded-4xl border border-white/5 overflow-hidden">
            <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/2">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                Kripto Varlıklarım
              </h3>
              <FiTrendingUp className="text-gray-500" />
            </div>
            
            <div className="p-3 space-y-2">
              {assets.map((asset) => (
                <div key={asset.id} className="group flex items-center justify-between p-4 rounded-2xl hover:bg-white/5 transition-all cursor-pointer border border-transparent hover:border-white/10 relative overflow-hidden">
                  
                  {/* Hover Arkaplan Efekti */}
                  <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <div className="flex items-center gap-4 relative z-10 w-1/3">

                    {/* LOGO */}
                    <div className="relative shrink-0">
                       <div className="w-12 h-12 rounded-full bg-[#1A1A1A] p-2 flex items-center justify-center shadow-lg border border-white/5 group-hover:border-yellow-400/50 transition-colors group-hover:shadow-[0_0_15px_rgba(250,204,21,0.2)]">
                          <img 
                            src={asset.image} 
                            alt={asset.name} 
                            className="w-full h-full object-contain"
                          />
                       </div>
                    </div>
                    
                    <div className="min-w-0">
                      <h4 className="font-bold text-white text-base leading-tight mb-0.5 group-hover:text-yellow-400 transition-colors">{asset.name}</h4>
                      <p className="text-xs text-gray-500 font-bold">{asset.symbol}</p>
                    </div>
                  </div>

                  {/* Mini Grafik  */}
                  <div className="hidden md:flex flex-1 h-8 items-center justify-center px-4 opacity-50 group-hover:opacity-100 transition-opacity">
                    <svg viewBox="0 0 100 30" className="w-24 h-full overflow-visible">
                      <path 
                        d={asset.chartData} 
                        fill="none" 
                        stroke={asset.isUp ? "#34d399" : "#f87171"} 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                        className="drop-shadow-md"
                      />
                    </svg>
                  </div>

                  {/* Fiyat ve Değişim */}
                  <div className="text-right relative z-10 w-1/3">
                    <p className="font-mono font-bold text-white text-base">${asset.value.toLocaleString()}</p>
                    <div className={`text-xs font-bold mt-1 flex items-center justify-end gap-1 ${asset.isUp ? 'text-emerald-400' : 'text-red-400'}`}>
                       {asset.isUp ? <FiTrendingUp /> : <FiTrendingDown />}
                       {asset.change}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sağ Kolon */}
        <div className="lg:col-span-5 space-y-8">
          
          {/* Kredi Kartı  */}
          <div className="glass-panel p-6 rounded-4xl border border-white/5 bg-[#0a0a0a]/40 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <FiCreditCard /> Kartlarım
              </h3>
              <button className="text-xs text-yellow-400 font-bold hover:text-white transition-colors cursor-pointer border border-yellow-400/30 px-3 py-1 rounded-full hover:bg-yellow-400/10">
                + Yeni Ekle
              </button>
            </div>
            
            <div className="transform hover:scale-[1.02] transition-transform duration-500">
               <CreditCard />
            </div>
          </div>

          {/* Son Aktiviteler  */}
          <div className="glass-panel p-6 rounded-4xl border border-white/5">
             <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-white">Son İşlemler</h3>
                <span className="text-xs text-gray-500 cursor-pointer hover:text-white transition-colors">Tümünü Gör</span>
             </div>
             
             <div className="space-y-4">
               {[
                 { title: 'Binance Deposit', sub: 'Yatırma', amount: '+$500.00', date: '12:30', logo: 'https://cryptologos.cc/logos/binance-coin-bnb-logo.png', isPlus: true },
                 { title: 'Netflix', sub: 'Abonelik', amount: '-$14.99', date: '10:15', logo: 'https://assets.nflxext.com/us/ffe/siteui/common/icons/nficon2016.png', isPlus: false },
                 { title: 'Starbucks', sub: 'Yiyecek', amount: '-$8.50', date: '09:45', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/d3/Starbucks_Corporation_Logo_2011.svg/1200px-Starbucks_Corporation_Logo_2011.svg.png', isPlus: false },
               ].map((item, i) => (
                 <div key={i} className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer group">
                   
                   {/* Marka Logosu */}
                   <div className="w-10 h-10 rounded-full bg-white p-1 flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                      <img src={item.logo} alt="logo" className="w-full h-full object-contain" />
                   </div>

                   <div className="flex-1 min-w-0">
                     <p className="text-sm font-bold text-white truncate group-hover:text-yellow-400 transition-colors">{item.title}</p>
                     <p className="text-[10px] text-gray-500 font-medium">Bugün, {item.date} • {item.sub}</p>
                   </div>
                   
                   <span className={`text-sm font-mono font-bold whitespace-nowrap ${item.isPlus ? 'text-emerald-400' : 'text-white'}`}>
                     {item.amount}
                   </span>
                 </div>
               ))}
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default WalletView;