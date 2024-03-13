const axios = require("axios");
const config = require("config");
const VANTAGE_API_BASE = config.get("VANTAGE_API_BASE");
const API_KEY = config.get("API_KEY");

function convertToDateObject(dateString) {
  const parts = dateString.split("-"); // Assuming format is YYYY-MM-DD
  // Note: months are 0-based in JavaScript Date
  return new Date(parts[0], parts[1] - 1, parts[2]);
}

const filteredData = (stockData) => {
  return {
    series: [
      {
        data: Object.entries(stockData["Time Series (Daily)"]).map(
          ([date, values]) => ({
            x: convertToDateObject(date),
            y: [
              parseFloat(values["1. open"]),
              parseFloat(values["2. high"]),
              parseFloat(values["3. low"]),
              parseFloat(values["4. close"]),
            ],
          })
        ),
      },
    ],
  };
};
const getChartData = async (req, res) => {
  try {
    const functionType = req.query.function;
    const symbol = req.query.symbol;
    const response = await axios.get(VANTAGE_API_BASE, {
      params: {
        function: functionType,
        symbol: symbol,
        apikey: API_KEY,
      },
    });
    console.log(filteredData(response.data));
    res.status(200).send(filteredData(response.data));
  } catch (error) {
    console.log("Chart details fetch failed", error);
  }
};

module.exports = { getChartData };
