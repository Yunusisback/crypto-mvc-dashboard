const LoadingSpinner = ({ message = 'Yükleniyor...' }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      
      {/* Dönen Çark */}
      <div className="relative w-32 h-32 mb-8">
        {/* Dış Halka */}
        <div className="absolute inset-0 border-4 border-transparent border-t-yellow-400 rounded-full animate-spin"></div>
        
        {/* Orta Halka */}
        <div className="absolute inset-3 border-4 border-transparent border-t-emerald-400 rounded-full animate-spin" style={{ animationDuration: '1.5s', animationDirection: 'reverse' }}></div>
        
        {/* İç Halka */}
        <div className="absolute inset-6 border-4 border-transparent border-t-blue-400 rounded-full animate-spin" style={{ animationDuration: '2s' }}></div>
        
        {/* Bitcoin Simgesi */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-5xl animate-pulse text-yellow-400">₿</span>
        </div>
      </div>

      {/* Yüklenme Metni */}
      <p className="text-gray-400 font-semibold text-lg animate-pulse">
        {message}
      </p>
    </div>
  );
};

export default LoadingSpinner;