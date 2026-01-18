import { FiArrowUpRight, FiArrowDownRight, FiShoppingCart, FiStar } from "react-icons/fi";
import { useGlobal } from '../../context/GlobalContext';

const CoinTable = ({ currentCoins, indexOfFirstCoin, handleRowClick }) => {
  const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useGlobal();

  const handleWatchlist = (e, coinId) => {
    e.stopPropagation(); 
    isInWatchlist(coinId) ? removeFromWatchlist(coinId) : addToWatchlist(coinId);
  };

  return (
    <div className="w-full space-y-3 select-none">

      {/* Tablo Başlıkları */}
      <div className="grid grid-cols-12 px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider select-none">
        <div className="col-span-1 text-center">#</div>
        <div className="col-span-4 md:col-span-3">Varlık</div>
        <div className="col-span-3 md:col-span-2 text-right">Fiyat</div>
        <div className="col-span-2 text-right hidden md:block">24s Değişim</div>
        <div className="col-span-3 text-right hidden lg:block">Piyasa Değeri</div>
        <div className="col-span-4 md:col-span-2 lg:col-span-1 text-right">İşlem</div>
      </div>

     {/* Coin Listesi */}
      {currentCoins.length === 0 ? (
        <div className="text-center py-20 bg-white/5 rounded-3xl border border-dashed border-gray-800 animate-fade-in">
          <p className="text-gray-400 text-lg">Aradığınız kriterde coin bulunamadı.</p>
        </div>
      ) : (
        currentCoins.map((coin, index) => {
          const isPositive = coin.price_change_percentage_24h > 0;
          const inList = isInWatchlist(coin.id);

          return (
            <div
              key={coin.id}
              onClick={() => handleRowClick(coin.id)}
              className="glass-card grid grid-cols-12 items-center px-6 py-4 rounded-2xl cursor-pointer group transition-all duration-300"
            >
              {/* Sıralama */}
              <div className="col-span-1 text-center font-bold text-gray-600 group-hover:text-yellow-400 transition-colors">
                {indexOfFirstCoin + index + 1}
              </div>

              {/* Coin Bilgisi */}
              <div className="col-span-4 md:col-span-3 flex items-center gap-4">
                <div className="relative shrink-0">
                   <img 
                    src={coin.image} 
                    alt={coin.name} 
                    className="w-10 h-10 rounded-full group-hover:scale-110 transition-transform duration-500 bg-white/5 p-0.5"
                  />
                  {inList && (
                    <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-yellow-400 rounded-full border-2 border-[#121212] flex items-center justify-center">
                      <FiStar size={8} className="text-black fill-current" />
                    </div>
                  )}
                </div>
                
                <div className="flex flex-col min-w-0">
                  <span className="font-bold text-white text-base group-hover:text-yellow-400 transition-colors truncate">
                    {coin.symbol.toUpperCase()}
                  </span>
                  <span className="text-xs text-gray-500 font-medium hidden sm:block truncate">
                    {coin.name}
                  </span>
                </div>
              </div>

              {/* Fiyat */}
              <div className="col-span-3 md:col-span-2 text-right">
                <span className="font-mono font-bold text-white text-base">
                  ${coin.current_price < 1 ? coin.current_price.toFixed(4) : coin.current_price.toLocaleString()}
                </span>
              </div>

              {/* 24s Değişim */}
              <div className="col-span-2 text-right hidden md:block">
                <div className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold border ${
                  isPositive 
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                    : 'bg-red-500/10 text-red-400 border-red-500/20'
                }`}>
                  {isPositive ? <FiArrowUpRight /> : <FiArrowDownRight />}
                  {Math.abs(coin.price_change_percentage_24h?.toFixed(2))}%
                </div>
              </div>

              {/* Piyasa Değeri */}
              <div className="col-span-3 text-right hidden lg:block text-gray-400 font-mono text-sm">
                ${(coin.market_cap / 1_000_000_000).toFixed(2)}B
              </div>

              {/* İşlemler */}
              <div className="col-span-4 md:col-span-2 lg:col-span-1 flex justify-end gap-2">
                <button
                   onClick={(e) => handleWatchlist(e, coin.id)}
                   className={`p-2.5 rounded-xl transition-all active:scale-90 ${
                     inList 
                     ? 'text-yellow-400 bg-yellow-400/10 hover:bg-yellow-400/20' 
                     : 'text-gray-500 hover:text-yellow-400 hover:bg-white/10'
                   }`}
                   title={inList ? "Listeden Çıkar" : "Listeye Ekle"}
                >
                  <FiStar size={18} fill={inList ? "currentColor" : "none"} />
                </button>
                
                <button className="hidden sm:flex p-2.5 bg-yellow-400 text-black rounded-xl hover:bg-yellow-300 transition-colors shadow-lg shadow-yellow-400/20 active:scale-95">
                  <FiShoppingCart size={18} />
                </button>
              </div>

            </div>
          );
        })
      )}
    </div>
  );
};

export default CoinTable;