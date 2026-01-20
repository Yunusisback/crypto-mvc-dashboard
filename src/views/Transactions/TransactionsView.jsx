import { useState } from 'react';
import { FiSearch, FiDownload, FiArrowDownLeft, FiArrowUpRight, FiRefreshCw, FiCheckCircle, FiClock, FiXCircle, FiMoreHorizontal } from 'react-icons/fi';

const TransactionsView = () => {
  const [filter, setFilter] = useState('ALL'); 
  const [searchTerm, setSearchTerm] = useState('');

  
  const transactions = [
    { 
      id: 'TX1001', 
      type: 'buy', 
      asset: 'Bitcoin', 
      symbol: 'BTC', 
      image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png',
      amount: 0.45, 
      price: 64200, 
      total: 28890, 
      date: '2024-03-15 14:30', 
      status: 'completed' 
    },
    { 
      id: 'TX1002', 
      type: 'sell', 
      asset: 'Ethereum', 
      symbol: 'ETH', 
      image: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png',
      amount: 2.5, 
      price: 3450, 
      total: 8625, 
      date: '2024-03-14 09:15', 
      status: 'completed' 
    },
    { 
      id: 'TX1003', 
      type: 'transfer', 
      asset: 'Tether', 
      symbol: 'USDT', 
      image: 'https://assets.coingecko.com/coins/images/325/large/Tether.png',
      amount: 500, 
      price: 1, 
      total: 500, 
      date: '2024-03-13 18:45', 
      status: 'pending' 
    },
    { 
      id: 'TX1004', 
      type: 'buy', 
      asset: 'Solana', 
      symbol: 'SOL', 
      image: 'https://assets.coingecko.com/coins/images/4128/large/solana.png',
      amount: 150, 
      price: 145, 
      total: 21750, 
      date: '2024-03-12 11:20', 
      status: 'failed' 
    },
    { 
      id: 'TX1005', 
      type: 'buy', 
      asset: 'Avalanche', 
      symbol: 'AVAX', 
      image: 'https://assets.coingecko.com/coins/images/12559/large/Avalanche_Circle_RedWhite_Trans.png',
      amount: 50, 
      price: 55, 
      total: 2750, 
      date: '2024-03-10 16:00', 
      status: 'completed' 
    },
    { 
      id: 'TX1006', 
      type: 'sell', 
      asset: 'Dogecoin', 
      symbol: 'DOGE', 
      image: 'https://assets.coingecko.com/coins/images/5/large/dogecoin.png',
      amount: 5000, 
      price: 0.15, 
      total: 750, 
      date: '2024-03-09 08:30', 
      status: 'completed' 
    },
  ];

  // Filtreleme Mantığı
  const filteredTransactions = transactions.filter(tx => {
    const matchesFilter = filter === 'ALL' || tx.type.toUpperCase() === filter;
    const matchesSearch = tx.asset.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          tx.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          tx.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusStyle = (status) => {
    switch (status) {
      case 'completed': return {
        bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/20', icon: <FiCheckCircle />
      };
      case 'pending': return {
        bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/20', icon: <FiClock />
      };
      case 'failed': return {
        bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/20', icon: <FiXCircle />
      };
      default: return {
        bg: 'bg-gray-500/10', text: 'text-gray-400', border: 'border-gray-500/20', icon: <FiClock />
      };
    }
  };

  const getTypeStyle = (type) => {
    switch(type) {
        case 'buy': return { icon: <FiArrowDownLeft />, color: 'text-emerald-400', label: 'Alış' };
        case 'sell': return { icon: <FiArrowUpRight />, color: 'text-red-400', label: 'Satış' };
        default: return { icon: <FiRefreshCw />, color: 'text-blue-400', label: 'Transfer' };
    }
  }

  return (
    <div className="p-6 md:p-8 min-h-screen font-inter animate-fade-in pb-20 select-none">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight mb-1">
            İşlem <span className="text-transparent bg-clip-text bg-linear-to-r from-yellow-400 to-yellow-600">Geçmişi</span>
          </h1>
          <p className="text-gray-400 text-sm">Tüm kripto varlık hareketlerinizi ve transferlerinizi buradan takip edin.</p>
        </div>
        
        <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1a1a1a] border border-white/10 text-white hover:bg-white/5 hover:border-yellow-500/30 transition-all text-sm font-bold group cursor-pointer shadow-lg">
          <FiDownload className="group-hover:-translate-y-0.5 transition-transform text-yellow-500" />
          <span>Rapor İndir (CSV)</span>
        </button>
      </div>

      {/*  Arama ve Filtre */}
      <div className="flex flex-col xl:flex-row gap-6 mb-8">
        
        {/* Arama Çubuğu */}
        <div className="relative w-full xl:w-96 group h-14">
            <div className="relative w-full h-full rounded-2xl overflow-hidden p-px">
                
         
                <div className="absolute -inset-full animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,transparent_50%,#FBBF24_100%)] opacity-40"></div>
                
                <div className="relative z-10 bg-[#0a0a0a] rounded-2xl flex items-center h-full px-4 border border-transparent transition-all">
                    <FiSearch className="text-gray-500 group-focus-within:text-yellow-400 mr-3 transition-colors" size={20} />
                    <input 
                        type="text" 
                        placeholder="İşlem ID, Coin veya Sembol ara..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-transparent border-none text-white text-sm placeholder-gray-600 focus:ring-0 focus:outline-none font-medium h-full"
                    />
                </div>
            </div>
        </div>

        {/* Filtre Tabları */}
        <div className="flex bg-[#0a0a0a] p-1 rounded-2xl border border-white/10 overflow-x-auto no-scrollbar">
            {['ALL', 'BUY', 'SELL', 'TRANSFER'].map((f) => (
                <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`
                        px-6 py-2.5 rounded-xl text-xs font-bold tracking-wider transition-all whitespace-nowrap
                        ${filter === f 
                        ? 'bg-yellow-400 text-black shadow-lg shadow-yellow-400/20' 
                        : 'text-gray-400 hover:text-white hover:bg-white/5'}
                    `}
                >
                    {f === 'ALL' ? 'Tümü' : f === 'BUY' ? 'Alışlar' : f === 'SELL' ? 'Satışlar' : 'Transferler'}
                </button>
            ))}
        </div>
      </div>

      {/* Tablo Alanı */}
      <div className="bg-[#0a0a0a]/60 backdrop-blur-xl rounded-4xl border border-white/5 overflow-hidden shadow-2xl relative min-h-125">
        
        {/* Dekoratif Işık */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-500/5 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b border-white/5 text-gray-500 text-xs font-bold uppercase tracking-wider bg-white/2">
                        <th className="px-6 py-5 pl-8">Varlık</th>
                        <th className="px-6 py-5">İşlem Türü</th>
                        <th className="px-6 py-5 text-right">Miktar</th>
                        <th className="px-6 py-5 text-right">Fiyat</th>
                        <th className="px-6 py-5 text-right">Toplam Değer</th>
                        <th className="px-6 py-5 text-center">Tarih</th>
                        <th className="px-6 py-5 text-center">Durum</th>
                        <th className="px-6 py-5 text-center"></th>
                    </tr>
                </thead>
                <tbody className="text-sm divide-y divide-white/5">
                    {filteredTransactions.length > 0 ? (
                        filteredTransactions.map((tx) => {
                            const status = getStatusStyle(tx.status);
                            const type = getTypeStyle(tx.type);
                            
                            return (
                                <tr key={tx.id} className="group hover:bg-white/2 transition-colors">
                                    
                                    {/*  logo ve isim */}
                                    <td className="px-6 py-5 pl-8">
                                        <div className="flex items-center gap-4">

                                            {/* logo */}
                                            <div className="relative">
                                                <div className="w-11 h-11 rounded-full p-0.5 bg-linear-to-b from-white/10 to-transparent">
                                                    <img 
                                                        src={tx.image} 
                                                        alt={tx.asset} 
                                                        className="w-full h-full rounded-full object-cover bg-[#121212]"
                                                        onError={(e) => { e.target.src = "https://upload.wikimedia.org/wikipedia/commons/4/46/Bitcoin.svg"}}
                                                    />
                                                </div>
                                                {/* Küçük Tip İkonu */}
                                                <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#0a0a0a] flex items-center justify-center border border-white/10 ${type.color}`}>
                                                    {type.icon}
                                                </div>
                                            </div>
                                            <div>
                                                <p className="font-bold text-white text-base group-hover:text-yellow-400 transition-colors">{tx.asset}</p>
                                                <p className="text-xs text-gray-500 font-mono">{tx.symbol}</p>
                                            </div>
                                        </div>
                                    </td>

                                    {/*  Tür */}
                                    <td className="px-6 py-5">
                                        <span className={`text-xs font-bold ${type.color}`}>
                                            {type.label}
                                        </span>
                                        <p className="text-[10px] text-gray-600 font-mono mt-0.5">#{tx.id}</p>
                                    </td>

                                    {/* Miktar */}
                                    <td className="px-6 py-5 text-right">
                                        <span className="font-mono font-medium text-white text-base">{tx.amount}</span>
                                        <span className="text-xs text-gray-500 ml-1">{tx.symbol}</span>
                                    </td>

                                    {/*  Fiyat */}
                                    <td className="px-6 py-5 text-right">
                                        <span className="text-gray-400 font-medium">${tx.price.toLocaleString()}</span>
                                    </td>

                                    {/*  Toplam */}
                                    <td className="px-6 py-5 text-right">
                                        <span className="font-bold text-white tracking-tight">${tx.total.toLocaleString()}</span>
                                    </td>

                                    {/* Tarih */}
                                    <td className="px-6 py-5 text-center text-gray-500 text-xs font-medium">
                                        {tx.date.split(' ')[0]} <br/>
                                        <span className="text-gray-600">{tx.date.split(' ')[1]}</span>
                                    </td>

                                    {/*  Durum */}
                                    <td className="px-6 py-5 text-center">
                                        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-bold uppercase tracking-wider ${status.bg} ${status.text} ${status.border}`}>
                                            {status.icon}
                                            <span>{tx.status === 'completed' ? 'Başarılı' : tx.status === 'pending' ? 'Bekliyor' : 'Hata'}</span>
                                        </div>
                                    </td>

                                    {/* Aksiyon */}
                                    <td className="px-6 py-5 text-center">
                                        <button className="p-2 rounded-lg text-gray-500 hover:text-white hover:bg-white/10 transition-colors">
                                            <FiMoreHorizontal />
                                        </button>
                                    </td>
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <td colSpan="8" className="px-6 py-20 text-center">
                                <div className="flex flex-col items-center justify-center opacity-50">
                                    <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6">
                                        <FiSearch size={32} className="text-gray-400"/>
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-2">İşlem Bulunamadı</h3>
                                    <p className="text-sm text-gray-500">Arama kriterlerinizi değiştirerek tekrar deneyin.</p>
                                </div>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
      </div>
    </div>
  );
};

export default TransactionsView;