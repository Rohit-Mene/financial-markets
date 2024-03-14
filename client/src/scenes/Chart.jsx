import React, { useEffect, useState } from "react";
import ApexCharts from "apexcharts";
import Chart from "react-apexcharts";
import axios from "axios";

const ChartRend = () => {
  const [chartData, setChartData] = useState();
  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5001/api/stocks/chart",
          {
            params: { function: "TIME_SERIES_DAILY", symbol: "IBM" },
            //withCredentials: true,
          }
        );
        const chartDataFromResponse = response.data;
        const formattedData = chartDataFromResponse.series.map(series => ({
          ...series,
          data: series.data.map(dataItem => ({
            ...dataItem,
            x: new Date(dataItem.x) // Convert string date to Date object
          }))
        }));
  
        setChartData({ series: formattedData });
      } catch (error) {
        console.error("Failed to fetch Chart Data", error);
      }
    };

    fetchChartData();
  }, []);
  return (
    <>
      {chartData !== undefined  ? (
        <Chart
          options={{
            chart: { id: "candlestick" },
            xaxis: { type: "datetime"},
            yaxis: {
              tooltip: {
                enabled: true,
                theme: "light"
              },
            },
          }}
          type="candlestick"
          series={chartData["series"]}
 
         
        />
      ) : null}
    </>
  );
};

export default ChartRend;
