import React, { useState, useEffect } from 'react';
import { useGlobal } from '../../../context/GlobalContext';
import { FiTrendingUp, FiTrendingDown, FiPlus, FiSend, FiArrowUp, FiArrowDown } from 'react-icons/fi';
import millify from 'millify';
import BuySellModal from './BuySellModal';
import CreditCard from './CreditCard';

const PortfolioSidebar = ({ allCoins }) => {
  const { portfolio, transactions } = useGlobal();
  const [totalValue, setTotalValue] = useState(0);
  const [totalProfit, setTotalProfit] = useState(0);
  const [showBuyModal, setShowBuyModal] = useState(false);

  useEffect(() => {
    if (!allCoins || allCoins.length === 0) return;

    // Basit hesaplama mantığı
    const updated = portfolio.map(item => {
      const currentCoin = allCoins.find(c => c.id === item.coinId);
      if (!currentCoin) return item;
      return {
        ...item,
        currentValue: item.amount * currentCoin.current_price,
      };
    });

    const total = updated.reduce((sum, item) => sum + (item.currentValue || 0), 0);
    const invested = updated.reduce((sum, item) => sum + (item.totalInvested || 0), 0);
    setTotalValue(total);
    setTotalProfit(total - invested);
  }, [portfolio, allCoins]);

  const profitPercent = portfolio.length > 0 
    ? (totalProfit / portfolio.reduce((sum, item) => sum + item.totalInvested, 0)) * 100 
    : 0;

  return (
    <div className="space-y-8 sticky top-8">
      
      {/* Başlık ve Kart */}
      <div>
        <div className="flex justify-between items-end mb-4">
           <h3 className="text-lg font-bold text-white">Kartlarım</h3>
           <button className="text-xs text-yellow-500 hover:text-yellow-400 font-bold transition cursor-pointer border border-yellow-500/20 px-3 py-1 rounded-lg hover:bg-yellow-500/10">
             + Yeni Kart
           </button>
        </div>
        <CreditCard />
      </div>

      {/* hızlı işlemler */}
      <div className="flex gap-4">
         <button 
            onClick={() => setShowBuyModal(true)}
            className="flex-1 bg-[#1A1A1A] text-yellow-400 border border-white/10 py-4 rounded-2xl font-bold shadow-lg hover:border-yellow-400 hover:text-black hover:bg-yellow-400 transition-all flex items-center justify-center gap-2 cursor-pointer group"
         >
            <FiPlus size={20} className="group-hover:rotate-90 transition-transform" /> Satın Al
         </button>
         <button className="flex-1 bg-[#1A1A1A] text-white border border-white/10 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-[#222] hover:border-white/20 transition-all cursor-pointer group">
            <FiSend size={20} className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" /> Transfer
         </button>
      </div>

      {/* bakiye özeti */}
      <div className="bg-[#121212] rounded-3xl p-6 border border-white/5 shadow-lg relative overflow-hidden">

       
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
        
        <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-2 relative z-10">Toplam Varlık</p>
        <div className="flex justify-between items-end relative z-10">
          <h2 className="text-3xl font-black text-white tracking-tight">
            ${millify(totalValue, { precision: 2 })}
          </h2>
          <div className={`flex items-center gap-1 text-sm font-bold px-2 py-1 rounded-lg ${
            totalProfit >= 0 ? 'text-emerald-400 bg-emerald-400/10' : 'text-red-400 bg-red-400/10'
          }`}>
            {totalProfit >= 0 ? <FiTrendingUp /> : <FiTrendingDown />}
            <span>{profitPercent.toFixed(2)}%</span>
          </div>
        </div>
      </div>

      {/* son işlemler */}
      <div className="bg-[#121212] rounded-3xl p-6 border border-white/5 shadow-lg">
        <div className="flex justify-between items-center mb-5">
           <h3 className="text-lg font-bold text-white">Son İşlemler</h3>
           <button className="text-xs text-gray-500 hover:text-white transition cursor-pointer">Tümü</button>
        </div>
        
        {transactions.length === 0 ? (
          <div className="text-center py-8 border border-dashed border-white/10 rounded-xl">
             <p className="text-gray-500 text-sm">Henüz işlem yok</p>
          </div>
        ) : (
          <div className="space-y-4">
            {transactions.slice(0, 5).map((tx, index) => (
              <div key={index} className="flex items-center gap-3 pb-3 border-b border-white/5 last:border-0 last:pb-0 hover:bg-white/5 p-2 -mx-2 rounded-xl transition-colors cursor-default group">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-105 ${
                  tx.type === 'buy' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'
                }`}>
                   {tx.type === 'buy' ? <FiArrowDown size={18} /> : <FiArrowUp size={18} />}
                </div>
                <div className="flex-1">
                  <p className="text-white font-bold text-sm">
                    {tx.type === 'buy' ? 'Alış' : 'Satış'} <span className="text-yellow-500">{tx.coinSymbol?.toUpperCase()}</span>
                  </p>
                  <p className="text-[10px] text-gray-500 font-medium mt-0.5">
                    {new Date(tx.date).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                <div className="text-right">
                  <span className="block font-bold text-sm text-white">
                    {tx.type === 'buy' ? '-' : '+'}${tx.total?.toLocaleString()}
                  </span>
                  <span className={`text-[10px] font-bold ${
                     tx.type === 'buy' ? 'text-red-400' : 'text-emerald-400'
                  }`}>
                     {tx.type === 'buy' ? 'Giden' : 'Gelen'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showBuyModal && (
        <BuySellModal
          allCoins={allCoins}
          onClose={() => setShowBuyModal(false)}
        />
      )}
    </div>
  );
};

export default PortfolioSidebar;