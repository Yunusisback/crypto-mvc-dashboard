const LoadingSpinner = ({ message = 'Veriler işleniyor...' }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-bg-dark relative overflow-hidden">
      
      {/* Arka plan ışık hüzmesi */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl animate-pulse"></div>

      <div className="relative w-24 h-24 mb-8">

        {/* Dış Halka */}
        <div className="absolute inset-0 border-2 border-transparent border-t-yellow-500 rounded-full animate-spin" style={{ animationDuration: '1s' }}></div>
        
        {/* Orta Halka  */}
        <div className="absolute inset-2 border-2 border-transparent border-b-yellow-400/70 rounded-full animate-spin" style={{ animationDuration: '2s', animationDirection: 'reverse' }}></div>
        
        {/* İç Halka */}
        <div className="absolute inset-4 border-2 border-transparent border-l-yellow-300/40 rounded-full animate-spin" style={{ animationDuration: '1.5s' }}></div>
        
        {/* Merkez Nokta */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 bg-yellow-400 rounded-full shadow-[0_0_15px_rgba(255,215,0,0.8)] animate-pulse"></div>
        </div>
      </div>

      <p className="text-gray-400 font-mono text-sm tracking-widest uppercase animate-pulse">
        {message}
      </p>
    </div>
  );
};

export default LoadingSpinner;