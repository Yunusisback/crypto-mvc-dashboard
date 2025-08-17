import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import DetailModel from '../models/DetailModel';
import DetailView from '../views/DetailView';

const DetailController = () => {
  // URL'den dinamik parametreyi (coin id'sini) alıyoruz
  const { id } = useParams();

  // State yönetimi
  const [coinData, setCoinData] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 
  const [timeRange, setTimeRange] = useState('30g');

  // API çağrısını ve veri işleme mantığını ayrı bir fonksiyona ayırıyoruz.
  // useCallback kullanarak bu fonksiyonun gereksiz yere yeniden oluşturulmasını engelliyoruz
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null); // Yeni bir çağrı öncesi hatayı sıfırla
    try {
      let days;
      switch (timeRange) {
        case '24s': days = 1; break;
        case '7g': days = 7; break;
        case '30g': days = 30; break;
        case '1y': days = 365; break;
        default: days = 30;
      }

      // Promise.all ile birden fazla API çağrısını aynı anda yapıyoruzz
      const [detail, marketData] = await Promise.all([
        DetailModel.getCoinDetail(id),
        DetailModel.getMarketData(id, days)
      ]);

      // Gelen verileri state'e kaydediyoruz
      setCoinData(detail);
      setChartData(marketData);
    } catch (err) {
      // API çağrısında bir hata oluşursa, hatayı state'e kaydedip konsola yazdırıyoruz
      setError('Veri çekme sırasında bir hata oluştu. Lütfen tekrar deneyin.');
      console.error('Veri çekme hatası:', err);
    } finally {
      // Her durumda yüklenme durumunu sonlandırıyoruz
      setLoading(false);
    }
  }, [id, timeRange]);

  // id veya timeRange değiştiğinde fetchData fonksiyonunu çağırıyoruz
  useEffect(() => {
    fetchData();
  }, [fetchData]); // fetchData fonksiyonu değiştiğinde (id veya timeRange değişince) tetiklenir

  // Zaman aralığı butonlarına tıklandığında çalışacak fonksiyon
  const handleTimeRangeChange = (range) => {
    setTimeRange(range);
  };

  // View bileşenine gönderilecek props'ları belirliyoruz
  return (
    <DetailView 
      coinData={coinData} 
      chartData={chartData} 
      loading={loading}
      error={error} 
      timeRange={timeRange}
      onTimeRangeChange={handleTimeRangeChange}
    />
  );
};

export default DetailController;