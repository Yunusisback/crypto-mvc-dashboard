const PremiumChartAnimation = () => {
  return (
    <div className="relative w-48 h-48 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 transform rotate-12 scale-150 opacity-10">
        <div className="w-full h-full border-2 border-dashed border-yellow-400/30 rounded-full animate-[spin_30s_linear_infinite]"></div>
        <div className="absolute inset-4 border border-yellow-400/20 rounded-full animate-[spin_20s_linear_infinite_reverse]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(250,204,21,0.1)_0%,transparent_70%)]"></div>
      </div>

      <svg viewBox="0 0 200 200" className="relative z-10 w-full h-full overflow-visible">
        <defs>
          <linearGradient id="chartGradientMain" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(250,204,21,0)" />
            <stop offset="100%" stopColor="#FACC15" />
          </linearGradient>

          <linearGradient id="chartGradientSecond" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(251, 146, 60, 0)" /> 
            <stop offset="100%" stopColor="#FB923C" />
          </linearGradient>
          
          <filter id="glowMain">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
           <filter id="glowSecond">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <path
          d="M 20 160 C 50 170, 80 130, 110 140 S 160 90, 180 70"
          fill="none"
          stroke="url(#chartGradientSecond)"
          strokeWidth="3"
          strokeLinecap="round"
          filter="url(#glowSecond)"
          className="animate-[dash_4s_ease-in-out_infinite]"
          strokeDasharray="300"
          strokeDashoffset="300"
          opacity="0.6"
        />

        <g className="animate-[pulse_3s_ease-in-out_infinite]" opacity="0.8">
           <circle cx="180" cy="70" r="4" fill="#FB923C" filter="url(#glowSecond)" />
        </g>

        <path
          d="M 20 150 C 60 120, 80 160, 120 100 S 160 80, 180 30"
          fill="none"
          stroke="url(#chartGradientMain)"
          strokeWidth="4"
          strokeLinecap="round"
          filter="url(#glowMain)"
          className="animate-[dash_3s_ease-in-out_infinite]"
          strokeDasharray="300"
          strokeDashoffset="300"
        />
        
        <g className="animate-[pulse_2s_ease-in-out_infinite]">
          <circle cx="180" cy="30" r="6" fill="#FACC15" filter="url(#glowMain)" className="animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite] opacity-70">
          </circle>
          <circle cx="180" cy="30" r="5" fill="#FACC15" />
        </g>

      </svg>
    </div>
  );
};

export default PremiumChartAnimation;