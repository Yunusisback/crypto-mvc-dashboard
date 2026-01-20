import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  FiArrowDown, FiSettings, FiActivity, FiClock, FiRepeat, 
  FiTrendingUp, FiTrendingDown, FiExternalLink, FiCheckCircle 
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const QuickSwapView = () => {
  const { t } = useTranslation();
  
   // state
  const [direction, setDirection] = useState('ETH_TO_USDT');
  const [amount, setAmount] = useState('');
  const [isSwapping, setIsSwapping] = useState(false);
  const [status, setStatus] = useState('idle'); 

  const ETH_PRICE = 3450.20;
  const balances = { ETH: 4.21, USDT: 5430.00 };

  // Hesaplamalar
  const sourceToken = direction === 'ETH_TO_USDT' ? 'ETH' : 'USDT';
  const targetToken = direction === 'ETH_TO_USDT' ? 'USDT' : 'ETH';
  const currentRate = direction === 'ETH_TO_USDT' ? ETH_PRICE : (1 / ETH_PRICE);
  const targetAmount = amount ? (parseFloat(amount) * currentRate).toFixed(direction === 'ETH_TO_USDT' ? 2 : 6) : '';
  const hasInsufficientBalance = parseFloat(amount) > balances[sourceToken];

 
  const popularPairs = [
    { pair: 'ETH/USDT', price: '3,450.20', change: 2.4, isUp: true },
    { pair: 'BTC/USDT', price: '64,230.50', change: -1.2, isUp: false },
    { pair: 'SOL/ETH', price: '0.045', change: 5.7, isUp: true },
    { pair: 'BNB/USDT', price: '590.10', change: 0.8, isUp: true },
  ];

  const recentTransactions = [
    { id: 1, from: 'ETH', to: 'USDT', in: '0.5', out: '1,725.10', status: 'completed', time: '2 dk önce' },
    { id: 2, from: 'USDT', to: 'ETH', in: '1,000', out: '0.29', status: 'pending', time: '5 dk önce' },
    { id: 3, from: 'BTC', to: 'USDT', in: '0.01', out: '642.30', status: 'failed', time: '12 dk önce' },
  ];


  const handleAmountChange = (e) => {
    const val = e.target.value;
    if (val === '' || /^\d*\.?\d*$/.test(val)) {
      setAmount(val);
      setStatus('idle');
    }
  };

  const handleSwitch = () => {
    setDirection(prev => prev === 'ETH_TO_USDT' ? 'USDT_TO_ETH' : 'ETH_TO_USDT');
    setAmount('');
    setStatus('idle');
  };

  const handleSwap = () => {
    if(!amount || hasInsufficientBalance) return;
    setIsSwapping(true);
    setStatus('swapping');
    setTimeout(() => {
      setIsSwapping(false);
      setStatus('success');
      setAmount('');
      setTimeout(() => setStatus('idle'), 3000);
    }, 2000);
  };

 
  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, x: 20 },
    show: { opacity: 1, x: 0 }
  };

  return (
    <div className="min-h-screen pt-8 pb-12 px-4 max-w-7xl mx-auto font-inter text-white select-none">
      
      <div className="mb-10 animate-fade-in">
         <h1 className="text-4xl md:text-5xl font-black tracking-tight">
           Hızlı <span className="text-transparent bg-clip-text bg-linear-to-r from-yellow-400 to-yellow-600">Takas</span>
         </h1>
         <p className="text-gray-400 mt-2">Düşük komisyon ve yüksek hız ile anında token dönüştürün.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Swap Kartı*/}
        <div className="lg:col-span-7 xl:col-span-7">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-panel p-6 md:p-8 rounded-4xl border border-white/10 bg-[#0a0a0a]/80 relative overflow-hidden shadow-2xl backdrop-blur-xl"
          >
            {/* Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-400/10 rounded-full blur-[80px] pointer-events-none"></div>

            {/* Header */}
            <div className="flex justify-between items-center mb-6 relative z-10">
              <span className="font-bold text-xl flex items-center gap-2">
                <FiRepeat className="text-yellow-400" /> Swap
              </span>
              <button className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white">
                <FiSettings size={20}/>
              </button>
            </div>

            {/* İnput Alanı  */}
            <div className="bg-black/40 rounded-2xl p-4 border border-white/5 focus-within:border-yellow-400/30 transition-colors">
              <div className="flex justify-between text-xs text-gray-400 mb-2 font-medium">
                <span>Gönderilen</span>
                <span>Bakiye: {balances[sourceToken]} {sourceToken}</span>
              </div>
              <div className="flex items-center gap-4">
                <input 
                  type="text" 
                  value={amount}
                  onChange={handleAmountChange}
                  placeholder="0.0" 
                  className={`w-full bg-transparent text-3xl md:text-4xl font-mono font-bold outline-none placeholder-gray-700 ${hasInsufficientBalance ? 'text-red-400' : 'text-white'}`}
                />
                <div className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-xl shrink-0 cursor-pointer hover:bg-white/20 transition">
                  <img src={sourceToken === 'ETH' ? "https://cryptologos.cc/logos/ethereum-eth-logo.png" : "https://cryptologos.cc/logos/tether-usdt-logo.png"} className="w-6 h-6 rounded-full" alt={sourceToken} />
                  <span className="font-bold">{sourceToken}</span>
                  <FiArrowDown className="text-gray-400" size={14}/>
                </div>
              </div>
              <div className="text-xs text-gray-500 mt-2 font-mono">
                 ≈ ${amount ? (amount * (sourceToken === 'USDT' ? 1 : ETH_PRICE)).toLocaleString() : '0.00'}
              </div>
            </div>

            {/* Switch Butonu */}
            <div className="flex justify-center -my-4 relative z-20">
              <motion.button 
                whileHover={{ scale: 1.1, rotate: 180 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleSwitch}
                className="bg-[#1a1a1a] border-4 border-[#0a0a0a] text-yellow-400 p-2.5 rounded-xl shadow-lg cursor-pointer hover:text-yellow-300 transition-colors"
              >
                <FiArrowDown size={20} />
              </motion.button>
            </div>

            {/* Output Alanı */}
            <div className="bg-black/40 rounded-2xl p-4 border border-white/5 mt-2">
              <div className="flex justify-between text-xs text-gray-400 mb-2 font-medium">
                <span>Alınan (Tahmini)</span>
                <span>Bakiye: {balances[targetToken]} {targetToken}</span>
              </div>
              <div className="flex items-center gap-4">
                <input 
                  type="text" 
                  value={targetAmount}
                  readOnly
                  placeholder="0.0" 
                  className="w-full bg-transparent text-3xl md:text-4xl font-mono font-bold text-emerald-400 outline-none placeholder-gray-700"
                />
                <div className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-xl shrink-0 cursor-pointer hover:bg-white/20 transition">
                  <img src={targetToken === 'ETH' ? "https://cryptologos.cc/logos/ethereum-eth-logo.png" : "https://cryptologos.cc/logos/tether-usdt-logo.png"} className="w-6 h-6 rounded-full" alt={targetToken} />
                  <span className="font-bold">{targetToken}</span>
                  <FiArrowDown className="text-gray-400" size={14}/>
                </div>
              </div>
               <div className="text-xs text-gray-500 mt-2 font-mono flex justify-between">
                 <span>1 {sourceToken} = {currentRate.toFixed(4)} {targetToken}</span>
                 <span className="flex items-center gap-1">Gas: <span className="text-emerald-400">$4.50</span></span>
              </div>
            </div>

            {/* Hata Mesajı */}
            <AnimatePresence>
                {hasInsufficientBalance && (
                    <motion.div 
                        initial={{ opacity: 0, height: 0 }} 
                        animate={{ opacity: 1, height: 'auto' }} 
                        exit={{ opacity: 0, height: 0 }}
                        className="text-red-400 text-sm mt-4 font-medium bg-red-400/10 p-3 rounded-xl border border-red-400/20 flex items-center gap-2"
                    >
                        <FiActivity className="rotate-45" /> Yetersiz Bakiye! İşlem için bakiye yükleyin.
                    </motion.div>
                )}
            </AnimatePresence>

            {/* İşlem Butonu */}
            <button 
              disabled={!amount || isSwapping || hasInsufficientBalance}
              onClick={handleSwap}
              className={`w-full mt-6 py-4 rounded-xl font-bold text-lg transition-all relative overflow-hidden shadow-lg group
                ${status === 'success' ? 'bg-emerald-500 text-white shadow-emerald-500/25' : 
                  (!amount || hasInsufficientBalance ? 'bg-white/5 text-gray-500 cursor-not-allowed border border-white/5' : 'bg-yellow-400 text-black shadow-yellow-400/20 hover:bg-yellow-300 hover:shadow-yellow-400/40 active:scale-[0.98]')}
              `}
            >
              {status === 'swapping' ? (
                <div className="flex items-center justify-center gap-2">
                   <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                   <span>İşleniyor...</span>
                </div>
              ) : status === 'success' ? (
                 <div className="flex items-center justify-center gap-2">
                    <FiCheckCircle size={22} /> İşlem Başarılı
                 </div>
              ) : hasInsufficientBalance ? (
                 "Yetersiz Bakiye"
              ) : (
                 "Takası Onayla"
              )}
            </button>
          </motion.div>
        </div>

        {/* Trendler ve son işlemler*/}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="lg:col-span-5 xl:col-span-5 space-y-6"
        >
          
          {/*  Popüler Çiftler  */}
          <motion.div variants={itemVariants} className="glass-panel p-6 rounded-3xl border border-white/10 bg-[#0a0a0a]/60">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <FiActivity className="text-emerald-400" /> Piyasa Trendleri
            </h3>
            <div className="space-y-3">
              {popularPairs.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer group border border-transparent hover:border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-gray-300 group-hover:bg-yellow-400 group-hover:text-black transition-colors">
                        {idx + 1}
                    </div>
                    <div>
                        <div className="font-bold text-white text-sm">{item.pair}</div>
                        <div className="text-xs text-gray-500">Vol: $1.2M</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-white text-sm font-bold">${item.price}</div>
                    <div className={`text-xs font-bold flex items-center justify-end gap-1 ${item.isUp ? 'text-emerald-400' : 'text-red-400'}`}>
                      {item.isUp ? <FiTrendingUp size={10} /> : <FiTrendingDown size={10} />}
                      {item.isUp ? '+' : ''}{item.change}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/*  Son İşlemler*/}
          <motion.div variants={itemVariants} className="glass-panel p-6 rounded-3xl border border-white/10 bg-[#0a0a0a]/60">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <FiClock className="text-gray-400" /> Son İşlemler
                </h3>
                <button className="text-xs text-yellow-400 hover:text-yellow-300 font-medium">Tümünü Gör</button>
            </div>
            
            <div className="space-y-4">
               {/* Başlıklar */}
               <div className="grid grid-cols-3 text-xs text-gray-500 font-medium pb-2 border-b border-white/5 px-2">
                  <span>Çift</span>
                  <span className="text-center">Tutar</span>
                  <span className="text-right">Durum</span>
               </div>

               {recentTransactions.map((tx) => (
                 <div key={tx.id} className="grid grid-cols-3 items-center text-sm px-2 py-1 hover:bg-white/5 rounded-lg transition-colors">
                   
                   {/* Çift Bilgisi */}
                   <div className="flex flex-col">
                     <span className="font-bold text-white text-xs flex items-center gap-1">
                        {tx.from} <span className="text-gray-600">→</span> {tx.to}
                     </span>
                     <span className="text-[10px] text-gray-500">{tx.time}</span>
                   </div>

                   {/* Tutar */}
                   <div className="text-center font-mono text-gray-300 text-xs">
                     {tx.in} {tx.from}
                   </div>

                   {/* Durum Badge */}
                   <div className="text-right flex justify-end">
                     <span className={`
                        text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1
                        ${tx.status === 'completed' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : ''}
                        ${tx.status === 'pending' ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20' : ''}
                        ${tx.status === 'failed' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : ''}
                     `}>
                        {tx.status === 'completed' && 'Başarılı'}
                        {tx.status === 'pending' && 'Bekliyor'}
                        {tx.status === 'failed' && 'Hata'}
                        <FiExternalLink size={8} />
                     </span>
                   </div>
                 </div>
               ))}
            </div>
          </motion.div>

        </motion.div>

      </div>
    </div>
  );
};

export default QuickSwapView;