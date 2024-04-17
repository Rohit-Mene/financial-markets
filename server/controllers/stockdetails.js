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
    console.log("Initial Stock fetch failed", error);
  }
};

const getRequestedStock = async (req, res) => {
  try {
    const stockRequest = await axios.get(VANTAGE_API_BASE, {
      params: {
        function: "GLOBAL_QUOTE",
        symbol: req.query.symbol,
        apikey: API_KEY,
      },
    });
    const responseData = filteredResponse(stockRequest.data);

    res.status(200).send(responseData);
  } catch (error) {
    console.log("Initial Stock fetch failed", error);
  }
};

function filteredResponse(data) {
  const keysToKeep = ["symbol", "change", "price", "change percent"];
  const keyRenames = {
    "change percent": "percentChange",
  };

  let filteredData = {};
  Object.keys(data["Global Quote"]).forEach((originalKey) => {
    let processedKey = processKey(originalKey);
    if (keysToKeep.includes(processedKey)) {
      processedKey = keyRenames[processedKey] || processedKey;
      filteredData[processedKey] = data["Global Quote"][originalKey];
    }
  });

  return filteredData;
}

function processKey(key) {
  return key.replace(/^\d+\.\s/, "");
}

// Ticker Search
const getTickerSearch = async (req, res) => {
  const apiTickerData = await axios.get(VANTAGE_API_BASE, {
    params: {
      function: "SYMBOL_SEARCH",
      keywords: req.query.searchData,
      apikey: API_KEY,
    },
  });

  const tickerData = filterTickerData(apiTickerData.data);

  return res.status(200).send(tickerData);
};

function filterTickerData(data) {
  const filteredSearchedData = data["bestMatches"].map((item) => ({
    symbol: item["1. symbol"],
    type: item["3. type"],
  }));

  return filteredSearchedData;
}

module.exports = { getInitStocks, getRequestedStock, getTickerSearch };
