import './ErrorMessage.css';


const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="error-container">
      <div className="error-card">
        <div className="error-icon">⚠️</div>
        <h2 className="error-title">Bir Hata Oluştu</h2>
        <p className="error-message">{message}</p>
        {onRetry && (
          <button onClick={onRetry} className="retry-btn">
            🔄 Tekrar Dene
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage;