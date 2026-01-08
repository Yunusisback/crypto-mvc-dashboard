import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import DetailModel from '../models/DetailModel';
import DetailView from '../views/Detail/DetailView';

const DetailController = () => {
  const { id } = useParams();
  
  const [state, setState] = useState({
    coin: null,
    chartData: null,
    isLoading: true,
    error: null,
    activeRange: 1
  });

  const fetchCoinDetail = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));

      
      const [detailData, historyData] = await Promise.all([
        DetailModel.getCoinDetail(id),
        DetailModel.getCoinChartData(id, state.activeRange)
      ]);

     
      const formattedChartData = {
        labels: historyData?.map(item => item.time) || [],
        datasets: [{
          label: 'Fiyat (USD)',
          data: historyData?.map(item => parseFloat(item.price)) || [],
          borderColor: '#FFD700',
          backgroundColor: 'rgba(255, 215, 0, 0.1)',
          borderWidth: 2,
          fill: true,
          tension: 0.4,
          pointRadius: 0,
          pointHoverRadius: 6,
          pointHoverBackgroundColor: '#FFD700',
        }]
      };

      setState({
        coin: detailData,
        chartData: formattedChartData,
        isLoading: false,
        error: null,
        activeRange: state.activeRange
      });
    } catch (err) {
      console.error("Detail fetch error:", err);
      setState(prev => ({ 
        ...prev, 
        error: 'Coin detayları yüklenirken bir hata oluştu.', 
        isLoading: false 
      }));
    }
  }, [id, state.activeRange]);

  useEffect(() => {
    fetchCoinDetail();
    const interval = setInterval(fetchCoinDetail, 60000);
    return () => clearInterval(interval);
  }, [fetchCoinDetail]);

  const handleRangeChange = (range) => {
    setState(prev => ({ ...prev, activeRange: range }));
  };

  return (
    <DetailView
      coinData={state.coin}
      chartData={state.chartData}
      isLoading={state.isLoading}
      error={state.error}
      days={state.activeRange}
      setDays={handleRangeChange}
    />
  );
};

export default DetailController;