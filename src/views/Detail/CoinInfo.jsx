

const CoinInfo = ({ coin }) => {
  return (
    <div style={{ textAlign: 'center', marginBottom: '30px' }}>
      <img 
        src={coin.image.large} 
        alt={coin.name} 
        style={{ width: '80px', height: '80px', marginBottom: '15px' }} 
      />
      <h1 style={{ color: '#fff', margin: '0 0 5px 0', fontSize: '1.8rem' }}>{coin.name}</h1>
      <div style={{ color: '#ffd700', fontWeight: 'bold', fontSize: '1.1rem' }}>
        {coin.symbol.toUpperCase()} / USD
      </div>
    </div>
  );
};

export default CoinInfo;