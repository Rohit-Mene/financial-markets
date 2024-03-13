import React,{useEffect, useState} from 'react'
import ApexCharts from 'apexcharts'
import axios from "axios";
const Chart = () => {
    const[chartData,setChartData]  = useState();
    useEffect(() => {
        const fetchChartData = async () => {
          try {
            const response = await axios.get(
              "http://localhost:5001/api/stocks/chart",
              {
                params: { function:"TIME_SERIES_DAILY",symbol:"IBM"  },
                //withCredentials: true,
              }
            );
            const chartDataFromResponse = response.data.series[0].data;
            setChartData(chartDataFromResponse.data);
          } catch (error) {
            console.error("Failed to fetch Chart Data", error);
          } 
        };
    
        fetchChartData();
      }, []);
  return (
    <>{console.log(chartData)}</>
  )
}

export default Chart