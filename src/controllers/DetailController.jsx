import  { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DetailModel from "../models/DetailModel";
import DetailView from "../views/Detail/DetailView";

const DetailController = () => {
  const { id } = useParams(); 
  const [coinData, setCoinData] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [days, setDays] = useState(7); 

  useEffect(() => {
   
    DetailModel.getCoinDetail(id).then((res) => setCoinData(res));

  
    DetailModel.getCoinChartData(id, days).then((res) => {
      if (!res || !res.prices) return;

      
      const formattedData = {
        labels: res.prices.map((item) => new Date(item[0]).toLocaleDateString()),
        datasets: [
          {
            label: "Fiyat (USD)",
            data: res.prices.map((item) => item[1]),
            borderColor: "#ffd700",
            backgroundColor: "rgba(255, 215, 0, 0.1)",
            fill: true,
            tension: 0.3, 
            pointRadius: 0, 
          },
        ],
      };
      setChartData(formattedData);
    });
  }, [id, days]);

  return (
    <DetailView 
      coinData={coinData} 
      chartData={chartData} 
      days={days} 
      setDays={setDays} 
    />
  );
};

export default DetailController;