import { useTranslation } from 'react-i18next';
import { FiAlertTriangle, FiRefreshCw } from 'react-icons/fi';

const ErrorMessage = ({ message, onRetry }) => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="glass-panel p-10 rounded-3xl max-w-md w-full text-center border-2 border-red-500/20 animate-fade-in">
        
        <div className="mb-6 relative inline-block">
          <div className="absolute inset-0 bg-red-500/20 blur-2xl rounded-full animate-pulse"></div>
          <FiAlertTriangle className="relative text-red-400 mx-auto animate-bounce" size={64} />
        </div>
        
        <h2 className="text-2xl font-bold text-white mb-3">
          {t('error', 'Hata')}
        </h2>
        
        <p className="text-gray-400 mb-8">
          {message || t('error_loading_data', 'Veriler yüklenirken hata oluştu')}
        </p>

        {onRetry && (
          <button 
            onClick={onRetry} 
            className="btn-primary flex items-center justify-center gap-2 mx-auto"
            aria-label={t('retry', 'Tekrar Dene')}
          >
            <FiRefreshCw />
            {t('retry', 'Tekrar Dene')}
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage;