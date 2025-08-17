import React from "react";
import { Link } from 'react-router-dom';

const CardView = ({ coin }) => {
  const dailyChange = coin.price_change_percentage_24h ?? 0;
  const changeColor =
    dailyChange > 0 ? "positive" : dailyChange < 0 ? "negative" : "neutral";

  const getLogo = (id) => {
    switch (id) {
      case "bitcoin":
        return <img src="/bitcoin-logo.svg" alt="BTC" className="crypto-logo" />;
      case "ethereum":
        return <img src="/ethereum-logo.svg" alt="ETH" className="crypto-logo" />;
      case "ripple":
        return <img src="/xrp2.svg" alt="XRP" className="crypto-logo" />;
      default:
        return null;
    }
  };

  return (
    <Link to={`/coin/${coin.id}`} style={{ textDecoration: 'none' }}>
      <div
        className="card-view"
        onMouseEnter={(e) => e.currentTarget.classList.add("card-hover")}
        onMouseLeave={(e) => e.currentTarget.classList.remove("card-hover")}
      >
        {getLogo(coin.id)}
        <h5 className="card-title">{coin.name}</h5>
        <p className="card-symbol">{coin.symbol.toUpperCase()}</p>
        <p className="card-price">${coin.current_price.toLocaleString()}</p>
        <span className={`glow-blink ${changeColor}`}>
          Günlük Değişim: {dailyChange.toFixed(2)}%
        </span>
      </div>
    </Link>
  );
};

export default CardView;
