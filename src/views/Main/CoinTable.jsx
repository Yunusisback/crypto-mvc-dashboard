
import { FiArrowUpRight, FiArrowDownRight, FiShoppingCart, FiStar } from "react-icons/fi";
import { useGlobal } from '../../context/GlobalContext';

const CoinTable = ({ currentCoins, indexOfFirstCoin, handleRowClick }) => {
  const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useGlobal();

  const handleWatchlist = (e, coinId) => {
    e.stopPropagation();
    if (isInWatchlist(coinId)) {
      removeFromWatchlist(coinId);
    } else {
      addToWatchlist(coinId);
    }
  };

  return (
    <div className="w-full space-y-3">

      {/* tablo header */}
      <div className="grid grid-cols-12 px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">
        <div className="col-span-1 text-center">#</div>
        <div className="col-span-4 md:col-span-3">Varlık</div>
        <div className="col-span-3 md:col-span-2 text-right">Fiyat</div>
        <div className="col-span-2 text-right hidden md:block">24s Değişim</div>
        <div className="col-span-3 text-right hidden lg:block">Piyasa Değeri</div>
        <div className="col-span-4 md:col-span-2 lg:col-span-1 text-right">İşlem</div>
      </div>

     {/* Coin Kartları */}
      {currentCoins.length === 0 ? (
        <div className="text-center py-16 bg-white/5 rounded-2xl border border-dashed border-gray-800">
          <p className="text-gray-400">Aradığınız kriterde coin bulunamadı.</p>
        </div>
      ) : (
        currentCoins.map((coin, index) => {
          const isPositive = coin.price_change_percentage_24h > 0;
          const inList = isInWatchlist(coin.id);

          return (
            <div
              key={coin.id}
              onClick={() => handleRowClick(coin.id)}
              className="group grid grid-cols-12 items-center px-6 py-4 bg-[#121212] border border-gray-800 rounded-2xl cursor-pointer hover:border-yellow-400/50 hover:bg-white/5 hover:scale-[1.01] hover:shadow-lg hover:shadow-yellow-400/5 transition-all duration-300"
            >
              {/* rank */}
              <div className="col-span-1 text-center font-bold text-gray-600 group-hover:text-yellow-400 transition-colors">
                {indexOfFirstCoin + index + 1}
              </div>

              {/* coin infosu */}
              <div className="col-span-4 md:col-span-3 flex items-center gap-4">
                <div className="relative">
                   <img 
                    src={coin.image} 
                    alt={coin.name} 
                    className="w-10 h-10 rounded-full group-hover:rotate-12 transition-transform duration-500"
                  />
                  {inList && <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full border-2 border-black"></div>}
                </div>
                
                <div className="flex flex-col">
                  <span className="font-bold text-white text-base group-hover:text-yellow-400 transition-colors">
                    {coin.symbol.toUpperCase()}
                  </span>
                  <span className="text-xs text-gray-500 font-medium hidden sm:block">
                    {coin.name}
                  </span>
                </div>
              </div>

              {/* price */}
              <div className="col-span-3 md:col-span-2 text-right">
                <span className="font-mono font-bold text-white text-base">
                  ${coin.current_price.toLocaleString()}
                </span>
              </div>

              {/* 24H değişim */}
              <div className="col-span-2 text-right hidden md:block">
                <div className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold ${
                  isPositive 
                    ? 'bg-green-500/10 text-green-500 border border-green-500/20' 
                    : 'bg-red-500/10 text-red-500 border border-red-500/20'
                }`}>
                  {isPositive ? <FiArrowUpRight /> : <FiArrowDownRight />}
                  {Math.abs(coin.price_change_percentage_24h?.toFixed(2))}%
                </div>
              </div>

              {/* market */}
              <div className="col-span-3 text-right hidden lg:block text-gray-400 font-mono text-sm">
                ${(coin.market_cap / 1_000_000_000).toFixed(2)}B
              </div>

              {/* işlemler */}
              <div className="col-span-4 md:col-span-2 lg:col-span-1 flex justify-end gap-2">
                <button
                   onClick={(e) => handleWatchlist(e, coin.id)}
                   className={`p-2 rounded-xl transition-colors ${
                     inList 
                     ? 'text-yellow-400 bg-yellow-400/10 hover:bg-yellow-400/20' 
                     : 'text-gray-600 hover:text-white hover:bg-white/10'
                   }`}
                >
                  <FiStar size={18} fill={inList ? "currentColor" : "none"} />
                </button>
                
             
                <button className="hidden sm:flex p-2 bg-yellow-400 text-black rounded-xl hover:bg-yellow-300 transition-colors shadow-lg shadow-yellow-400/20">
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