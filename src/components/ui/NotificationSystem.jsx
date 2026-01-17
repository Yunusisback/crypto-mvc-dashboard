import { useGlobal } from '../../context/GlobalContext';
import { FiCheckCircle, FiXCircle, FiAlertTriangle, FiInfo, FiX } from 'react-icons/fi';


const NotificationSystem = () => {
  const { notifications, removeNotification } = useGlobal(); 

  // İkon Seçici
  const getIcon = (type) => {
    switch (type) {
      case 'success': return <FiCheckCircle size={22} className="text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]" />;
      case 'error': return <FiXCircle size={22} className="text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]" />;
      case 'warning': return <FiAlertTriangle size={22} className="text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]" />;
      default: return <FiInfo size={22} className="text-blue-400 drop-shadow-[0_0_8px_rgba(96,165,250,0.5)]" />;
    }
  };

  
  const getStyles = (type) => {
    switch (type) {
      case 'success': return 'bg-[#0a0a0a]/90 border-emerald-500/30 shadow-[0_0_20px_-5px_rgba(16,185,129,0.15)]';
      case 'error': return 'bg-[#0a0a0a]/90 border-red-500/30 shadow-[0_0_20px_-5px_rgba(239,68,68,0.15)]';
      case 'warning': return 'bg-[#0a0a0a]/90 border-amber-400/30 shadow-[0_0_20px_-5px_rgba(251,191,36,0.15)]';
      default: return 'bg-[#0a0a0a]/90 border-blue-400/30 shadow-[0_0_20px_-5px_rgba(96,165,250,0.15)]';
    }
  };

  // İlerleme Çubuğu Rengi
  const getProgressColor = (type) => {
    switch (type) {
      case 'success': return 'bg-emerald-500';
      case 'error': return 'bg-red-500';
      case 'warning': return 'bg-amber-400';
      default: return 'bg-blue-400';
    }
  };

  return (
    <div className="fixed top-6 right-6 z-9999 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`
            pointer-events-auto relative overflow-hidden flex items-start gap-4 p-4 rounded-2xl border backdrop-blur-xl 
            animate-in slide-in-from-right fade-in duration-300
            ${getStyles(notification.type)}
          `}
        >
          {/* İkon */}
          <div className="shrink-0 mt-0.5">
            {getIcon(notification.type)}
          </div>

          {/* İçerik */}
          <div className="flex-1 min-w-0">
            <h4 className="text-white text-sm font-bold leading-tight mb-1 capitalize">
              {notification.type === 'success' ? 'Başarılı' : 
               notification.type === 'error' ? 'Hata' : 
               notification.type === 'warning' ? 'Uyarı' : 'Bilgi'}
            </h4>
            <p className="text-gray-400 text-xs font-medium leading-relaxed">
              {notification.message}
            </p>
          </div>

          {/* Kapat Butonu */}
          <button 
             onClick={() => removeNotification && removeNotification(notification.id)}
             className="shrink-0 text-gray-500 hover:text-white transition-colors"
          >
             <FiX size={16} />
          </button>

          
          <div className="absolute bottom-0 left-0 h-0.5 w-full bg-white/5">
            <div className={`h-full ${getProgressColor(notification.type)} animate-[progress_3s_linear_forwards] origin-left`}></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotificationSystem;