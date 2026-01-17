import { useState, useCallback } from 'react';

export const useWatchlist = (addNotification) => {
  const [watchlist, setWatchlist] = useState(() => JSON.parse(localStorage.getItem('watchlist')) || []);

  const addToWatchlist = useCallback((coinId) => {
    setWatchlist(prev => {
      if (prev.includes(coinId)) return prev;
      const updated = [...prev, coinId];
      localStorage.setItem('watchlist', JSON.stringify(updated));
      addNotification('success', 'İzleme listesine eklendi!');
      return updated;
    });
  }, [addNotification]);

  const removeFromWatchlist = useCallback((coinId) => {
    setWatchlist(prev => {
      const updated = prev.filter(id => id !== coinId);
      localStorage.setItem('watchlist', JSON.stringify(updated));
      addNotification('info', 'İzleme listesinden çıkarıldı.');
      return updated;
    });
  }, [addNotification]);

  const isInWatchlist = useCallback((coinId) => watchlist.includes(coinId), [watchlist]);

  return { watchlist, addToWatchlist, removeFromWatchlist, isInWatchlist };
};