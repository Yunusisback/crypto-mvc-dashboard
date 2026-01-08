import { useTranslation } from 'react-i18next';

const CoinInfo = ({ coin }) => {
  const { t } = useTranslation();
  if (!coin) return null;

  return (
    <div className="flex flex-col items-center relative z-10">
      
   
      <div className="relative group mb-6">
        <div className="absolute inset-0 bg-yellow-400/30 blur-3xl rounded-full group-hover:bg-yellow-400/50 transition-all duration-700"></div>
        <img 
          src={coin.image?.large} 
          alt={coin.name} 
          className="relative w-28 h-28 drop-shadow-2xl animate-[float_6s_ease-in-out_infinite]" 
        />
      </div>

      <h1 className="text-4xl font-extrabold text-white mb-2 tracking-tight">
        {coin.name}
      </h1>
      
      <div className="flex items-center gap-3 mt-2">
        <span className="px-3 py-1 bg-gray-800 text-gray-300 rounded-lg text-sm font-mono border border-gray-700">
          {coin.symbol?.toUpperCase()}
        </span>
        <span className="px-3 py-1 bg-yellow-400/10 text-yellow-400 rounded-lg text-sm font-bold border border-yellow-400/20">
           Sıra #{coin.market_cap_rank}
        </span>
      </div>

    </div>
  );
};

export default CoinInfo;