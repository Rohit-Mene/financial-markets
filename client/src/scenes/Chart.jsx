import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import axios from "axios";
import { createTheme } from "@mui/material/styles";
import {ThemeProvider } from "@mui/material/styles";
import CssBaseline from '@mui/material/CssBaseline';
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
        const formattedData = chartDataFromResponse.series.map((series) => ({
          ...series,
          data: series.data.map((dataItem) => ({
            ...dataItem,
            x: new Date(dataItem.x), // Convert string date to Date object
          })),
        }));

        setChartData({ series: formattedData });
      } catch (error) {
        console.error("Failed to fetch Chart Data", error);
      }
    };

    fetchChartData();
  }, []);
  const lightTheme = createTheme({
    palette: {
      type: "light",
    },
  });
  return (
    <>
    <ThemeProvider theme={lightTheme}>
    <CssBaseline />
      {chartData !== undefined ? (
        <Chart
          options={{
            chart: { id: "candlestick" },     
            xaxis: { type: "datetime" },
            yaxis: {
              tooltip: {
                enabled: true,
              },
            },
          }}
          type="candlestick"
          series={chartData["series"]}
          height ={650}
        />
      ) : null}
    </ThemeProvider>
    </>
  );
};

export default ChartRend;
