import { Link } from 'react-router-dom';
import { FiArrowUp, FiArrowDown } from 'react-icons/fi';

const CardView = ({ coin }) => {
  const dailyChange = coin.price_change_percentage_24h ?? 0;
  const isPositive = dailyChange > 0;
  const isNegative = dailyChange < 0;

  const getLogo = (id) => {
    switch (id) {
      case "bitcoin":
        return <img src="/bitcoin-logo.svg" alt="BTC" className="w-16 h-16" />;
      case "ethereum":
        return <img src="/ethereum-logo.svg" alt="ETH" className="w-16 h-16" />;
      case "ripple":
        return <img src="/xrp2.svg" alt="XRP" className="w-16 h-16" />;
      default:
        return null;
    }
  };

  return (
    <Link to={`/coin/${coin.id}`} className="no-underline">
      <div className="glass-card p-6 rounded-2xl hover:scale-105 transition-all duration-300 cursor-pointer group">
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 group-hover:scale-110 transition-transform">
            {getLogo(coin.id)}
          </div>
          
          <h5 className="text-xl font-bold text-white mb-1 group-hover:text-yellow-400 transition-colors">
            {coin.name}
          </h5>
          
          <p className="text-sm text-gray-500 uppercase font-bold tracking-wider mb-4">
            {coin.symbol}
          </p>
          
          <p className="text-2xl font-mono font-black text-white mb-4">
            ${coin.current_price.toLocaleString()}
          </p>
          
          <div className={`flex items-center gap-1 px-4 py-2 rounded-full text-sm font-bold ${
            isPositive 
              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
              : isNegative
              ? 'bg-red-500/10 text-red-400 border border-red-500/20'
              : 'bg-gray-500/10 text-gray-400 border border-gray-500/20'
          }`}>
            {isPositive && <FiArrowUp />}
            {isNegative && <FiArrowDown />}
            <span>Günlük: {dailyChange.toFixed(2)}%</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CardView;