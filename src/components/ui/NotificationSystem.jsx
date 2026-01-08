import { useGlobal } from '../../context/GlobalContext';
import { FiCheckCircle, FiXCircle, FiAlertTriangle, FiInfo } from 'react-icons/fi';

const NotificationSystem = () => {
  const { notifications } = useGlobal();

  const getIcon = (type) => {
    switch (type) {
      case 'success': return <FiCheckCircle size={20} />;
      case 'error': return <FiXCircle size={20} />;
      case 'warning': return <FiAlertTriangle size={20} />;
      case 'info': return <FiInfo size={20} />;
      default: return <FiInfo size={20} />;
    }
  };

  const getStyles = (type) => {
    switch (type) {
      case 'success': return 'bg-white border-green-200 text-green-700 shadow-green-100';
      case 'error': return 'bg-white border-red-200 text-red-700 shadow-red-100';
      case 'warning': return 'bg-white border-orange-200 text-orange-700 shadow-orange-100';
      default: return 'bg-white border-gray-200 text-gray-700 shadow-gray-100';
    }
  };

  return (
    <div className="fixed top-6 right-6 z-[9999] flex flex-col gap-3 max-w-sm w-full">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`flex items-center gap-3 p-4 rounded-2xl border shadow-lg animate-in slide-in-from-right duration-300 ${getStyles(notification.type)}`}
        >
          <div className="shrink-0">
            {getIcon(notification.type)}
          </div>
          <span className="text-sm font-semibold flex-1">
            {notification.message}
          </span>
        </div>
      ))}
    </div>
  );
};

export default NotificationSystem;