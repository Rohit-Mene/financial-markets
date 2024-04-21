const Instruments = require("../models/Instruments");
const mongoose = require("mongoose");
const axios = require("axios");
const config = require("config");
const Portfolio = require("../models/Portfolios");
const { lte } = require("lodash");

const initStockSymbolList = ["IBM", "300135.SHZ"];
const VANTAGE_API_BASE = config.get("VANTAGE_API_BASE");
const API_KEY = config.get("API_KEY");
const DUMMY = ["IBM", "300135.SHZ"];
const addWatchList = async (req, res) => {
  try {
    const updatedWatchList = await Portfolio.findOneAndUpdate(
      { userID: req.query._id },
      { $addToSet: { watchlist: req.query.stock } },
      { new: true, safe: true, upsert: false }
    );
    let response = {};
    if (DUMMY.includes(req.query.stock)) {
      const newStock = await axios.get(VANTAGE_API_BASE, {
        params: {
          function: "GLOBAL_QUOTE",
          symbol: req.query.stock,
          apikey: API_KEY,
        },
      });
      console.log(newStock.data);
      response = filteredResponse(newStock.data);
    } else {
      response = {
        symbol: req.query.stock,
        change: "0.1100",
        price: "181.5800",
        percentChange: "0.0606%",
      };
    }
    console.log(updatedWatchList);
    return res.status(201).send(response);
  } catch (error) {
    console.log("Initial Stock fetch failed", error);
  }
};

const getStocks = async (req, res) => {
  try {
    const userPortfolio = await Portfolio.findOne({ userID: req.query._id });
    let responseData = [];
    if (userPortfolio.watchlist.length === 0)
      return res.status(200).send(responseData);

    const { withDummy, withoutDummy } = separateWatchlist(
      userPortfolio.watchlist
    );

    if (withDummy.length > 0) {
      const stockRequest = withDummy.map((symbol) =>
        axios.get(VANTAGE_API_BASE, {
          params: {
            function: "GLOBAL_QUOTE",
            symbol: symbol,
            apikey: API_KEY,
          },
        })
      );
      const stockList = await Promise.all(stockRequest);
      const filteretedData = stockList.map((response) =>
        filteredResponse(response.data)
      );
      responseData = [...responseData, ...filteretedData];
    }

    if (withoutDummy.length > 0) {
      withoutDummy.map((symbol) =>
        responseData.push({
          symbol: symbol,
          change: "0.1100",
          price: "181.5800",
          percentChange: "0.0606%",
        })
      );
    }

    res.status(200).send(responseData);
  } catch (error) {
    console.log("Initial Stock fetch failed", error);
  }
};
// Ticker Search
const getTickerSearch = async (req, res) => {
  const apiTickerData = await axios.get(VANTAGE_API_BASE, {
    params: {
      function: "SYMBOL_SEARCH",
      //keywords: req.query.searchData,
      //hardcoded for now
      keywords: "tesco",
      apikey: API_KEY,
    },
  });

  const tickerData = filterTickerData(apiTickerData.data);

  return res.status(200).send(tickerData);
};

const deleteWatchList = async (req, res) => {
  try {
    const updatedWatchList = await Portfolio.updateOne(
      { userID: req.query._id },
      { $pull: { watchlist: req.query.stock } },
      { new: true, safe: true, upsert: false }
    );
    return res.status(200).send(updatedWatchList);
  } catch (error) {
    console.log("Initial Stock fetch failed", error);
  }
};

function filterTickerData(data) {
  const filteredSearchedData = data["bestMatches"].map((item) => ({
    symbol: item["1. symbol"],
    type: item["3. type"],
  }));

  return filteredSearchedData;
}

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

function separateWatchlist(watchlist) {
  // Items that are in the dummy list
  const withDummy = watchlist.filter((item) => DUMMY.includes(item));
  // Items that are not in the dummy list
  const withoutDummy = watchlist.filter((item) => !DUMMY.includes(item));
  //console.log(withDummy);
  return { withDummy, withoutDummy };
}
module.exports = { addWatchList, getStocks, getTickerSearch,deleteWatchList };
