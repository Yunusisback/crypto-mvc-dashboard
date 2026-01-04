import { useGlobal } from '../../context/GlobalContext';
import './NotificationSystem.css';


const NotificationSystem = () => {
  const { notifications } = useGlobal();

  const getIcon = (type) => {
    switch (type) {
      case 'success': return '✓';
      case 'error': return '✕';
      case 'warning': return '⚠';
      case 'info': return 'ℹ';
      default: return 'ℹ';
    }
  };

  return (
    <div className="notification-container">
      {notifications.map((notification) => (
        <div key={notification.id} className={`notification notification-${notification.type}`}>
          <span className="notification-icon">{getIcon(notification.type)}</span>
          <span className="notification-message">{notification.message}</span>
        </div>
      ))}
    </div>
  );
};

export default NotificationSystem;