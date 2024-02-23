const Instruments = require("../models/Instruments");
const mongoose = require("mongoose");
const axios = require("axios");
const config = require("config");

const initStockSymbolList = ["IBM", "300135.SHZ"];
const VANTAGE_API_BASE = config.get("VANTAGE_API_BASE");
const API_KEY = config.get("API_KEY");
const getInitStocks = async (req, res) => {
  try {
    const stockRequest = initStockSymbolList.map((symbol) =>
      axios.get(VANTAGE_API_BASE, {
        params: {
          function: "GLOBAL_QUOTE",
          symbol: symbol,
          apikey: API_KEY,
        },
      })
    );
    const stockList = await Promise.all(stockRequest);
    const responseData = stockList.map((response) =>
      filteredResponse(response.data)
    );
    
    res.status(200).send(responseData);
  } catch (error) {
    console.log("Inital Stock fetch failed", error);
  }
};

function filteredResponse(data) {
  const keysToKeep = ["symbol", "change", "price", "change percent"];
  let filteredData = {};
  Object.keys(data["Global Quote"]).forEach((originalKey) => {
    const processedKey = processKey(originalKey);
    if (keysToKeep.includes(processedKey)) {
      filteredData[processedKey] = data["Global Quote"][originalKey];
    }
  });

  return filteredData;
}

function processKey(key) {
  return key.replace(/^\d+\.\s/, "");
}

module.exports = { getInitStocks };
