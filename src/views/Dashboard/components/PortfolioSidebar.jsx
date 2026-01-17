import { useTranslation } from 'react-i18next'; 
import { FiTrendingUp, FiTrendingDown, FiPlus, FiSend, FiArrowUp, FiArrowDown, FiCreditCard } from 'react-icons/fi';
import millify from 'millify';
import CreditCard from './CreditCard'; 


const PortfolioSidebar = ({ allCoins, stats, transactions, onBuyClick }) => { // onBuyClick prop'u eklendi
  const { t, i18n } = useTranslation(); 

  const { totalValue = 0, totalProfit = 0, profitPercent = 0 } = stats || {};
  const isProfit = totalProfit >= 0;

  return (
    <div className="space-y-6 sticky top-6 h-full">
      
       {/* Cüzdan */}
      <div className="relative group">
        <div className="flex justify-between items-center mb-3 px-1">
           <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-2">
             <FiCreditCard /> {t('wallets')}
           </h3>
           <button 
             onClick={onBuyClick} 
             className="text-[10px] bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500 hover:text-black font-bold transition-all border border-yellow-500/20 px-3 py-1.5 rounded-full cursor-pointer"
           >
             + {t('add')}
           </button>
        </div>
        
        <div className="relative z-10 hover:transform hover:scale-[1.02] transition-transform duration-300">
            <CreditCard />
        </div>
      </div>

        {/* Toplam Varlıklar */}
      <div className="relative overflow-hidden rounded-3xl p-px bg-linear-to-b from-white/10 to-transparent shadow-2xl">
        <div className="bg-[#121212]/90 backdrop-blur-xl rounded-[23px] p-6 relative overflow-hidden">
        
            {/* Arka plan dekoratif glow */}
            <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full blur-[60px] opacity-20 ${isProfit ? 'bg-emerald-500' : 'bg-red-500'}`}></div>
            
            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">{t('total_assets')}</p>
            
            <div className="flex flex-col gap-1 relative z-10">
                <h2 className="text-4xl font-black text-white tracking-tighter drop-shadow-lg">
                    ${millify(totalValue, { precision: 2 })}
                </h2>
                
                <div className="flex items-center gap-3 mt-2">
                    <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${
                        isProfit 
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                        : 'bg-red-500/10 text-red-400 border-red-500/20'
                    }`}>
                        {isProfit ? <FiTrendingUp size={14} /> : <FiTrendingDown size={14} />}
                        <span>%{Math.abs(profitPercent).toFixed(2)}</span>
                    </div>
                    <span className={`text-xs font-medium ${isProfit ? 'text-emerald-500/70' : 'text-red-500/70'}`}>
                        ({isProfit ? '+' : '-'}${millify(Math.abs(totalProfit))})
                    </span>
                </div>
            </div>
        </div>
      </div>

        {/* Alış ve Transfer Butonları */}
      <div className="grid grid-cols-2 gap-4">
         <button 
            onClick={onBuyClick} 
            className="group relative overflow-hidden bg-linear-to-br from-amber-300 to-yellow-500 text-black py-4 rounded-2xl font-bold shadow-lg shadow-yellow-500/20 hover:shadow-yellow-500/40 transition-all transform hover:-translate-y-1 cursor-pointer"
         >
            <div className="relative z-10 flex items-center justify-center gap-2">
                <div className="bg-black/10 p-1 rounded-full group-hover:rotate-90 transition-transform duration-300">
                    <FiPlus size={18} /> 
                </div>
                <span>{t('buy')}</span>
            </div>
            
            {/* Hover Parlaması */}
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
         </button>

         <button className="group bg-[#1A1A1A] border border-white/5 text-white py-4 rounded-2xl font-bold shadow-lg hover:bg-[#222] hover:border-white/20 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2 cursor-pointer">
            <FiSend size={18} className="text-gray-400 group-hover:text-white group-hover:-translate-y-1 group-hover:translate-x-1 transition-all" /> 
            <span>{t('transfer')}</span>
         </button>
      </div>

      {/* Son İşlemler */}
      <div className="bg-[#121212] rounded-3xl border border-white/5 shadow-xl overflow-hidden flex flex-col">
        <div className="p-5 border-b border-white/5 flex justify-between items-center bg-white/2">
           <h3 className="text-base font-bold text-white">{t('recent_transactions')}</h3>
           <button className="text-[10px] text-gray-500 hover:text-white transition-colors uppercase tracking-wider font-semibold cursor-pointer">{t('view_all')}</button>
        </div>
        
        <div className="p-3">
            {(!transactions || transactions.length === 0) ? (
            <div className="text-center py-10 flex flex-col items-center gap-3 opacity-50">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                    <FiTrendingUp className="text-gray-500" />
                </div>
                <p className="text-gray-500 text-xs">Henüz işlem geçmişi yok</p>
            </div>
            ) : (
            <div className="space-y-1">
                {transactions.slice(0, 5).map((tx, index) => (
                <div key={index} className="flex items-center gap-3 p-3 rounded-2xl hover:bg-white/5 transition-colors group cursor-default">

                    {/* İkon */}
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-inner ${
                    tx.type === 'buy' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'
                    }`}>
                        {tx.type === 'buy' ? <FiArrowDown size={16} /> : <FiArrowUp size={16} />}
                    </div>

                    {/* Detay */}
                    <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline">
                        <p className="text-white font-bold text-sm truncate pr-2">
                           
                            {tx.type === 'buy' ? t('transaction_buy') : t('transaction_sell')} <span className="text-amber-400/90">{tx.coinSymbol?.toUpperCase()}</span>
                        </p>
                        <span className={`text-sm font-bold whitespace-nowrap ${
                            tx.type === 'buy' ? 'text-white' : 'text-white'
                        }`}>
                            {tx.type === 'buy' ? '-' : '+'}${tx.total?.toLocaleString()}
                        </span>
                    </div>
                    <div className="flex justify-between mt-0.5">
                        <p className="text-[10px] text-gray-500 font-medium">
                            {new Date(tx.date).toLocaleTimeString(i18n.language === 'tr' ? 'tr-TR' : 'en-US', { hour: '2-digit', minute: '2-digit' })}
                        </p>
                        <p className={`text-[10px] font-bold ${tx.type === 'buy' ? 'text-red-400/70' : 'text-emerald-400/70'}`}>
                           
                            {tx.type === 'buy' ? t('transaction_expense') : t('transaction_deposit')}
                        </p>
                    </div>
                    </div>
                </div>
                ))}
            </div>
            )}
        </div>
      </div>

    </div>
  );
};

export default PortfolioSidebar;