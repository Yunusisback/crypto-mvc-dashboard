import { useState, useMemo } from 'react';
import { useGlobal } from '../../../context/GlobalContext';
import { FiX, FiSearch, FiShoppingCart } from 'react-icons/fi';

const BuySellModal = ({ allCoins, onClose, preSelectedCoin = null }) => {
  const { addToPortfolio } = useGlobal();
  const [selectedCoin, setSelectedCoin] = useState(preSelectedCoin);
  const [amount, setAmount] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCoins = useMemo(() => {
    if (!searchQuery) return allCoins.slice(0, 10);
    const term = searchQuery.toLowerCase();
    return allCoins.filter(coin => 
      coin.name.toLowerCase().includes(term) || 
      coin.symbol.toLowerCase().includes(term)
    ).slice(0, 10);
  }, [allCoins, searchQuery]);

  const totalCost = selectedCoin && amount ? (parseFloat(amount) * selectedCoin.current_price) : 0;

  const handleBuy = () => {
    if (!selectedCoin || !amount || parseFloat(amount) <= 0) {
      alert('Lütfen geçerli bir miktar girin');
      return;
    }

    addToPortfolio(
      selectedCoin.id,
      selectedCoin.name,
      selectedCoin.symbol,
      parseFloat(amount),
      selectedCoin.current_price
    );

    onClose();
  };

  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="glass-panel rounded-3xl p-8 max-w-2xl w-full border border-white/10 animate-in slide-in-from-bottom duration-300">
        
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <FiShoppingCart className="text-yellow-400" />
            Coin Satın Al
          </h2>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 transition-colors text-gray-400 hover:text-white"
          >
            <FiX size={24} />
          </button>
        </div>

        {!selectedCoin ? (
          <div className="space-y-4">
            <div className="relative">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Coin ara... (BTC, ETH, SOL)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 outline-none transition"
              />
            </div>

            <div className="max-h-96 overflow-y-auto space-y-2">
              {filteredCoins.map(coin => (
                <button
                  key={coin.id}
                  onClick={() => setSelectedCoin(coin)}
                  className="w-full flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-yellow-400/50 transition-all text-left"
                >
                  <img src={coin.image} alt={coin.name} className="w-10 h-10 rounded-full" />
                  <div className="flex-1">
                    <h3 className="font-bold text-white">{coin.name}</h3>
                    <p className="text-sm text-gray-500 uppercase">{coin.symbol}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-mono font-bold text-white">${coin.current_price.toLocaleString()}</p>
                    <p className={`text-xs font-bold ${
                      coin.price_change_percentage_24h >= 0 ? 'text-emerald-400' : 'text-red-400'
                    }`}>
                      {coin.price_change_percentage_24h >= 0 ? '+' : ''}{coin.price_change_percentage_24h.toFixed(2)}%
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="p-4 rounded-xl bg-yellow-400/10 border border-yellow-400/20">
              <div className="flex items-center gap-4">
                <img src={selectedCoin.image} alt={selectedCoin.name} className="w-12 h-12 rounded-full" />
                <div className="flex-1">
                  <h3 className="font-bold text-white text-lg">{selectedCoin.name}</h3>
                  <p className="text-sm text-gray-400">{selectedCoin.symbol.toUpperCase()}</p>
                </div>
                <div className="text-right">
                  <p className="font-mono font-bold text-white text-lg">${selectedCoin.current_price.toLocaleString()}</p>
                  <p className={`text-xs font-bold ${
                    selectedCoin.price_change_percentage_24h >= 0 ? 'text-emerald-400' : 'text-red-400'
                  }`}>
                    {selectedCoin.price_change_percentage_24h >= 0 ? '+' : ''}{selectedCoin.price_change_percentage_24h.toFixed(2)}%
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedCoin(null)}
                className="mt-3 text-sm text-yellow-400 hover:text-yellow-300"
              >
                Farklı coin seç
              </button>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-400 mb-2">
                Miktar ({selectedCoin.symbol.toUpperCase()})
              </label>
              <input
                type="number"
                step="0.00000001"
                min="0"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white text-xl font-mono focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 outline-none transition"
              />
              <div className="flex gap-2 mt-3">
                {[0.1, 0.5, 1, 5].map(val => (
                  <button
                    key={val}
                    onClick={() => setAmount(val.toString())}
                    className="flex-1 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm font-bold text-gray-400 hover:text-white transition-all"
                  >
                    {val} {selectedCoin.symbol.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-400">Birim Fiyat:</span>
                <span className="font-mono font-bold text-white">
                  ${selectedCoin.current_price.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-white/10">
                <span className="text-lg font-bold text-white">Toplam:</span>
                <span className="text-2xl font-black text-yellow-400 font-mono">
                  ${totalCost.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 py-3 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl transition-all"
              >
                İptal
              </button>
              <button
                onClick={handleBuy}
                disabled={!amount || parseFloat(amount) <= 0}
                className="flex-1 py-3 bg-yellow-400 hover:bg-yellow-300 disabled:opacity-50 disabled:cursor-not-allowed text-black font-bold rounded-xl transition-all"
              >
                Satın Al
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BuySellModal;